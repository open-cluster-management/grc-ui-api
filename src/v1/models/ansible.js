/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import _ from 'lodash';
import KubeModel from './kube';
import logger from '../lib/logger';
import ApiGroup from '../lib/ApiGroup';

export default class AnsibleModel extends KubeModel {
  async getPolicyAutomations(namespace) {
    let policyAutomation;
    if (namespace) {
      policyAutomation = await this.kubeConnector.getResources((ns) => `/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${ns}/policyautomations`);
    } else {
      [policyAutomation] = await Promise.all([
        this.kubeConnector.getResources((ns) => `/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${ns}/policyautomations`),
      ]);
    }
    return policyAutomation || [];
  }

  async getAnsibleJobTemplates(args) {
    const options = {
      url: `${args.host}/api/v2/job_templates`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Buffer.from(args.token, 'base64').toString('ascii')}`,
      },
    };
    const response = await this.kubeConnector.http(options)
      .then((res) => res.body)
      .catch((err) => {
        logger.error(err);
        throw err;
      });
    if (!response.results) {
      logger.error(response);
      throw new Error('Failed to retrieve ansible job');
    }
    return response.results.map((result) => ({
      name: result.name,
      description: result.description,
      extra_vars: result.extra_vars,
    }));
  }

  async getAnsibleCredentials() {
    const [ansibleCredentials] = await Promise.all([
      this.kubeConnector.getResources((ns) => `/api/v1/namespaces/${ns}/secrets?labelSelector=cluster.open-cluster-management.io/type=ans`),
    ]);
    return ansibleCredentials.map((ans) => ({
      name: ans.metadata.name,
      namespace: ans.metadata.namespace,
      host: Buffer.from(ans.data.host || '', 'base64').toString('ascii'),
      token: ans.data.token,
    }));
  }

  async copyAnsibleSecret(args) {
    const { name, namespace, targetNamespace } = args;
    if (namespace !== targetNamespace) {
      // check if credentianl has been already created
      const secret = await this.kubeConnector.get(
        `/api/v1/namespaces/${targetNamespace}/secrets?`
        + `labelSelector=cluster.open-cluster-management.io/copiedFromSecretName=${name},cluster.open-cluster-management.io/copiedFromNamespace=${namespace}`,
      );
      if (!secret.items) {
        logger.error(secret);
        throw new Error(`Failed to retrieve copied secrets from ${targetNamespace}`);
      } else {
        if (secret.items.length === 0) {
          // no secret in targetNamespace, need to copy rootSecret and return the name
          const rootSecret = await this.kubeConnector.get(`/api/v1/namespaces/${namespace}/secrets/${name}`);
          rootSecret.metadata.labels = {
            'cluster.open-cluster-management.io/copiedFromNamespace': namespace,
            'cluster.open-cluster-management.io/copiedFromSecretName': name,
          };
          rootSecret.metadata.namespace = targetNamespace;
          rootSecret.metadata.name = `${namespace}.${name}`;
          delete rootSecret.metadata.resourceVersion;
          const result = await this.kubeConnector.post(`/api/v1/namespaces/${targetNamespace}/secrets`, rootSecret);
          if (!result.metadata.name) {
            logger.error(result);
            throw new Error(`Failed to copy secret to ${targetNamespace}`);
          }
          return { name: result.metadata.name };
        }
        // there is a secret, return it
        return { name: secret.items[0].metadata.name };
      }
    } else {
      // Ansible credential already exists in the same namespace, use it directly
      return { name };
    }
  }

  async ansibleAutomationHistories(args) {
    const { name, namespace } = args;
    const ansibleJobs = await this.kubeConnector.get(`/apis/tower.ansible.com/v1alpha1/namespaces/${namespace}/ansiblejobs`);
    if (!ansibleJobs.items) {
      logger.error(ansibleJobs);
      throw new Error('Failed to retrieve ansiblejobs');
    }
    const automation = ansibleJobs.items.filter((ans) => {
      const { metadata: { ownerReferences } } = ans;
      if (!ownerReferences) {
        return false;
      }
      const matched = ownerReferences.find(
        (or) => or.apiVersion === 'policy.open-cluster-management.io/v1beta1' && or.kind === 'PolicyAutomation' && or.name === name,
      );
      return matched !== undefined;
    });
    return automation.map((au) => {
      const conditions = _.get(au, 'status.conditions', []);
      const ansibleResultCondition = conditions.find((arc) => arc.ansibleResult);
      return {
        name: au.metadata.name,
        namespace: au.metadata.namespace,
        status: _.get(au, 'status.ansibleJobResult.status') ? _.get(au, 'status.ansibleJobResult.status') : _.get(ansibleResultCondition, 'reason'),
        message: _.get(ansibleResultCondition, 'message'),
        started: _.get(au, 'status.ansibleJobResult.started') ? _.get(au, 'status.ansibleJobResult.started') : _.get(ansibleResultCondition, 'lastTransitionTime'),
        finished: _.get(au, 'status.ansibleJobResult.finished'),
        job: _.get(au, 'status.k8sJob.namespacedName'),
      };
    });
  }

  async modifyPolicyAutomation(args) {
    const { poliyAutomationJSON, action } = args;
    let resPromise = [];
    const resArray = [];
    const errArray = [];
    if (Array.isArray(poliyAutomationJSON) && poliyAutomationJSON.length > 0
        && action && typeof action === 'string') {
      resPromise = await Promise.all(poliyAutomationJSON.map((json) => this.policyAutomationAction(json, action)
        .then((res) => ({ response: res, kind: json.kind }))
        .catch((err) => ({ status: 'Failure', message: err.message, kind: json.kind }))));
    }
    if (resPromise.length > 0) {
      resPromise.forEach((item) => {
        if (item.status === 'Failure' || item.message) {
          errArray.push({
            message: item.message ? item.message : item,
            kind: item.kind,
          });
        } else {
          resArray.push({
            response: item.response ? item.response : item,
            kind: item.kind,
          });
        }
      });
    }
    return {
      errors: errArray,
      result: resArray,
    };
  }

  async policyAutomationAction(json, action) {
    const name = _.get(json, 'metadata.name');
    const namespace = _.get(json, 'metadata.namespace');
    const url = `/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${namespace}/policyautomations`;
    let response;
    switch (action.trim().toLowerCase()) {
      case 'post':
        response = await this.kubeConnector.post(url, json);
        break;
      case 'patch': {
        // The Kubernetes API server will not recursively create nested objects for a JSON patch input.
        // We need to override header and use merge-patch here
        const requestBody = {
          json,
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
        };
        response = await this.kubeConnector.patch(`${url}/${name}`, requestBody);
        break;
      }
      default:
        // do nothing
    }
    if (response && (response.code || response.message)) {
      throw new Error(`${response.code} - ${response.message}`);
    }
    return response;
  }
}
