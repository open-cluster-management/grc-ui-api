/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ******************************************************************************* */
/* Copyright (c) 2020 Red Hat, Inc. */

import { ApolloError } from 'apollo-errors';
import _ from 'lodash';
import logger from '../lib/logger';
import config from '../../../config';
import ApiURL from '../lib/ApiURL';

const POLICY_FAILURE_STATUS = 'Failure';
const metadataNameStr = 'metadata.name';
const metadataNsStr = 'metadata.namespace';
const specReActionStr = 'spec.remediationAction';
const statusStatusStr = 'status.status';
const specRuntimeRulesStr = 'spec.runtime-rules';
const roleTemplatesStr = 'role-templates';
const roleBindingTemplatesStr = 'roleBinding-templates';
const objectTemplatesStr = 'object-templates';
const policyTemplatesStr = 'policy-templates';
const runtimeRulesStr = 'runtime-rules';
const statusResultsStr = 'status.results';
const statusLCompliantStr = 'status.compliant';
const statusUCompliantStr = 'status.Compliant';
const statusLastTransTimeStr = 'status.conditions[0].lastTransitionTime';
const statusValidityValidStr = 'status.Validity.valid';
const statusValidityStr = 'status.Validity';
const objMetadataNameStr = 'objectDefinition.metadata.name';

function getTemplates(policy = {}, templateType = '') {
  const templates = [];
  Object.entries(policy.spec || []).forEach(([key, value]) => {
    if (key.endsWith(`${templateType}-templates`)) {
      value.forEach(item => templates.push({ ...item, templateType: key }));
    }
  });
  return templates;
}

function createStatusResult(data) {
  const map = new Map();
  data.forEach((item) => {
    const { name, status } = item;
    if (!map.has(name)) {
      map.set(name, { name, total: 0, violated: 0 });
    }
    const exist = map.get(name);
    const { total, violated } = exist;
    map.set(name, { name, total: total + 1, violated: violated + (status === 'compliant' ? 0 : 1) });
  });
  return [...map.values()];
}

function getErrorMessage(item, errorMessage) {
  let updatedErrorMessage = errorMessage;
  if (item.code >= 400 || item.status === POLICY_FAILURE_STATUS) {
    updatedErrorMessage += `${item.message}\n`;
  }

  return updatedErrorMessage;
}

export default class ComplianceModel {
  constructor({ kubeConnector }) {
    if (!kubeConnector) {
      throw new Error('kubeConnector is a required parameter');
    }

    this.kubeConnector = kubeConnector;
  }

  async createPolicy(resources) {
    // TODO: revist this, do something like application,
    // combine policy and compliance into one mutation
    let errorMessage = '';
    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, metadataNsStr, (config.get('complianceNamespace') || 'mcm'));
      return this.kubeConnector.post(`${ApiURL.mcmPolicyApiURL}${namespace}/policies`, resource)
        .catch(err => Error(err));
    }));
    result.forEach((item) => {
      errorMessage = getErrorMessage(item, errorMessage);
    });
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      // TODO: add partical errors
      return result;
    }
  }


  async createCompliance(resources) {
    let errorMessage = '';
    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, metadataNsStr, (config.get('complianceNamespace') || 'mcm'));
      return this.kubeConnector.post(`${ApiURL.mcmComplianceApiURL}${namespace}/compliances`, resource)
        .catch(err => Error(err));
    }));
    result.forEach((item) => {
      errorMessage = getErrorMessage(item, errorMessage);
    });
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      // TODO: add partical errors
      return result;
    }
  }


  async deletePolicy(input) {
    const response = await this.kubeConnector.delete(`${ApiURL.mcmPolicyApiURL}${input.namespace}/policies/${input.name}`);
    if (response.code || response.message) {
      throw new Error(`MCM ERROR ${response.code} - ${response.message}`);
    }
    return response.metadata.name;
  }


  async deleteCompliance(input) {
    const response = await this.kubeConnector.delete(input.selfLink);
    if (response.code || response.message) {
      throw new Error(`GRC ERROR ${response.code} - ${response.message}`);
    }
    const errors = await this.deleteComplianceResource(input.resources);
    if (errors && errors.length > 0) {
      throw new Error(`GRC ERROR: Unable to delete application resource(s) - ${JSON.stringify(errors)}`);
    }
    return response.metadata.name;
  }

  async deleteComplianceResource(resources = []) {
    if (resources.length < 1) {
      logger.info('No Compliance resources selected for deletion');
      return [];
    }

    const result = await Promise.all(resources.map(resource =>
      this.kubeConnector.delete(resource.selfLink)
        .catch(err => ({
          status: 'Failure',
          message: err.message,
        }))));

    const errors = [];
    result.forEach((item) => {
      if (item.code >= 400 || item.status === 'Failure') {
        errors.push({ message: item.message });
      }
    });

    return errors;
  }

  async getCompliances(name, namespace) {
    let policies = [];
    const urlNameSpace = namespace || (config.get('complianceNamespace') ? config.get('complianceNamespace') : 'mcm');
    const clusterNS = {};
    const clusterConsoleURL = {};

    if (namespace) {
      if (name) {
        // get single policy with a specific name and a specific namespace
        const URL = `${ApiURL.ocmPoliciesApiURL}${urlNameSpace}/policies/${name}`;
        const policyResponse = await this.kubeConnector.get(URL);
        if (policyResponse.code || policyResponse.message) {
          logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
        } else {
          policies.push(policyResponse);
        }
      } else {
        // for getting policy list with a specific namespace
        const URL = `${ApiURL.ocmPoliciesApiURL}${urlNameSpace}/policies`;
        const policyResponse = await this.kubeConnector.get(URL);
        if (policyResponse.code || policyResponse.message) {
          logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
        }
        policies = policyResponse.items || [];
      }
    } else {
      // all possible namespaces
      const allNameSpace = this.kubeConnector.namespaces;
      // remove cluster namespaces
      const nsPromises = allNameSpace.map(async (ns) => {
        // check ns one by one, if got normal response then it's cluster namespace
        const checkClusterURL = `${ApiURL.clusterRegistryApiURL}${ns}/clusters`;
        const checkClusterStatusURL = `${ApiURL.mcmNSApiURL}${ns}/clusterstatuses`;
        const [clusters, clusterstatuses] = await Promise.all([
          this.kubeConnector.get(checkClusterURL),
          this.kubeConnector.get(checkClusterStatusURL),
        ]);
        if (Array.isArray(clusters.items) && clusters.items.length > 0) {
          clusters.items.forEach((item) => {
            if (item.metadata && item.metadata.name &&
              !Object.prototype.hasOwnProperty.call(clusterNS, item.metadata.name)
              && item.metadata.namespace) {
              // current each cluster only have one namespace
              clusterNS[item.metadata.name] = item.metadata.namespace;
            }
          });
          clusterstatuses.items.forEach((item) => {
            if (item.metadata && item.metadata.name &&
              !Object.prototype.hasOwnProperty.call(clusterConsoleURL, item.metadata.name)
              && (item.spec && item.spec.consoleURL)) {
              // current each cluster only have one namespace
              clusterConsoleURL[item.metadata.name] = item.spec.consoleURL;
            }
          });
          return null; // cluster namespaces
        }
        return ns; // non cluster namespaces
      });

      // here need to await all async check cluster namespace calls completed
      let allNonClusterNameSpace = await Promise.all(nsPromises);
      // remove cluster namespaces which already set to null
      allNonClusterNameSpace = allNonClusterNameSpace.filter(ns => ns !== null);

      if (name) {
        // get single policy with a specific name and all non-clusters namespaces
        const promises = allNonClusterNameSpace.map(async (ns) => {
          const URL = `${ApiURL.ocmPoliciesApiURL}${ns || config.get('complianceNamespace') || 'mcm'}/policies/${name}`;
          const policyResponse = await this.kubeConnector.get(URL);
          if (policyResponse.code || policyResponse.message) {
            logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
            return null;// 404 or not found
          }
          return policyResponse;// found policy
        });
        // here need to await all async calls completed then combine their results together
        const policyResponses = await Promise.all(promises);
        // remove no found policies
        policies = policyResponses.filter(policyResponse => policyResponse !== null);
      } else { // most general case for all policies
        // for getting policy list with all non-clusters namespaces
        const promises = allNonClusterNameSpace.map(async (ns) => {
          const URL = `${ApiURL.ocmPoliciesApiURL}${ns || config.get('complianceNamespace') || 'mcm'}/policies`;
          const policyResponse = await this.kubeConnector.get(URL);
          if (policyResponse.code || policyResponse.message) {
            logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
            if (policyResponse.code === 403) {
              throw new ApolloError('PermissionError', {
                message: policyResponse.message,
              });
            }
          }
          return policyResponse.items;
        });
        // here need to await all async calls completed then combine their results together
        const policyResponses = await Promise.all(promises);
        // remove empty policies namespaces
        policies = policyResponses.filter(policyResponse => policyResponse.length > 0);
        // flatten 'array of array of object' to 'array of object'
        policies = _.flatten(policies);
      }
    }

    return policies.map(entry => ({
      ...entry,
      raw: entry,
      name: _.get(entry, metadataNameStr, ''),
      namespace: _.get(entry, metadataNsStr, ''),
      remediation: _.get(entry, specReActionStr, ''),
      clusters: _.keys(_.get(entry, statusStatusStr), ''),
      clusterNS,
      clusterConsoleURL,
    }));
  }


  static resolveCompliancePolicies(parent) {
    const aggregatedStatus = _.get(parent, statusStatusStr);
    // compliance that has aggregatedStatus
    if (aggregatedStatus) {
      return this.resolvePolicyFromStatus(aggregatedStatus, parent);
    }
    // in this case, a compliance doesn't connect with a
    // placementPolicy may not have aggregatedStatus
    return this.resolvePolicyFromSpec(parent);
  }

  static resolveCompliancePolicy(parent) {
    const aggregatedStatus = _.get(parent, statusStatusStr);
    return this.resolveCompliancePoliciesFromSpec(parent, aggregatedStatus);
  }

  static resolveCompliancePoliciesFromSpec(parent, aggregatedStatus) {
    const compliancePolicies = {};
    const policies = _.get(parent, specRuntimeRulesStr)
      ? _.get(parent, specRuntimeRulesStr) : [parent];
    policies.forEach((policy) => {
      const key = _.get(policy, metadataNameStr);
      const value = {
        name: _.get(policy, metadataNameStr),
        complianceName: _.get(parent, metadataNameStr),
        complianceNamespace: _.get(parent, metadataNsStr),
        complianceSelfLink: _.get(parent, 'metadata.selfLink'),
        roleTemplates: this.resolvePolicyTemplates(policy, roleTemplatesStr),
        roleBindingTemplates: this.resolvePolicyTemplates(policy, roleBindingTemplatesStr),
        objectTemplates: this.resolvePolicyTemplates(policy, objectTemplatesStr),
        policyTemplates: this.resolvePolicyTemplates(policy, policyTemplatesStr),
        detail: this.resolvePolicyDetails(policy),
        raw: policy,
      };
      compliancePolicies[key] = value;
    });


    if (aggregatedStatus) {
      Object.values(aggregatedStatus).forEach((cluster) => {
        Object.entries(_.get(cluster, 'aggregatePoliciesStatus', {})).forEach(([key, value]) => {
          let policy;
          if (parent.spec[runtimeRulesStr]) {
            policy = parent.spec[runtimeRulesStr].find(p => p.metadata.name === key);
          }
          const policyObject = {
            compliant: this.resolveStatus(value),
            enforcement: _.get(policy, specReActionStr, 'unknown'),
            message: _.get(value, 'message', '-'),
            rules: this.resolvePolicyRules(policy), // TODO: Use resolver.
            status: this.resolveStatus(value),
            violations: this.resolvePolicyViolations(policy, cluster), // TODO: Use resolver.
            metadata: {
              ...parent.metadata,
              name: key,
            },
          };

          compliancePolicies[key] = { ...compliancePolicies[key], ...policyObject };
        });
      });
    }

    return Object.values(compliancePolicies);
  }

  static resolvePolicyFromStatus(aggregatedStatus, parent) {
    const compliancePolicies = [];
    Object.values(aggregatedStatus).forEach((cluster) => {
      Object.entries(_.get(cluster, 'aggregatePoliciesStatus', {})).forEach(([key, value]) => {
        let policy;
        if (parent.spec[runtimeRulesStr]) {
          policy = parent.spec[runtimeRulesStr].find(p => p.metadata.name === key);
        }
        const policyObject = {
          cluster: _.get(cluster, 'clustername', parent.metadata.namespace),
          complianceName: parent.metadata.name,
          complianceNamespace: parent.metadata.namespace,
          compliant: this.resolveStatus(value),
          enforcement: _.get(policy, specReActionStr, 'unknown'),
          message: _.get(value, 'message', '-'),
          name: key,
          rules: this.resolvePolicyRules(policy), // TODO: Use resolver.
          status: this.resolveStatus(value),
          valid: this.resolveValid(value),
          violations: this.resolvePolicyViolations(policy, cluster), // TODO: Use resolver.
          roleTemplates: this.resolvePolicyTemplates(policy, roleTemplatesStr),
          roleBindingTemplates: this.resolvePolicyTemplates(policy, roleBindingTemplatesStr),
          objectTemplates: this.resolvePolicyTemplates(policy, objectTemplatesStr),
          detail: this.resolvePolicyDetails(policy),
          raw: policy,
          metadata: {
            ...parent.metadata,
            name: key,
          },
        };

        compliancePolicies.push(policyObject);
      });
    });

    const tempResult = {};
    Object.values(compliancePolicies).forEach((policy) => {
      if (!tempResult[policy.name]) {
        tempResult[policy.name] = {
          name: _.get(policy, 'name'),
          complianceName: _.get(policy, 'complianceName'),
          complianceNamespace: _.get(policy, 'complianceNamespace'),
          clusterCompliant: [],
          clusterNotCompliant: [],
          policies: [],
        };
      }
      tempResult[policy.name].policies.push(policy);
      if (_.get(policy, 'compliant', '').toLowerCase() === 'compliant') {
        tempResult[policy.name].clusterCompliant.push(_.get(policy, 'cluster'));
      } else {
        tempResult[policy.name].clusterNotCompliant.push(_.get(policy, 'cluster'));
      }
    });
    return Object.values(tempResult);
  }


  static resolvePolicyFromSpec(parent) {
    const compliancePolicies = [];
    const policies = _.get(parent, specRuntimeRulesStr, []);
    policies.forEach((policy) => {
      compliancePolicies.push({
        name: _.get(policy, metadataNameStr),
        complianceName: _.get(parent, metadataNameStr),
        complianceNamespace: _.get(parent, metadataNsStr),
      });
    });
    return Object.values(compliancePolicies);
  }

  static resolveStatus(parent) {
    return _.get(parent, 'Compliant') || _.get(parent, 'compliant', 'unknown');
  }

  static resolveValid(parent) {
    if (_.get(parent, 'Valid') !== undefined) {
      return _.get(parent, 'Valid') ? true : 'invalid';
    }
    if (_.get(parent, 'valid') !== undefined) {
      return _.get(parent, 'valid') ? true : 'invalid';
    }
    return 'unknown';
  }

  static resolveComplianceStatus(parent) {
    const complianceStatus = [];
    Object.entries(_.get(parent, statusStatusStr, {}))
      .forEach(([clusterName, perClusterStatus]) => {
        const aggregatedStatus = _.get(perClusterStatus, 'aggregatePoliciesStatus', {});

        // get compliant status per cluster
        if (aggregatedStatus) {
          let validNum = 0;
          let compliantNum = 0;
          let policyNum = 0;
          Object.values(aggregatedStatus).forEach((object) => {
            if (this.resolveStatus(object) === 'Compliant') {
              compliantNum += 1;
            }
            if (this.resolveValid(object)) {
              validNum += 1;
            }
            policyNum += 1;
          });
          complianceStatus.push({
            clusterNamespace: clusterName,
            localCompliantStatus: `${compliantNum}/${policyNum}`,
            localValidStatus: `${validNum}/${policyNum}`,
            compliant: _.get(perClusterStatus, 'compliant', '-'),
          });
        }
      });

    return complianceStatus;
  }


  static resolvePolicyCompliant({ status = {} }) {
    let totalPolicies = 0;
    let compliantPolicies = 0;

    Object.values(status.status || []).forEach((cluster) => {
      Object.values(cluster.aggregatePoliciesStatus || {}).forEach((policyValue) => {
        totalPolicies += 1;
        if (this.resolveStatus(policyValue).toLowerCase() === 'compliant') {
          compliantPolicies += 1;
        }
      });
    });

    return `${totalPolicies - compliantPolicies}/${totalPolicies}`;
  }


  static resolveClusterCompliant({ status = {} }) {
    if (status && status.status) {
      const totalClusters = Object.keys(status.status).length;
      const compliantClusters = Object.values(status.status || []).filter(cluster => (_.get(cluster, 'compliant', '').toLowerCase() === 'compliant'));
      return `${totalClusters - compliantClusters.length}/${totalClusters}`;
    }
    return '0/0';
  }

  static resolveAnnotations(parent) {
    const rawAnnotations = _.get(parent, 'metadata.annotations', {});
    return {
      categories: _.get(rawAnnotations, 'policy.mcm.ibm.com/categories', '-'),
      controls: _.get(rawAnnotations, 'policy.mcm.ibm.com/controls', '-'),
      standards: _.get(rawAnnotations, 'policy.mcm.ibm.com/standards', '-'),
    };
  }

  async getPlacementRules(parent = {}) {
    const placements = _.get(parent, 'status.placement', []);
    const response = await this.kubeConnector.getResources(
      ns => `${ApiURL.ocmAppsApiURL}${ns}/placementrules`,
      { kind: 'PlacementRule' },
    );
    const map = new Map();
    if (response) {
      response.forEach(item => map.set(item.metadata.name, item));
    }
    const placementPolicies = [];

    placements.forEach((placement) => {
      const rule = _.get(placement, 'placementRule', '');
      const pp = map.get(rule);
      if (pp) {
        const spec = pp.spec || {};
        placementPolicies.push({
          clusterLabels: spec.clusterSelector,
          metadata: pp.metadata,
          raw: pp,
          clusterReplicas: spec.clusterReplicas,
          resourceSelector: spec.resourceHint,
          status: pp.status,
        });
      }
    });
    return placementPolicies;
  }

  async getPlacementBindings(parent = {}) {
    const placements = _.get(parent, 'status.placement', []);
    const response = await this.kubeConnector.getResources(
      ns => `${ApiURL.ocmPoliciesApiURL}${ns}/placementbindings`,
      { kind: 'PlacementBinding' },
    );
    const map = new Map();
    if (response) {
      response.forEach(item => map.set(item.metadata.name, item));
    }
    const placementBindings = [];

    placements.forEach((placement) => {
      const binding = _.get(placement, 'placementBinding', '');
      const pb = map.get(binding);
      if (pb) {
        placementBindings.push({
          metadata: pb.metadata,
          raw: pb,
          placementRef: pb.placementRef,
          subjects: pb.subjects,
        });
      }
    });
    return placementBindings;
  }

  async getAllTemplates(policyName) {
    const allViolationsArray = [];
    if (policyName === null) {
      return allViolationsArray;
    }
    const response = await this.kubeConnector.resourceViewQuery('policies.policy.mcm.ibm.com');
    const clusterResults = _.get(response, statusResultsStr);
    const roleTemplates = [];
    const policyTemplates = [];
    _.forIn(clusterResults, (value) => {
      const paresdValues = _.get(value, 'items');
      paresdValues.forEach((policy) => {
        const roleTemplateResult = getTemplates(policy, 'role');
        const policyTemplateResult = getTemplates(policy, 'object');
        if (roleTemplateResult.length > 0) {
          roleTemplates.push(roleTemplateResult);
        } else if (policyTemplateResult.length > 0) {
          policyTemplates.push(policyTemplateResult);
        }
      });
    });
    let allTemplates = _.flattenDeep(roleTemplates);
    allTemplates = allTemplates.concat(_.flattenDeep(policyTemplates));

    return allTemplates;
  }

  async getPolicies(name, clusterName) {
    if (name === null) {
      return [];
    }
    const policyResult = [];
    const URL = `${ApiURL.ocmPoliciesApiURL}${clusterName}/policies/${name}`;
    const policyResponse = await this.kubeConnector.get(URL);
    if (policyResponse.code || policyResponse.message) {
      logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
      return null;// 404 or not found
    }
    policyResult.push({
      cluster: _.get(policyResponse, 'metadata.namespace'),
      ...policyResponse,
    });
    return policyResult;
  }

  async getAllPoliciesInCluster(cluster) {
    // if policy name specified
    if (cluster !== undefined) {
      const response = await this.kubeConnector.resourceViewQuery('policies.policy.mcm.ibm.com', cluster, undefined, false, true);
      const results = _.get(response, statusResultsStr);
      if (results) {
        const item = _.get(results, `${cluster}`, {});
        if (item) {
          const result = [];
          item.items.forEach(policy => result.push({ ...policy, raw: policy }));
          return result;
        }
      }
    }
    return [];
  }

  async getAllClustersInPolicy(policyName, hubNamespace) {
    // if policy name specified
    const response = await this.kubeConnector.resourceViewQuery('policies.policy.mcm.ibm.com');
    const results = _.get(response, statusResultsStr);
    const policiesMap = new Map();
    if (results) {
      let result = [];
      const clusterNames = Object.keys(results);
      // eslint-disable-next-line no-restricted-syntax
      for (const cluster of clusterNames) {
        const item = _.get(results, `${cluster}`, {});
        const policies = item.items;
        // eslint-disable-next-line
        policies.forEach((policy) => {
          if (_.get(policy, metadataNameStr) === `${hubNamespace}.${policyName}` && _.get(policy, metadataNsStr) === cluster) {
            if (_.get(policy, statusLCompliantStr, '').toLowerCase() === 'compliant') {
              result.push({ name: cluster, status: 'compliant' });
            } else {
              result.push({ name: cluster, status: 'violated' });
            }
            policiesMap.set(cluster, policy);
          }
        });
      }
      const [clusters, clusterstatuses] = await Promise.all([
        this.kubeConnector.getResources(ns => `${ApiURL.clusterRegistryApiURL}${ns}/clusters`),
        this.kubeConnector.getResources(ns => `${ApiURL.mcmNSApiURL}${ns}/clusterstatuses`),
      ]);
      const clusterMap = new Map();
      const clusterStatusMap = new Map();
      clusters.forEach(cluster => clusterMap.set(_.get(cluster, metadataNameStr, ''), cluster));
      clusterstatuses.forEach((cluster) => {
        clusterStatusMap.set(_.get(cluster, metadataNameStr, ''), { metadata: _.get(cluster, 'metadata'), spec: { consoleURL: _.get(cluster, 'spec.consoleURL') } });
      });
      result = createStatusResult(result);
      result = result.map((item) => {
        const { name } = item;
        const info = clusterMap.get(name);
        const status = clusterStatusMap.get(name);
        return {
          ...item, ...info, ...status, policy: policiesMap.get(name),
        };
      });
      return result;
    }
    return [];
  }

  // input is a list of policies name with each clusterName specified
  async getAllPoliciesInApplication(violatedPolicies) {
    const filterViolatedPolicies = [];
    if (Array.isArray(violatedPolicies) && violatedPolicies.length > 0) {
      const clusterSet = new Set();
      // use policy name + cluster name as combination set value
      const violatedPoliciesSet = new Set();
      violatedPolicies.forEach((policy) => {
        if (policy.name && Array.isArray(policy.clusters) && policy.clusters.length > 0) {
          policy.clusters.forEach((cluster) => {
            if (cluster.name) {
              const clusterKey = cluster.name;
              if (!clusterSet.has(clusterKey)) {
                clusterSet.add(clusterKey);
              }
              const violatedPoliciesKey = `${policy.name}+${cluster.name}`;
              if (!violatedPoliciesSet.has(violatedPoliciesKey)) {
                violatedPoliciesSet.add(violatedPoliciesKey);
              }
            }
          });
        }
      });

      const outerPromises = Array.from(clusterSet).map(async (clusterName) => {
        const allPoliciesInCluster = await this.getAllPoliciesInCluster(clusterName);
        const innerPromises = allPoliciesInCluster.map(async (policy) => {
          if (policy.metadata) {
            const policiesKey = `${_.get(policy, 'metadata.labels.parent-policy', '')}+${clusterName}`;
            const realNameKey = `${_.get(policy, metadataNameStr, '')}+${clusterName}`;
            if (violatedPoliciesSet.has(policiesKey) || violatedPoliciesSet.has(realNameKey)) {
              const filterViolatedPolicy = policy;
              filterViolatedPolicy.cluster = clusterName;
              await filterViolatedPolicies.push(filterViolatedPolicy);
            }
          }
        });
        // here need to await all inner loop async calls completed
        await Promise.all(innerPromises);
      });
      // here need to await all outer loop async calls completed
      await Promise.all(outerPromises);
    }
    return filterViolatedPolicies;
  }

  async getAllViolationsInPolicy(policyName, hubNamespace) {
    const resultsWithPolicyName = [];
    if (policyName === null) {
      return resultsWithPolicyName;
    }
    const clusterNS = {};
    const clusterConsoleURL = {};
    // all possible namespaces
    const allNameSpace = this.kubeConnector.namespaces;
    // remove cluster namespaces
    const nsPromises = allNameSpace.map(async (ns) => {
      // check ns one by one, if got normal response then it's cluster namespace
      const checkClusterURL = `${ApiURL.clusterRegistryApiURL}${ns}/clusters`;
      const checkClusterStatusURL = `${ApiURL.mcmNSApiURL}${ns}/clusterstatuses`;
      const [clusters, clusterstatuses] = await Promise.all([
        this.kubeConnector.get(checkClusterURL),
        this.kubeConnector.get(checkClusterStatusURL),
      ]);
      if (Array.isArray(clusters.items) && clusters.items.length > 0) {
        clusters.items.forEach((item) => {
          if (item.metadata && item.metadata.name &&
            !Object.prototype.hasOwnProperty.call(clusterNS, item.metadata.name)
            && item.metadata.namespace) {
            // current each cluster only have one namespace
            clusterNS[item.metadata.name] = item.metadata.namespace;
          }
        });
        clusterstatuses.items.forEach((item) => {
          if (item.metadata && item.metadata.name &&
            !Object.prototype.hasOwnProperty.call(clusterConsoleURL, item.metadata.name)
            && (item.spec && item.spec.consoleURL)) {
            // current each cluster only have one namespace
            clusterConsoleURL[item.metadata.name] = item.spec.consoleURL;
          }
        });
        return ns; // cluster namespaces
      }
      return null; // non cluster namespaces
    });

    // here need to await all async check cluster namespace calls completed
    let allClusterNameSpace = await Promise.all(nsPromises);
    // remove cluster namespaces which already set to null
    allClusterNameSpace = allClusterNameSpace.filter(ns => ns !== null);

    const promises = allClusterNameSpace.map(async (ns) => {
      const URL = `${ApiURL.ocmPoliciesApiURL}${ns}/policies/${hubNamespace}.${policyName}`;
      const policyResponse = await this.kubeConnector.get(URL);
      if (policyResponse.code || policyResponse.message) {
        logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
        return null;// 404 or not found
      }
      return policyResponse;// found policy
    });
    // here need to await all async calls completed then combine their results together
    const policyResponses = await Promise.all(promises);
    // remove no found policies

    return policyResponses.filter(policyResponse => policyResponse !== null);

    // Policy history are to be generated from all violated policies get above.
    // Current violation status are to be get from histroy[most-recent]

    // Update May19, the current return doesn't contains history info
  }


  static resolvePolicyDetails(parent) {
    return {
      exclude_namespace: _.get(parent, 'spec.namespaces.exclude', ['*']),
      include_namespace: _.get(parent, 'spec.namespaces.include', ['*']),
    };
  }

  static resolvePolicyEnforcement(parent) {
    return _.get(parent, specReActionStr, 'unknown');
  }

  static resolvePolicyRules(parent) {
    const rules = [];
    getTemplates(parent).forEach((res) => {
      if (res.rules) {
        Object.entries(res.rules).forEach(([key, rul]) => {
          const complianceType = _.get(rul, 'complianceType');
          if (complianceType) {
            const rule = {
              complianceType,
              apiGroups: _.get(rul, 'policyRule.apiGroups', ['-']),
              resources: _.get(rul, 'policyRule.resources', ['-']),
              verbs: _.get(rul, 'policyRule.verbs', ['-']),
              templateType: _.get(res, 'templateType', ''),
              ruleUID: `${_.get(res, metadataNameStr, '-')}-rule-${key}`,
            };
            rules.push(rule);
          }
        });
      }
    });
    return rules;
  }

  static resolveRoleSubjects(parent) {
    let roleSubjects = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === roleBindingTemplatesStr) {
        roleSubjects = [..._.get(res, 'roleBinding.subjects', [])];
      }
    });
    return roleSubjects;
  }

  static resolveRoleRef(parent) {
    const roleRef = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === roleBindingTemplatesStr) {
        roleRef.push(_.get(res, 'roleBinding.roleRef', {}));
      }
    });
    return roleRef;
  }

  static resolvePolicyStatus(parent) {
    if (_.get(parent, statusUCompliantStr) || _.get(parent, statusLCompliantStr)) {
      return _.get(parent, statusUCompliantStr) || _.get(parent, statusLCompliantStr);
    }
    if (_.get(parent, 'status.Valid') !== undefined) {
      return _.get(parent, 'status.Valid') ? 'valid' : 'invalid';
    }
    if (_.get(parent, 'status.valid') !== undefined) {
      return _.get(parent, 'status.valid') ? 'valid' : 'invalid';
    }
    return 'unknown';
  }

  static resolvePolicyMessage(parent) {
    return _.get(parent, 'status.message', '-');
  }

  static resolvePolicyTemplates(parent, type) {
    const tempArray = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === type) {
        if (type === roleBindingTemplatesStr) {
          tempArray.push({
            name: _.get(res, 'roleBinding.metadata.name', '-'),
            lastTransition: _.get(res, statusLastTransTimeStr, ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'roleBinding.apiVersion', ''),
            compliant: _.get(res, statusUCompliantStr, ''),
            validity: _.get(res, statusValidityValidStr) || _.get(res, statusValidityStr, ''),
            raw: res,
          });
        } else if (type === objectTemplatesStr || type === policyTemplatesStr) {
          tempArray.push({
            name: _.get(res, objMetadataNameStr, '-'),
            lastTransition: _.get(res, statusLastTransTimeStr, ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'objectDefinition.apiVersion', ''),
            kind: _.get(res, 'objectDefinition.kind', ''),
            compliant: _.get(res, statusUCompliantStr, ''),
            status: _.get(res, statusUCompliantStr, ''),
            validity: _.get(res, statusValidityValidStr) || _.get(res, statusValidityStr, ''),
            raw: res,
          });
        } else {
          tempArray.push({
            name: _.get(res, metadataNameStr, '-'),
            lastTransition: _.get(res, statusLastTransTimeStr, ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'apiVersion', ''),
            compliant: _.get(res, statusUCompliantStr, ''),
            status: _.get(res, statusUCompliantStr, ''),
            validity: _.get(res, statusValidityValidStr) || _.get(res, statusValidityStr, ''),
            raw: res,
          });
        }
      }
    });
    return tempArray;
  }

  static resolvePolicyViolations(parent, cluster) {
    const violationArray = [];
    getTemplates(parent).forEach((res) => {
      const templateCondition = _.get(res, 'status.conditions[0]');
      if (_.get(res, 'templateType') === roleTemplatesStr) {
        violationArray.push({
          name: _.get(res, metadataNameStr, '-'),
          cluster: _.get(cluster, 'clustername', '-'),
          status: this.resolvePolicyStatus(res),
          message: (templateCondition && _.get(templateCondition, 'message', '-')) || '-',
          reason: (templateCondition && _.get(templateCondition, 'reason', '-')) || '-',
          selector: _.get(res, 'selector', ''),
        });
      } else if (_.get(res, 'templateType') === objectTemplatesStr || _.get(res, 'templateType') === policyTemplatesStr) {
        violationArray.push({
          name: _.get(res, objMetadataNameStr) ?
            _.get(res, objMetadataNameStr) : _.get(res, 'objectDefinition.kind', '-'),
          cluster: _.get(cluster, 'clustername', '-'),
          status: this.resolvePolicyStatus(res),
          message: (templateCondition && _.get(templateCondition, 'message', '-')) || '-',
          reason: (templateCondition && _.get(templateCondition, 'reason', '-')) || '-',
          selector: _.get(res, 'selector', ''),
        });
      }
    });
    return violationArray;
  }
}
