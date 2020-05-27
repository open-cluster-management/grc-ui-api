/* Copyright (c) 2020 Red Hat, Inc. */
// acm api endpoint and version
const ApiEP = {
  hostUrl: 'http://0.0.0.0/kubernetes/apis',
  policiesEP: 'policies.open-cluster-management.io',
  appsEP: 'apps.open-cluster-management.io',
  V: 'v1',
  // temporary endpoint and version, will update them later
  clusterRegistryEP: 'clusterregistry.k8s.io',
  mcmEP: 'mcm.ibm.com',
  complianceEP: 'compliance.mcm.ibm.com',
  mcmV: 'v1alpha1',
};

export default ApiEP;
