/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
type Query {
  namespaces: [Namespace]
  discoveries: Discoveries

  # Policies and Compliances
  policies(name: String, clusterName: String): [Policy]
  policiesInCluster(cluster: String): [PolicyInfo]
  clustersInPolicy(policy: String, hubNamespace: String): [ClusterInfo]
  policyStatus(policyName: String!, hubNamespace: String!): [Status]
  placementRules(prs: JSON): [PlacementPolicy]
  placementBindings(pbs: JSON): [PlacementBinding]
  compliances(name: String, namespace: String): [Compliance]
  placementPolicies (selector: JSON): [PlacementPolicy]
  statusHistory(policyName: String!, hubNamespace: String!, cluster: String!, template: String!): [History]

  # Get any kubernetes resource from any managed cluster.
  getResource(kind: String, name: String, namespace: String, cluster: String, selfLink: String, updateInterval: Int, deleteAfterUse: Boolean): JSON
  getUserAccessCredentials: JSON

  # Get Ansible Tower Job Templates
  ansibleJobTemplates(host: String!, token: String!): [AnsibleJobTemplate]
  # Get Ansible Credentials
  ansibleCredentials: [AnsibleCredential]
  # Copy and return secret name for given Ansible credential
  copyAnsibleSecret(name: String!, namespace: String!, targetNamespace: String!): AnsibleSecretName
}

type Mutation {
  # Creates a Kubernetes Policy
  createPolicy(resources: [JSON]): JSON

  # Save a user query
  saveQuery(resource: JSON): JSON

  # Delete a user query
  deleteQuery(resource: JSON): JSON

  # Delete Kubernetes Policy
  deletePolicy(namespace: String, name: String!): String

  # Creates Kubernetes Compliance
  createCompliance(resources: [JSON]): JSON

  # Creates Kubernetes Resources
  createResources(resources: [JSON]): JSON

  # Creates Kubernetes Resources that do not exist and updates those that do exist
  createAndUpdateResources(toCreate: [JSON], toUpdate: [JSON]): JSON

  # Update Kubernetes resources
  updateResource(namespace: String!, name: String!, body: JSON, selfLink: String!, resourcePath: String): JSON

  # Delete Kubernetes Compliance
  deleteCompliance(selfLink: String!, resources: JSON): String
}

# Common fields for all Kubernetes objects
interface K8sObject {
  metadata: Metadata
}

# Common fields in all Kubernetes metadata objects.
type Metadata {
  annotations: JSON
  creationTimestamp: String
  labels: JSON
  name: String
  namespace: String
  resourceVersion: String
  selfLink: String
  status: String
  uid: String
}
`;

export const resolver = {
  K8sObject: {
    __resolveType() {
      return null;
    },
  },
};
