/* Copyright (c) 2020 Red Hat, Inc. */
// acm api group and version
const ApiGroup = {
  hostUrl: 'http://0.0.0.0/kubernetes/apis',
  policiesGroup: 'policies.open-cluster-management.io',
  appsGroup: 'apps.open-cluster-management.io',
  version: 'v1',
  // temporary group and version, will update them later
  // to-do update cluster api group to new api
  clusterRegistryGroup: 'clusterregistry.k8s.io',
  mcmGroup: 'mcm.ibm.com',
  mcmVersion: 'v1alpha1',
};

export default ApiGroup;
