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
import crypto from 'crypto';
import logger from '../lib/logger';
import { isRequired } from '../lib/utils';
import config from '../../../config';
import requestLib from '../lib/request';

function selectNamespace(namespaces) {
  return namespaces.find((ns) => ns === 'default') || namespaces[0];
}

export default class KubeConnector {
  constructor({
    token = 'Bearer localdev',
    httpLib = requestLib,
    kubeApiEndpoint = process.env.API_SERVER_URL
          || 'https://kubernetes.default.svc',
    namespaces = isRequired('namespaces'),
    pollTimeout = config.get('hcmPollTimeout'),
    pollInterval = config.get('hcmPollInterval'),
    uid = Date.now,
  } = {}) {
    // Caches requests for a single query.
    this.http = httpLib;
    this.kubeApiEndpoint = kubeApiEndpoint;
    this.namespaces = namespaces;
    this.pollInterval = pollInterval;
    this.pollTimeout = pollTimeout;
    // to-do how to deal with this after removing all resource view
    this.resourceViewNamespace = selectNamespace(namespaces);
    this.token = token;
    this.uid = uid;
  }

  /**
   * Excecute Kube API GET requests.
   *
   * @param {*} path - API path
   * @param {*} opts - HTTP request options
   */
  get(path = '', opts = {}) {
    const options = _.merge({
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'GET',
      headers: {
        Authorization: this.token,
      },
    }, opts);
    const newRequest = this.http(options).then((res) => res.body);
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
        logger.error(`ACM REQUEST ERROR - ${err.message}`);
        return [];
      }

      if (response.code || response.message) {
        if (response.code === 404) {
          logger.info(`ACM INFO ${response.code} - ${response.message}`);
        } else {
          logger.error(`ACM ERROR ${response.code} - ${response.message}`);
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
        logger.error(
          `ACM RESPONSE ERROR, Expected Objects but Returned this: ${strs.join(', ')}`,
        );
        return [];
      }

      return items.map((item) => (kind ? ({
        apiVersion: response.apiVersion,
        kind,
        ...item,
      }) : item));
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
    return this.http(_.merge(defaults, opts)).then((res) => res.body);
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
    return this.http(_.merge(defaults, opts)).then((res) => res.body);
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
    return this.http(_.merge(defaults, opts)).then((res) => res.body);
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
    return this.http(_.merge(defaults, opts)).then((res) => res.body);
  }

  timeout() {
    return new Promise((r, reject) => setTimeout(reject, this.pollTimeout, new Error('Manager request timed out')));
  }

  pollView(viewLink) {
    let cancel;

    const promise = new Promise((resolve, reject) => {
      let pendingRequest = false;
      const intervalID = setInterval(async () => {
        if (!pendingRequest) {
          pendingRequest = true;
          try {
            const links = viewLink.split('/');
            const viewName = links.pop();
            const link = `${links.join('/')}?fieldSelector=metadata.name=${viewName}`;

            logger.debug('start polling: ', new Date(), link);
            const response = await this.get(link, {}, true);
            pendingRequest = false;
            if (response.code || response.message) {
              clearInterval(intervalID);
              return reject(response);
            }
            // We are looking for the type to be Processing for ManagedClusterView resources
            const isComplete = _.get(response, 'items[0].status.conditions[0].type') || _.get(response, 'items[0].status.status')
              || _.get(response, 'items[0].status.type') || _.get(response, 'items[0].status.conditions[0].type', 'NO');
            if (isComplete === 'Processing' || isComplete === 'Completed') {
              clearInterval(intervalID);
              logger.debug('start to get resource: ', new Date(), viewLink);
              const result = await this.get(viewLink, {}, true);
              if (result.code || result.message) {
                return reject(result);
              }
              resolve(result);
            }
          } catch (err) {
            clearInterval(intervalID);
            reject(err);
          }
        }
        return null;
      }, this.pollInterval);

      cancel = () => {
        clearInterval(intervalID);
        // reject or resolve?
        reject();
      };
    });

    return { cancel, promise };
  }

  async managedClusterViewQuery(managedClusterNamespace, apiGroup, kind, resourceName, namespace, updateInterval, deleteAfterUse) {
    // name cannot be long than 63 chars in length
    const name = crypto.createHash('sha1').update(`${managedClusterNamespace}-${resourceName}-${kind}`).digest('hex').substr(0, 63);

    // scope.name is required, and either GKV (scope.apiGroup+kind+version) or scope.resource
    const body = {
      apiVersion: 'view.open-cluster-management.io/v1beta1',
      kind: 'ManagedClusterView',
      metadata: {
        labels: {
          name,
        },
        name,
        namespace: managedClusterNamespace,
      },
      spec: {
        scope: {
          name: resourceName,
          resource: apiGroup ? `${kind}.${apiGroup}` : kind,
        },
      },
    };
      // Only set namespace if not null
    if (namespace) {
      body.spec.scope.namespace = namespace;
    }
    if (updateInterval) {
      body.spec.scope.updateIntervalSeconds = updateInterval; // default is 30 secs
    }
    // Create ManagedClusterView
    const managedClusterViewResponse = await this.post(`/apis/view.open-cluster-management.io/v1beta1/namespaces/${managedClusterNamespace}/managedclusterviews`, body);
    if (_.get(managedClusterViewResponse, 'status.conditions[0].status') === 'False' || managedClusterViewResponse.code >= 400) {
      throw new Error(`Create ManagedClusterView Failed [${managedClusterViewResponse.code}] - ${managedClusterViewResponse.message}`);
    }
    // Poll ManagedClusterView until success or failure
    const { cancel, promise: pollPromise } = this.pollView(_.get(managedClusterViewResponse, 'metadata.selfLink'));
    try {
      const result = await Promise.race([pollPromise, this.timeout()]);
      if (result && deleteAfterUse) {
        this.deleteManagedClusterView(managedClusterNamespace, managedClusterViewResponse.metadata.name);
      }
      return result;
    } catch (e) {
      logger.error(`ManagedClusterView Query Error for ${kind}`, e.message);
      cancel();
      throw e;
    }
  }

  async deleteManagedClusterView(managedClusterNamespace, managedClusterViewName) {
    this.delete(`/apis/view.open-cluster-management.io/v1beta1/namespaces/${managedClusterNamespace}/managedclusterviews/${managedClusterViewName}`)
      .catch((e) => logger.error(`Error deleting managed cluster view ${managedClusterViewName}`, e.message));
  }
}
