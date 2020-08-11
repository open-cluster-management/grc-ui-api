/* eslint-disable no-console */
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
import KubeModel from './kube';
import ApiGroup from '../lib/ApiGroup';

const noResourcetypeStr = '##cannot find resourcetype##';

export default class GenericModel extends KubeModel {
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
    console.log('---- createANDupdate --------');
    console.log(args);
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
    const ur = await Promise.all(toUpdate.map((json) => this.putResource({ body: json, selfLink: json.metadata.selfLink })
      .then((res) => ({ response: res, kind: json.kind }))
      .catch((err) => ({ status: 'Failure', message: err.message, kind: json.kind }))));
    console.log('=============');
    console.log(ur);
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
    console.log('RETURNING........');
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
    console.log('----- generic createresources -------');
    console.log(args);
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
    let endpointURL = '';
    let resourceName = '';
    let response;
    const {
      namespace, name, resourceType, body, resourcePath, selfLink,
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
    if (!selfLink) {
      switch (resourceType) {
        case 'HCMCluster':
          endpointURL = `${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}`;
          resourceName = 'managedclusterinfos';
          break;
        default:
          throw new Error('ACM ERROR cannot find matched resource type');
      }
      response = await this.kubeConnector.patch(`/apis/${endpointURL}/namespaces/${namespace}/${resourceName}/${name}`, requestBody);
    } else {
      // will use selfLink by default
      response = await this.kubeConnector.patch(`${selfLink}`, requestBody);
    }
    if (response && (response.code || response.message)) {
      throw new Error(`${response.code} - ${response.message}`);
    }
    return response;
  }

  async putResource(args) {
    let response;
    const { body, selfLink } = args;
    const requestBody = {
      body,
    };

    if (!selfLink) {
      throw new Error('ACM ERROR cannot find matched resource type');
    } else {
      // will use selfLink by default
      response = await this.kubeConnector.put(`${selfLink}`, requestBody);
    }
    if (response && (response.code || response.message)) {
      throw new Error(`${response.code} - ${response.message}`);
    }
    return response;
  }
}
