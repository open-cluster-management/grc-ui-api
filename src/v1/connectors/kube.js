/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import _ from 'lodash';
import lru from 'lru-cache';
import logger from '../lib/logger';
import { isRequired } from '../lib/utils';
import config from '../../../config';
import requestLib from '../lib/request';
import ApiURL from '../lib/ApiURL';

function selectNamespace(namespaces) {
  return namespaces.find(ns => ns === 'default') || namespaces[0];
}

export default class KubeConnector {
  constructor({
    cache = lru(),
    token = 'Bearer localdev',
    httpLib = requestLib,
    kubeApiEndpoint = process.env.API_SERVER_URL || 'https://kubernetes.default.svc',
    namespaces = isRequired('namespaces'),
    pollTimeout = config.get('hcmPollTimeout'),
    pollInterval = config.get('hcmPollInterval'),
    uid = Date.now,
  } = {}) {
    // Caches requests for a single query.
    this.cache = cache;
    this.http = httpLib;
    this.kubeApiEndpoint = kubeApiEndpoint;
    this.namespaces = namespaces;
    this.pollInterval = pollInterval;
    this.pollTimeout = pollTimeout;
    this.resourceViewNamespace = selectNamespace(namespaces);
    this.token = token;
    this.uid = uid;
  }

  /**
   * Excecute Kube API GET requests.
   *
   * @param {*} path - API path
   * @param {*} opts - HTTP request options
   * @param {*} noCache - Don't use a previously cached request.
   */
  get(path = '', opts = {}, noCache) {
    const options = _.merge({
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'GET',
      headers: {
        Authorization: this.token,
      },
    }, opts);

    const cacheKey = `${path}/${JSON.stringify(options.body)}`;

    const cachedRequest = this.cache.get(cacheKey);
    if ((noCache === undefined || noCache === false) && cachedRequest) {
      logger.debug('Kubeconnector: Using cached GET request.');
      return cachedRequest;
    }

    const newRequest = this.http(options).then(res => res.body);

    if (noCache === undefined || noCache === false) {
      this.cache.set(cacheKey, newRequest);
    }

    return newRequest;
  }

  /**
   * Excecute Kube API GET requests for namespaces resources.
   *
   * @param {*} urlTemplate - function from namespace to url path
   * @param {*} opts - default namespace list override
   * @param {*} opts - kind of returned items--used to create valid k8s yaml
   */
  async getResources(urlTemplate, { namespaces, kind } = {}) {
    const namespaceList = (namespaces || this.namespaces);

    const requests = namespaceList.map(async (ns) => {
      let response;
      try {
        response = await this.get(urlTemplate(ns));
      } catch (err) {
        logger.error(`MCM REQUEST ERROR - ${err.message}`);
        return [];
      }

      if (response.code || response.message) {
        if (response.code === 404) {
          logger.info(`MCM INFO ${response.code} - ${response.message}`);
        } else {
          logger.error(`MCM ERROR ${response.code} - ${response.message}`);
        }
        return [];
      }

      // if all responses aren't objects, throw error
      const strs = [];
      const items = (response.items ? response.items : [response]);
      items.forEach((item) => {
        if (typeof item === 'string') {
          strs.push(item);
        }
      });
      if (strs.length > 0) {
        logger.error(`MCM RESPONSE ERROR, Expected Objects but Returned this: ${strs.join(', ')}`);
        return [];
      }

      return items.map(item => (kind ? Object.assign({
        apiVersion: response.apiVersion,
        kind,
      }, item) : item));
    });

    return _.flatten(await Promise.all(requests));
  }

  post(path, jsonBody, opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'POST',
      headers: {
        Authorization: this.token,
      },
      json: jsonBody,
    };
    return this.http(_.merge(defaults, opts)).then(res => res.body);
  }

  delete(path, jsonBody, opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'DELETE',
      headers: {
        Authorization: this.token,
      },
      json: jsonBody,
    };
    return this.http(_.merge(defaults, opts)).then(res => res.body);
  }

  patch(path = '', opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'PATCH',
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json-patch+json',
      },
    };
    return this.http(_.merge(defaults, opts)).then(res => res.body);
  }

  put(path = '', opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'PUT',
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json',
      },
    };
    return this.http(_.merge(defaults, opts)).then(res => res.body);
  }
}
