/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import { gql } from 'apollo-server-express';
import ComplianceModel from '../models/compliance';

export const typeDef = gql`
type Policy implements K8sObject {
  detail: PolicyDetail
  # Possible values are: enforce, inform
  enforcement: String
  metadata: Metadata
  rules: [PolicyRules]
  # Possible values are: compliant, notcompliant, invalid
  status: JSON
  roleTemplates: [PolicyTemplate]
  roleBindingTemplates: [PolicyTemplate]
  objectTemplates: [PolicyTemplate]
  policyTemplates: [PolicyTemplate]
  violations: [Violations]
  raw: JSON
  message: String
  cluster: String
}

type PolicyInfo implements K8sObject {
  cluster: String
  apiVersion: String
  kind: String
  metadata: Metadata
  spec: JSON
  status: JSON
  policiesStatusDetails: JSON
}

type ClusterInfo implements K8sObject {
  name: String
  total: String
  violated: String
  policyListStatuses: JSON
  metadata: Metadata
  status: JSON
}

type PolicyDetail {
  exclude_namespace: [String]
  include_namespace: [String]
}

type PolicyTemplate {
  apiVersion: String
  complianceType: String
  compliant: String
  status: String
  lastTransition: String
  name: String
  kind: String
  validity: String
  raw: JSON
}

type PolicyRules {
  apiGroups: [String]
  complianceType: String
  resources: [String]
  ruleUID: String
  templateType: String
  verbs: [String]
}

type Violations {
  cluster: String
  message: String
  name: String
  apiVersion: String
  kind: String
  timestamp: String
  consoleURL: String
  policyName: String
  policyNamespace: String
}

type Status {
  templateName: String
  cluster: String
  status: String
  apiVersion: String
  kind: String
  message: String
  timestamp: String
  consoleURL: String
  policyName: String
  policyNamespace: String
}

type History {
  message: String
  timestamp: String
}
`;

export const resolver = {
  Query: {
    policies: (
      root, args, { complianceModel },
    ) => complianceModel.getPolicies(args.name, args.clusterName),
    policiesInCluster: (
      root, args, { complianceModel },
    ) => complianceModel.getAllPoliciesInCluster(args.cluster),
    clustersInPolicy: (
      root, args, { complianceModel },
    ) => complianceModel.getAllClustersInPolicy(args.policy, args.hubNamespace),
    policiesInApplication: (
      root, args, { complianceModel },
    ) => complianceModel.getAllPoliciesInApplication(args.violatedPolicies),
    statusInPolicy: (
      root, args, { complianceModel },
    ) => complianceModel.getAllStatusInPolicy(args.policyName, args.hubNamespace),
    placementRules: (
      root, args, { complianceModel },
    ) => complianceModel.getPlacementRules(args.prs),
    placementBindings: (
      root, args, { complianceModel },
    ) => complianceModel.getPlacementBindings(args.pbs),
    statusHistory: (
      root, args, { complianceModel },
    ) => complianceModel.getStatusHistory(args.policyName, args.hubNamespace, args.cluster, args.template),
  },
  Policy: {
    detail: (parent) => ComplianceModel.resolvePolicyDetails(parent),
    enforcement: (parent) => ComplianceModel.resolvePolicyEnforcement(parent),
    roleTemplates: (parent) => ComplianceModel.resolvePolicyTemplates(parent, 'role-templates'),
    roleBindingTemplates: (parent) => ComplianceModel.resolvePolicyTemplates(parent, 'roleBinding-templates'),
    objectTemplates: (parent) => ComplianceModel.resolvePolicyTemplates(parent, 'object-templates'),
    policyTemplates: (parent) => ComplianceModel.resolvePolicyTemplates(parent, 'policy-templates'),
    rules: (parent) => ComplianceModel.resolvePolicyRules(parent),
    status: (parent) => ComplianceModel.resolvePolicyStatus(parent),
    violations: (parent) => ComplianceModel.resolvePolicyViolations(parent),
    message: (parent) => ComplianceModel.resolvePolicyMessage(parent),
  },
  Mutation: {
    createPolicy: (
      root, args, { complianceModel },
    ) => complianceModel.createPolicy(args.resources),
    deletePolicy: (
      root, args, { complianceModel },
    ) => complianceModel.deletePolicy(args),
  },
};
