/* Copyright (c) 2020 Red Hat, Inc. */

const ApiURL = {
  hostUrl: 'http://0.0.0.0/kubernetes/apis',
  clusterRegistryApiURL: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/',
  ocmPoliciesApiURL: '/apis/policies.open-cluster-management.io/v1/namespaces/',
  ocmAppsApiURL: '/apis/apps.open-cluster-management.io/v1/namespaces/',
  // temporarily api url here, will update them later
  mcmV1ApiURL: '/apis/policy.mcm.ibm.com/v1alpha1/',
  mcmPolicyApiURL: '/apis/policy.mcm.ibm.com/v1alpha1/namespaces/',
  mcmComplianceApiURL: '/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/',
  mcmNSApiURL: '/apis/mcm.ibm.com/v1alpha1/namespaces/',
  mcmHelmReposApiURL: '/apis/mcm.ibm.com/v1alpha1/helmrepos',
};

export default ApiURL;
