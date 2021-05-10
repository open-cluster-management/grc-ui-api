/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */
import _ from 'lodash';
import KubeModel from './kube';
import logger from '../lib/logger';
import ApiGroup from '../lib/ApiGroup';

export default class AnsibleModel extends KubeModel {
  async getAnsibleAutomations() {
    const [ansibleAutomation] = await Promise.all([
      this.kubeConnector.getResources((ns) => `/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${ns}/policyautomations`),
    ]);
    return ansibleAutomation.length > 0 ? ansibleAutomation.map((ans) => ({
      kind: _.get(ans, 'kind', ''),
      apiVersion: _.get(ans, 'apiVersion', ''),
      metadata: {
        name: _.get(ans, 'metadata.name', ''),
        namespace: _.get(ans, 'metadata.namespace', ''),
      },
      spec: {
        policyRef: _.get(ans, 'spec.policyRef', ''),
        eventHook: _.get(ans, 'spec.eventHook', ''),
        mode: _.get(ans, 'spec.mode', ''),
        automation: {
          type: _.get(ans, 'spec.automation.type', ''),
          name: _.get(ans, 'spec.automation.name', ''),
          secret: _.get(ans, 'spec.automation.secret', ''),
          extra_vars: _.get(ans, 'spec.automation.extra_vars', {}),
        },
      },
    })) : [];
  }

  async getAnsibleJobTemplates(args) {
    const options = {
      url: `${args.host}/api/v2/job_templates`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.token}`,
      },
    };

    const response = await this.kubeConnector.http(options)
      .then((res) => res.body)
      .catch((err) => {
        logger.error(err);
        throw err;
      });
    if (!response.results) {
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
      this.kubeConnector.getResources((ns) => `/api/v1/namespaces/${ns}/secrets?labelSelector=cluster.open-cluster-management.io/provider=ans`),
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
        `/api/v1/namespaces/${targetNamespace}/secrets?labelSelector=cluster.open-cluster-management.io/copiedFromSecretName=${name},cluster.open-cluster-management.io/copiedFromNamespace=${namespace}`,
      );
      if (!secret.items) {
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
}
