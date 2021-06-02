/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import _ from 'lodash';
import crypto from 'crypto';
import KubeModel from './kube';
import logger from '../lib/logger';
import buildSelfLinK from '../lib/buildSelfLink';

const noResourcetypeStr = '##cannot find resourcetype##';

function getApiGroupFromSelfLink(selfLink, kind) {
  let apiGroup = ''; // api group to differentiate between duplicate resources (ie. endpoints & subscriptions)
  const selfLinkData = selfLink.split('/');
  // When splitting the selfLink, the item at selfLinkData[3] is either the api version (if the resource has an apiGroup namespaced or not),
  // resource kind (if the resource is non-namespaced AND doesn’t have an apiGroup) or
  // namespaces (if the resource is namespaced AND doesn’t have an apiGroup).
  // knowing this we grab the apiGroup if selfLinkData[3] is not the kind or 'namespaces'
  if (selfLinkData[3] !== kind && selfLinkData[3] !== 'namespaces') {
    // eslint-disable-next-line prefer-destructuring
    apiGroup = selfLinkData[2];
  }
  return apiGroup;
}

function formatApi(api, resourceRule, trgtAPIGroups, singleNSAccess) {
  // no matter if user want *, always return these special cases
  if (Array.isArray(resourceRule.resources) && (trgtAPIGroups.has(api) || api === '*')) {
    const resources = _.compact(resourceRule.resources);
    const verbs = _.compact(resourceRule.verbs);
    if (resourceRule.resources.length > 0) {
      resources.forEach((resource) => {
        // use the combined api + resource as the unique key
        const mapKey = `${api}/${resource}`;
        if (Object.prototype.hasOwnProperty.call(singleNSAccess.rules, mapKey)) {
          // eslint-disable-next-line no-param-reassign
          singleNSAccess.rules[mapKey] = _.union(singleNSAccess.rules[mapKey], verbs);
        } else {
          // eslint-disable-next-line no-param-reassign
          singleNSAccess.rules[mapKey] = verbs;
        }
      });
    }
  }
}

function userAccessFormatter(accessInfo, apiGrps, singleNS, rawDataFlag) {
  const trgtAPIGroups = new Set(apiGrps);
  const singleNSAccess = {
    namespace: singleNS,
    rules: {},
  };
  // if user query raw = true, also return original raw access data on each namespace
  if (rawDataFlag) {
    singleNSAccess.rawData = accessInfo;
  }
  const resourceRules = _.get(accessInfo, 'status.resourceRules', '');
  if (Array.isArray(resourceRules) && resourceRules.length > 0) {
    resourceRules.forEach((resourceRule) => {
      if (Array.isArray(resourceRule.apiGroups)) {
        const apiGroups = _.compact(resourceRule.apiGroups);
        if (resourceRule.apiGroups.length > 0) {
          apiGroups.forEach((api) => {
            formatApi(api, resourceRule, trgtAPIGroups, singleNSAccess);
          });
        }
      }
    });
  }
  return singleNSAccess;
}

async function getUserAccess(kubeconnect, singleNS, apiGroups, rawDataFlag, resolve, reject) {
  const k8sAPI = '/apis/authorization.k8s.io/v1';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const options = {
    json: true,
    body: {
      apiVersion: 'authorization.k8s.io/v1',
      kind: 'SelfSubjectRulesReview',
      spec: {
        namespace: singleNS,
      },
    },
  };
  const response = await kubeconnect.doRequest(kubeconnect.getDefaults('POST', `${k8sAPI}/selfsubjectrulesreviews`, headers), options).catch((err) => reject(err));
  const userAccess = userAccessFormatter(response, apiGroups, singleNS, rawDataFlag);
  return resolve(userAccess);
}

async function getUserAccessInfo(kubeconnect, trgtAPIGroups, rawDataFlag, namespaces) {
  const userAccessReq = [];
  namespaces.forEach((singleNS) => { // each element binds with one NS then parallelly call whole array
    userAccessReq.push(
      new Promise((resolve, reject) => getUserAccess(kubeconnect, singleNS, trgtAPIGroups, rawDataFlag, resolve, reject)),
    );
  });
  const userAccessResult = await Promise.all(userAccessReq);
  if (userAccessResult) {
    return userAccessResult;
  }
  return null;
}

export default class GenericModel extends KubeModel {
  // Generic query to get local and remote resource data
  // Remote resources are queried using ManagedClusterView
  async getResource(args) {
    const {
      selfLink,
      cluster = '',
      kind,
      name,
      namespace = '',
      updateInterval,
      deleteAfterUse = true,
    } = args;

    // Check if the ManagedClusterView already exists if not create it
    const managedClusterViewName = crypto.createHash('sha1').update(`${cluster}-${name}-${kind}`).digest('hex').substr(0, 63);

    const resourceResponse = await this.kubeConnector.get(
      `/apis/view.open-cluster-management.io/v1beta1/namespaces/${cluster}/managedclusterviews/${managedClusterViewName}`,
    ).catch((err) => {
      logger.error(err);
      throw err;
    });
    if (resourceResponse.status === 'Failure' || resourceResponse.code >= 400) {
      const apiGroup = getApiGroupFromSelfLink(selfLink);
      const response = await this.kubeConnector.managedClusterViewQuery(
        cluster,
        apiGroup,
        kind,
        name,
        namespace,
        updateInterval,
        deleteAfterUse,
      ).catch((err) => {
        logger.error(err);
        throw err;
      });

      const resourceResult = _.get(response, 'status.result');
      if (resourceResult) {
        return resourceResult;
      }

      throw new Error('Unable to load resource data - Check to make sure the cluster hosting this resource is online');
    }
    return _.get(resourceResponse, 'status.result');
  }

  async getResourceEndPoint(resource, k8sPaths) {
    // dynamically get resource endpoint from kebernetes API
    // ie.https://ec2-54-84-124-218.compute-1.amazonaws.com:8443/kubernetes/
    if (k8sPaths) {
      const { apiVersion, kind } = resource;
      const apiPath = k8sPaths.paths.find((path) => path.match(`/[0-9a-zA-z]*/?${apiVersion}`));
      if (apiPath) {
        return (async () => {
          const k8sResourceList = await this.kubeConnector.get(`${apiPath}`);
          const resourceType = k8sResourceList.resources.find((item) => item.kind === kind);
          const namespace = _.get(resource, 'metadata.namespace');
          if (resourceType) {
            const { name, namespaced } = resourceType;
            if (namespaced && !namespace) {
              return null;
            }
            return `${apiPath}/${namespaced ? `namespaces/${namespace}/` : ''}${name}`;
          }
          return noResourcetypeStr;
        })();
      }
    }
    return undefined;
  }

  async createAndUpdateResources(args) {
    const { toCreate, toUpdate } = args;
    const createRes = [];
    const createErr = [];
    const cr = await Promise.all(toCreate.map((json) => this.createResources({ resources: [json] })
      .then((res) => {
        if (res.errors.length > 0) {
          return {
            status: 'Failure',
            message: res.errors[0],
            kind: json.kind,
          };
        }
        return {
          response: res.result[0],
          kind: json.kind,
        };
      })));
    cr.forEach((item) => {
      if (item.status === 'Failure' || item.message) {
        createErr.push({
          message: item.message,
          kind: item.kind,
        });
      } else {
        createRes.push({
          response: item.response,
          kind: item.kind,
        });
      }
    });
    const updateRes = [];
    const updateErr = [];
    const ur = await Promise.all(toUpdate.map((json) => this.putResource({ body: json })
      .then((res) => ({ response: res, kind: json.kind }))
      .catch((err) => ({ status: 'Failure', message: err.message, kind: json.kind }))));
    ur.forEach((item) => {
      if (item.status === 'Failure' || item.message) {
        updateErr.push({
          message: item.message,
          kind: item.kind,
        });
      } else {
        updateRes.push({
          response: item.response,
          kind: item.kind,
        });
      }
    });
    return {
      create: {
        errors: createErr,
        result: createRes,
      },
      update: {
        errors: updateErr,
        result: updateRes,
      },
    };
  }

  async createResources(args) {
    const { resources } = args;
    const k8sPaths = await this.kubeConnector.get('/');
    // get resource end point for each resource
    const requestPaths = await Promise.all(resources.map(async (resource) => this.getResourceEndPoint(resource, k8sPaths)));
    if (requestPaths.length === 0 || requestPaths.includes(undefined)) {
      if (requestPaths.length > 0) {
        const resourceIndex = requestPaths.indexOf(undefined);
        return {
          errors: [{ message: `Cannot find resource type "${resources[resourceIndex].apiVersion}"` }],
        };
      }
      return {
        errors: [{ message: 'Cannot find resource path' }],
      };
    }
    if (requestPaths.includes(null)) {
      return {
        errors: [{ message: 'Namespace not found in the template' }],
      };
    }
    if (requestPaths.includes(noResourcetypeStr)) {
      const resourceIndex = requestPaths.indexOf(noResourcetypeStr);
      return {
        errors: [{ message: `Cannot find resource kind "${resources[resourceIndex].kind}"` }],
      };
    }
    const result = await Promise.all(resources.map((resource, index) => this.kubeConnector.post(requestPaths[index], resource)
      .catch((err) => ({
        status: 'Failure',
        message: err.message,
      }))));

    const errors = [];
    result.forEach((item) => {
      if (item.code >= 400 || item.status === 'Failure' || item.message) {
        errors.push({ message: item.message });
      }
    });
    return {
      errors,
      result,
    };
  }

  async patchResource(args) {
    /*
    update k8s resources' labels
    the Content-Type is 'application/json-patch+json'
    the request body should look like:
    [{
     "op": "replace", "path": "/metadata/labels", "value": {
            "cloud": "IBM",
            "datacenter": "toronto",
            "environment": "Dev"
        }
     }]
    */
    const {
      body, resourcePath, selfLink,
    } = args;
    const requestBody = {
      body: [
        {
          op: 'replace',
          path: resourcePath,
          value: body,
        },
      ],
    };
    const response = await this.kubeConnector.patch(`${selfLink}`, requestBody);
    if (response && (response.code || response.message)) {
      throw new Error(`${response.code} - ${response.message}`);
    }
    return response;
  }

  async putResource(args) {
    const { body } = args;
    const requestBody = {
      body,
    };
    const selfLink = buildSelfLinK(body);
    const response = await this.kubeConnector.put(`${selfLink}`, requestBody);
    if (response && (response.code || response.message)) {
      throw new Error(`${response.code} - ${response.message}`);
    }
    return response;
  }

  async getUserAccessCredentials() {
    const targetAPIGroups = [
      'policy.open-cluster-management.io',
      'apps.open-cluster-management.io',
    ];
    const { userNamespaces } = this.kubeConnector;
    return getUserAccessInfo(this.kubeConnector, targetAPIGroups, null, userNamespaces);
  }
}
