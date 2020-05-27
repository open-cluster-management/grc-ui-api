/* Copyright (c) 2020 Red Hat, Inc. */

const ApiURL = {
  hostUrl: 'http://0.0.0.0/kubernetes/apis',
  clusterRegistryApiURL: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/',
  acmApiURL: 'open-cluster-management.io/v1',
  acmPoliciesRootURL: 'policies.open-cluster-management.io',
  acmPoliciesApiURL: '/apis/policies.open-cluster-management.io/v1/',
  acmAppsApiURL: '/apis/apps.open-cluster-management.io/v1/',
  // temporarily api url here, will update them later
  mcmComplianceApiURL: '/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/',
  mcmNSApiURL: '/apis/mcm.ibm.com/v1alpha1/namespaces/',
};

export default ApiURL;
