/* eslint-disable no-unused-vars */
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
import ApiGroup from '../lib/ApiGroup';
import getTypedNS from '../lib/getTypedNS';

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
const statusLCompliantStr = 'status.compliant';
const statusUCompliantStr = 'status.Compliant';
const statusLastTransTimeStr = 'status.conditions[0].lastTransitionTime';
const statusValidityValidStr = 'status.Validity.valid';
const statusValidityStr = 'status.Validity';
const objMetadataNameStr = 'objectDefinition.metadata.name';
const statusDetails = 'status.details';
const templateMetaNameStr = 'templateMeta.name';
const historyLatestMessageStr = 'history[0].message';
const historyLatestTimestampStr = 'history[0].lastTimestamp';

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
      const namespace = _.get(resource, metadataNsStr, (config.get('complianceNamespace') || 'acm'));
      return this.kubeConnector.post(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${namespace}/policies`, resource)
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
    const response = await this.kubeConnector.delete(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${input.namespace}/policies/${input.name}`);
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
      this.kubeConnector.delete(resource.selfLink).catch(err => ({
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

  // get a single policy on a specific namespace
  async getSinglePolicy(name, urlNameSpace) {
    const URL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${urlNameSpace}/policies/${name}`;
    const policyResponse = await this.kubeConnector.get(URL);
    if (policyResponse.code || policyResponse.message) {
      logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
    }
    return policyResponse;
  }

  // get a single policy on all non-clusters namespaces
  async getSinglePolicyAllNS(name, allNonClusterNameSpace) {
    const promises = allNonClusterNameSpace.map(async (ns) => {
      const URL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${ns || config.get('complianceNamespace') || 'acm'}/policies/${name}`;
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
  }

  // get the policy list on a specific namespace
  async getPolicyListSingleNS(urlNameSpace) {
    const URL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${urlNameSpace}/policies`;
    const policyResponse = await this.kubeConnector.get(URL);
    if (policyResponse.code || policyResponse.message) {
      logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
    }
    return policyResponse.items || [];
  }

  // general case for all policies, get the policy list on all non-clusters namespaces
  async getPolicyListAllNS(allNonClusterNameSpace) {
    const promises = allNonClusterNameSpace.map(async (ns) => {
      const URL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${ns || config.get('complianceNamespace') || 'acm'}/policies`;
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
    const policies = policyResponses.filter(policyResponse => policyResponse.length > 0);
    // flatten 'array of array of object' to 'array of object'
    return _.flatten(policies);
  }

  // // if nsType === 'allNonClusteNS', get the list of all non-clusters namespaces
  // // if nsType === 'allClusterNS', get the list of all clusters namespaces
  // async getTypedNS(nsType) {
  //   const clusterNSTemp = {};
  //   const clusterConsoleURLTemp = {};

  //   // all possible namespaces
  //   const allNameSpace = this.kubeConnector.namespaces;
  //   // remove cluster namespaces
  //   const nsPromises = allNameSpace.map(async (ns) => {
  //     const checkClustersInfoURL = `/apis/internal.open-cluster-management.io/v1beta1/namespaces/${ns}/managedclusterinfos`;
  //     const [clustersInfo] = await Promise.all([this.kubeConnector.get(checkClustersInfoURL)]);
  //     const clusterItems = _.get(clustersInfo, 'items');
  //     if (Array.isArray(clusterItems) && clusterItems.length > 0) {
  //       logger.info(`ns is ${ns} : ${JSON.stringify(clusterItems)}`);
  //       clusterItems.forEach((item) => {
  //         if (item.metadata && item.metadata.name
  //             && !Object.prototype.hasOwnProperty.call(clusterNSTemp, item.metadata.name)
  //             && item.metadata.namespace) {
  //           // current each cluster only have one namespace
  //           clusterNSTemp[item.metadata.name] = item.metadata.namespace;
  //           if (item.status && item.status.consoleURL) {
  //             clusterConsoleURLTemp[item.metadata.name] = item.spec.consoleURL;
  //           }
  //         }
  //       });// if nsType === 'allClusterNS', put cluster namespaces into final result
  //       return (nsType === 'allNonClusterNS') ? null : ns;
  //     }// if nsType === 'allNonClusteNS', put non cluster namespaces into final result
  //     return (nsType === 'allNonClusterNS') ? ns : null;
  //   });

  //   let nsResults = await Promise.all(nsPromises);
  //   nsResults = nsResults.filter(ns => ns !== null);

  //   const finalResult = (nsType === 'allNonClusterNS') ?
  //     {
  //       clusterNSTemp,
  //       clusterConsoleURLTemp,
  //       allNonClusterNS: nsResults,
  //     } :
  //     {
  //       clusterNSTemp,
  //       clusterConsoleURLTemp,
  //       allClusterNS: nsResults,
  //     };

  //   return finalResult;
  // }

  async getCompliances(name, namespace) {
    const urlNameSpace = namespace || (config.get('complianceNamespace') ? config.get('complianceNamespace') : 'acm');
    let policies = [];
    let clusterNS = {};
    let clusterConsoleURL = {};

    if (namespace) {
      if (name) {
        policies.push(await this.getSinglePolicy(name, urlNameSpace));
      } else {
        policies = await this.getPolicyListSingleNS(urlNameSpace);
      }
    } else {
      const {
        clusterNSTemp,
        clusterConsoleURLTemp,
        allNonClusterNS,
      } = await getTypedNS(this.kubeConnector, 'allNonClusterNS');
      clusterNS = clusterNSTemp;
      clusterConsoleURL = clusterConsoleURLTemp;
      if (name) {
        policies = await this.getSinglePolicyAllNS(name, allNonClusterNS);
      } else {
        policies = await this.getPolicyListAllNS(allNonClusterNS);
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
      categories: _.get(rawAnnotations, `${ApiGroup.policiesGroup}/categories`, '-'),
      controls: _.get(rawAnnotations, `${ApiGroup.policiesGroup}/controls`, '-'),
      standards: _.get(rawAnnotations, `${ApiGroup.policiesGroup}/standards`, '-'),
    };
  }

  async getPlacementRules(parent = {}) {
    const placements = _.get(parent, 'status.placement', []);
    const response = await this.kubeConnector.getResources(
      ns => `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/${ns}/placementrules`,
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
      ns => `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${ns}/placementbindings`,
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

  async getPolicies(name, clusterName) {
    const policyResult = [];
    if (name !== null) {
      const URL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${clusterName}/policies/${name}`;
      const policyResponse = await this.kubeConnector.get(URL);
      if (policyResponse.code || policyResponse.message) {
        logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
        return null;// 404 or not found
      }
      policyResult.push({
        cluster: _.get(policyResponse, 'metadata.namespace'),
        ...policyResponse,
        raw: policyResponse,
      });
    }
    return policyResult;
  }

  async getAllPoliciesInCluster(cluster) {
    const allPoliciesInClusterResult = [];
    // if cluster name specified
    if (cluster !== undefined) {
      const URL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${cluster}/policies/`;
      const policyListResponse = await this.kubeConnector.get(URL);
      const policyListItems = _.get(policyListResponse, 'items');
      if (Array.isArray(policyListItems) && policyListItems.length > 0) {
        policyListItems.forEach((policyListItem) => {
          const policyNS = _.get(policyListItem, metadataNsStr);
          if (policyNS && policyNS.trim().toLowerCase() === cluster.trim().toLowerCase()) {
            const policiesStatusDetails = [];
            const policyListDetails = _.get(policyListItem, statusDetails);
            policyListDetails.forEach((detail) => {
              policiesStatusDetails.push({
                name: _.get(detail, templateMetaNameStr, '-'),
                compliant: _.get(detail, 'compliant', '-'),
                message: _.get(detail, historyLatestMessageStr, '-'),
                lastTimestamp: _.get(detail, historyLatestTimestampStr, '-'),
              });
            });
            allPoliciesInClusterResult.push({ cluster, ...policyListItem, policiesStatusDetails });
          }
        });
      }
    }
    return allPoliciesInClusterResult;
  }

  async getAllClustersInPolicy(policyName, hubNamespace) {
    let allClustersInPolicyResult = [];
    if (policyName && hubNamespace) {
      // step 1 get the clusters associated with this policy (policyName)
      const policyDetailsURL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${hubNamespace}/policies/${policyName}`;
      const policyDetails = await this.kubeConnector.get(policyDetailsURL);
      const clustersList = _.get(policyDetails, statusStatusStr);
      if (Array.isArray(clustersList) && clustersList.length > 0) {
        // step 2 set cluster violated info for this policy
        let temp = [];
        clustersList.forEach((cluster) => {
          if (cluster.compliant.trim().toLowerCase() === 'compliant') {
            temp.push({ name: cluster.clustername, status: 'compliant' });
          } else {
            temp.push({ name: cluster.clustername, status: 'violated' });
          }
        });
        // step 3 calculate violated clusters number / total clusters number
        temp = createStatusResult(temp);
        // step 4 for each cluster from step 1, get the policies list info on that cluster
        const policyListPromise = temp.map(async (cluster) => {
          const singlePolicyListURL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${cluster.name}/policies/`;
          const singlePolicyList = await this.kubeConnector.get(singlePolicyListURL);
          const policyListItems = _.get(singlePolicyList, 'items');
          const policyListStatuses = [];
          // only keep policies list info for this policy (policyName)
          if (Array.isArray(policyListItems) && policyListItems.length > 0) {
            policyListItems.forEach((policyListItem) => {
              const itemName = _.get(policyListItem, 'metadata.name').trim().toLowerCase();
              if (itemName === `${hubNamespace.trim().toLowerCase()}.${policyName.trim().toLowerCase()}`
              || itemName === policyName.trim().toLowerCase()) {
                const policyListDetails = _.get(policyListItem, statusDetails);
                policyListDetails.forEach((detail) => {
                  policyListStatuses.push({
                    name: _.get(detail, templateMetaNameStr, '-'),
                    compliant: _.get(detail, 'compliant', '-'),
                    message: _.get(detail, historyLatestMessageStr, '-'),
                    lastTimestamp: _.get(detail, historyLatestTimestampStr, '-'),
                  });
                });
              }
            });
          }
          return {
            ...cluster,
            policyListStatuses,
          };
        });
        allClustersInPolicyResult = await Promise.all(policyListPromise);
        // step 5 get cluster info like consoleURL, need to update cluster Api after installer2.0
        const [clusterStatuses] = await Promise.all([
          this.kubeConnector.getResources(ns => `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/${ns}/clusterstatuses`),
        ]);
        const clusterStatusMap = new Map();
        clusterStatuses.forEach((cluster) => {
          clusterStatusMap.set(
            _.get(cluster, metadataNameStr, ''),
            { metadata: _.get(cluster, 'metadata'), spec: { consoleURL: _.get(cluster, 'spec.consoleURL', '') } },
          );
        });
        allClustersInPolicyResult = allClustersInPolicyResult.map((clusterInfo) => {
          const status = clusterStatusMap.get(clusterInfo.name);
          return {
            ...clusterInfo, ...status,
          };
        });
      }
    }
    return allClustersInPolicyResult;
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
    const clusterConsoleURL = {};
    // nsType === 'allClusterNS', get the list of all clusters namespaces
    const { allClusterNS } = await getTypedNS(this.kubeConnector, 'allClusterNS');

    const promises = allClusterNS.map(async (ns) => {
      const URL = `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/${ns}/policies/${hubNamespace}.${policyName}`;
      const policyResponse = await this.kubeConnector.get(URL);
      if (policyResponse.code || policyResponse.message) {
        logger.error(`GRC ERROR ${policyResponse.code} - ${policyResponse.message} - URL : ${URL}`);
        return null;// 404 or not found
      }
      return policyResponse;// found policy
    });
    // here need to await all async calls completed then combine their results together
    const policyResponses = await Promise.all(promises);
    // remove no found and comliant policies
    policyResponses.filter((policyResponse) => {
      if (policyResponse === null || policyResponse === undefined) {
        return false;
      }
      return true;
    });
    // Policy history are to be generated from all violated policies get above.
    // Current violation status are to be get from histroy[most-recent]
    const violations = [];
    policyResponses.forEach((policyResponse) => {
      const cluster = _.get(policyResponse, 'metadata.labels["policy.open-cluster-management.io/cluster-name"]', '-');
      let details = _.get(policyResponse, statusDetails, []);
      details = details.filter(detail => _.get(detail, 'compliant', 'unknown') === 'NonCompliant');
      details.forEach((detail) => {
        violations.push({
          cluster,
          name: _.get(detail, templateMetaNameStr, '-'),
          message: _.get(detail, historyLatestMessageStr, '-'),
          timestamp: _.get(detail, historyLatestTimestampStr, '-'),
          consoleURL: clusterConsoleURL[cluster],
        });
      });
    });
    return violations;
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
      return _.get(parent, 'status');
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
    const vioArray = this.resolvePolicyViolations(parent, true);
    const tempArray = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === type) {
        if (type === roleBindingTemplatesStr) {
          const name = _.get(res, 'roleBinding.metadata.name', '-');
          tempArray.push({
            name,
            lastTransition: _.get(res, statusLastTransTimeStr, ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'roleBinding.apiVersion', ''),
            compliant: _.isEmpty(vioArray.filter(vio => _.get(vio, 'name', '') === name)) ? 'Compliant' : 'NonCompliant',
            validity: _.get(res, statusValidityValidStr) || _.get(res, statusValidityStr, ''),
            raw: res,
          });
        } else if (type === objectTemplatesStr || type === policyTemplatesStr) {
          const name = _.get(res, objMetadataNameStr, '-');
          tempArray.push({
            name,
            lastTransition: _.get(res, statusLastTransTimeStr, ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'objectDefinition.apiVersion', ''),
            kind: _.get(res, 'objectDefinition.kind', ''),
            compliant: _.isEmpty(vioArray.filter(vio => _.get(vio, 'name', '') === name)) ? 'Compliant' : 'NonCompliant',
            status: _.isEmpty(vioArray.filter(vio => _.get(vio, 'name', '') === name)) ? 'Compliant' : 'NonCompliant',
            validity: _.get(res, statusValidityValidStr) || _.get(res, statusValidityStr, ''),
            raw: res,
          });
        } else {
          const name = _.get(res, metadataNameStr, '-');
          tempArray.push({
            name,
            lastTransition: _.get(res, statusLastTransTimeStr, ''),
            complianceType: _.get(res, 'complianceType', ''),
            apiVersion: _.get(res, 'apiVersion', ''),
            compliant: _.isEmpty(vioArray.filter(vio => _.get(vio, 'name', '') === name)) ? 'Compliant' : 'NonCompliant',
            status: _.isEmpty(vioArray.filter(vio => _.get(vio, 'name', '') === name)) ? 'Compliant' : 'NonCompliant',
            validity: _.get(res, statusValidityValidStr) || _.get(res, statusValidityStr, ''),
            raw: res,
          });
        }
      }
    });
    return tempArray;
  }

  static resolvePolicyViolations(parent, displayVioOnly = false) {
    const violationArray = [];
    let details = _.get(parent, statusDetails, []);
    if (displayVioOnly) {
      details = details.filter(detail => _.get(detail, 'compliant', 'unknown') !== 'Compliant');
    }
    const cluster = _.get(parent, 'cluster', '-');
    details.forEach((detail) => {
      violationArray.push({
        name: _.get(detail, templateMetaNameStr, '-'),
        cluster,
        message: _.get(detail, historyLatestMessageStr, '-'),
        timestamp: _.get(detail, historyLatestTimestampStr, '-'),
      });
    });
    return violationArray;
  }
}
