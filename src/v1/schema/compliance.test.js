/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import { mockComplianceListMCMResponse, mockComplianceListDefaultResponse, mockComplianceListKubeSystemResponse, mockCreateCompliance } from '../mocks/ComplianceList';
import { mockPlacementBindingResponse, mockPlacementPolicyResponse, mockSinglePolicyResponse, mockSingleNoPolicyResponse } from '../mocks/PolicyList';
import { mockCluster1Response, mockClusterHubResponse, mockMCMResponse, mockDefaultResponse, mockKubeSystemResponse } from '../mocks/ClusterList';

const log4js = require('log4js');

const logger = log4js.getLogger('server');

describe('Compliance Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock('http://0.0.0.0/kubernetes/apis');

    // Compliance / Policy list
    // define the method to be intercepted
    APIServer.persist().get('/policy.mcm.ibm.com/v1alpha1/namespaces/mcm/policies')
      .reply(200, mockComplianceListMCMResponse);
    APIServer.persist().get('/policy.mcm.ibm.com/v1alpha1/namespaces/default/policies')
      .reply(200, mockComplianceListDefaultResponse);
    APIServer.persist().get('/policy.mcm.ibm.com/v1alpha1/namespaces/kube-system/policies')
      .reply(200, mockComplianceListKubeSystemResponse);

    // Single compliance / policy
    APIServer.persist().get('/compliance.mcm.ibm.com/v1alpha1/namespaces/mcm/compliances/compliance-xz')
      .reply(200, mockCreateCompliance);
    APIServer.persist().get('/policy.mcm.ibm.com/v1alpha1/namespaces/mcm/policies/compliance-xz')
      .reply(200, mockSinglePolicyResponse);
    APIServer.persist().get('/policy.mcm.ibm.com/v1alpha1/namespaces/default/policies/compliance-xz')
      .reply(200, mockSinglePolicyResponse);
    APIServer.persist().get('/policy.mcm.ibm.com/v1alpha1/namespaces/kube-system/policies/compliance-xz')
      .reply(200, mockSingleNoPolicyResponse);

    // Placement bindings
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/mcm/placementbindings')
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/cluster1/placementbindings')
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/clusterhub/placementbindings')
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/kube-system/placementbindings')
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/default/placementbindings')
      .reply(200, mockPlacementBindingResponse);

    // Placement policies
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/mcm/placementpolicies')
      .reply(200, mockPlacementPolicyResponse);
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/cluster1/placementpolicies')
      .reply(200, mockPlacementPolicyResponse);
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/clusterhub/placementpolicies')
      .reply(200, mockPlacementPolicyResponse);
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/kube-system/placementpolicies')
      .reply(200, mockPlacementPolicyResponse);
    APIServer.persist().get('/mcm.ibm.com/v1alpha1/namespaces/default/placementpolicies')
      .reply(200, mockPlacementPolicyResponse);

    // Create compliance
    APIServer.post('/compliance.mcm.ibm.com/v1alpha1/namespaces/mcm/compliances')
      .reply(200, mockCreateCompliance);

    // Single cluster
    APIServer.persist().get('/clusterregistry.k8s.io/v1alpha1/namespaces/cluster1/clusters/')
      .reply(200, mockCluster1Response);
    APIServer.persist().get('/clusterregistry.k8s.io/v1alpha1/namespaces/clusterhub/clusters/')
      .reply(200, mockClusterHubResponse);
    // No cluster
    APIServer.persist().get('/clusterregistry.k8s.io/v1alpha1/namespaces/mcm/clusters/')
      .reply(200, mockMCMResponse);
    APIServer.persist().get('/clusterregistry.k8s.io/v1alpha1/namespaces/default/clusters/')
      .reply(200, mockDefaultResponse);
    APIServer.persist().get('/clusterregistry.k8s.io/v1alpha1/namespaces/kube-system/clusters/')
      .reply(200, mockKubeSystemResponse);
  });

  test('Correctly Resolves Compliance List Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          compliances {
            metadata {
              name
              namespace
              selfLink
              annotations
              resourceVersion
            }
            name
            namespace
            raw
            remediation
            policyCompliant
            clusterCompliant
            placementPolicies {
              metadata {
                name
                selfLink
              }
            }
            placementBindings {
              metadata {
                name
                selfLink
              }
            }
          }
        }
      `,
      })
      .end((err, res) => {
        logger.info(res.text);
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Compliance List Query with specific namespace', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          compliances(name:null,namespace:"default") {
            metadata {
              name
              namespace
              selfLink
              annotations
              resourceVersion
            }
            name
            namespace
            raw
            remediation
            policyCompliant
            clusterCompliant
            placementPolicies {
              metadata {
                name
                selfLink
              }
            }
            placementBindings {
              metadata {
                name
                selfLink
              }
            }
          }
        }
      `,
      })
      .end((err, res) => {
        logger.info(res.text);
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Single Compliance Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          compliances(name:"compliance-xz",namespace:"mcm") {
            raw
            metadata {
              creationTimestamp
              name
              namespace
              resourceVersion
              selfLink
              uid
            }
            placementBindings {
              metadata {
                name
                namespace
                creationTimestamp
                selfLink
              }
              placementRef {
                name
                kind
              }
              subjects {
                name
                kind
              }
            }
            placementPolicies {
              metadata {
                annotations
                name
                namespace
                creationTimestamp
                selfLink
              }
              clusterLabels
              clusterReplicas
              resourceSelector
              status
              raw
            }
            complianceStatus {
              clusterNamespace
              localCompliantStatus
              localValidStatus
            }
            compliancePolicy {
              name
              status
              complianceName
              complianceNamespace
              complianceSelfLink
              roleTemplates {
                apiVersion
                complianceType
                compliant
                lastTransition
                name
                kind
                validity
                raw
              }
              roleBindingTemplates {
                apiVersion
                complianceType
                compliant
                lastTransition
                name
                kind
                validity
                raw
              }
              objectTemplates {
                apiVersion
                complianceType
                compliant
                lastTransition
                name
                kind
                validity
                raw
              }
              detail
              raw
            }
            compliancePolicies {
              name
              clusterCompliant
              clusterNotCompliant
              complianceName
              complianceNamespace
              policies {
                name
                cluster
                compliant
                complianceName
                complianceNamespace
                valid
                enforcement
                status
                raw
                metadata {
                  annotations
                  creationTimestamp
                  name
                  resourceVersion
                  selfLink
                  uid
                }
                roleTemplates {
                  name
                  lastTransition
                  complianceType
                  apiVersion
                  compliant
                  raw
                }
                roleBindingTemplates {
                  name
                  lastTransition
                  complianceType
                  apiVersion
                  compliant
                  raw
                }
                objectTemplates {
                  name
                  lastTransition
                  complianceType
                  apiVersion
                  compliant
                  kind
                  raw
                }
                rules {
                  complianceType
                  templateType
                  ruleUID
                  apiGroups
                  verbs
                  resources
                }
                violations {
                  name
                  cluster
                  status
                  message
                  reason
                  selector
                }
              }
            }
            policyCompliant
            clusterCompliant
          }
        }
      `,
      })
      .end((err, res) => {
        logger.info(res.text);
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Single Compliance Query without namespace', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          compliances(name:"compliance-xz") {
            raw
            metadata {
              creationTimestamp
              name
              namespace
              resourceVersion
              selfLink
              uid
            }
            placementBindings {
              metadata {
                name
                namespace
                creationTimestamp
                selfLink
              }
              placementRef {
                name
                kind
              }
              subjects {
                name
                kind
              }
            }
            placementPolicies {
              metadata {
                annotations
                name
                namespace
                creationTimestamp
                selfLink
              }
              clusterLabels
              clusterReplicas
              resourceSelector
              status
              raw
            }
            complianceStatus {
              clusterNamespace
              localCompliantStatus
              localValidStatus
            }
            compliancePolicy {
              name
              status
              complianceName
              complianceNamespace
              complianceSelfLink
              roleTemplates {
                apiVersion
                complianceType
                compliant
                lastTransition
                name
                kind
                validity
                raw
              }
              roleBindingTemplates {
                apiVersion
                complianceType
                compliant
                lastTransition
                name
                kind
                validity
                raw
              }
              objectTemplates {
                apiVersion
                complianceType
                compliant
                lastTransition
                name
                kind
                validity
                raw
              }
              detail
              raw
            }
            compliancePolicies {
              name
              clusterCompliant
              clusterNotCompliant
              complianceName
              complianceNamespace
              policies {
                name
                cluster
                compliant
                complianceName
                complianceNamespace
                valid
                enforcement
                status
                raw
                metadata {
                  annotations
                  creationTimestamp
                  name
                  resourceVersion
                  selfLink
                  uid
                }
                roleTemplates {
                  name
                  lastTransition
                  complianceType
                  apiVersion
                  compliant
                  raw
                }
                roleBindingTemplates {
                  name
                  lastTransition
                  complianceType
                  apiVersion
                  compliant
                  raw
                }
                objectTemplates {
                  name
                  lastTransition
                  complianceType
                  apiVersion
                  compliant
                  kind
                  raw
                }
                rules {
                  complianceType
                  templateType
                  ruleUID
                  apiGroups
                  verbs
                  resources
                }
                violations {
                  name
                  cluster
                  status
                  message
                  reason
                  selector
                }
              }
            }
            policyCompliant
            clusterCompliant
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Create Compliance Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createCompliance(resources:[{
            apiVersion: "compliance.mcm.ibm.com/v1alpha1",
            kind: "Compliance",
            metadata: {
              name: "test-compliance",
              namespace: "mcm",
              description: "Instance descriptor for compliance resource",
            },
            spec: {
              runtimeRules: [
                {
                  apiVersion: "policy.mcm.ibm.com/v1alpha1",
                  kind: "Policy",
                  metadata: {
                    name: "test-policy-1",
                    description: "Instance descriptor for policy resource",
                  },
                  spec: {
                    remediationAction: "inform",
                    namespaces: {
                      include: [
                        "default",
                      ],
                      exclude: [
                        "kube*",
                      ],
                    },
                    roleTemplates: [
                      {
                        kind: "RoleTemplate",
                        apiVersion: "roletemplate.mcm.ibm.com/v1alpha1",
                        complianceType: "musthave",
                        metadata: {
                          namespace: "",
                          name: "role-xz-1",
                        },
                        selector: {
                          matchLabels: {
                            cloud: "IBM",
                          },
                        },
                        rules: [
                          {
                            complianceType: "musthave",
                            PolicyRule: {
                              apiGroups: [
                                "extensions",
                                "apps",
                              ],
                              resources: [
                                "deployments",
                              ],
                              verbs: [
                                "get",
                                "list",
                                "watch",
                                "create",
                                "delete",
                                "patch",
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  apiVersion: "policy.mcm.ibm.com/v1alpha1",
                  kind: "Policy",
                  metadata: {
                    name: "test-policy-2",
                    description: "Instance descriptor for policy resource",
                  },
                  spec: {
                    remediationAction: "enforce",
                    namespaces: {
                      include: [
                        "default",
                      ],
                      exclude: [
                        "kube*",
                      ],
                    },
                    roleTemplates: [
                      {
                        kind: "RoleTemplate",
                        apiVersion: "roletemplate.mcm.ibm.com/v1alpha1",
                        complianceType: "musthave",
                        metadata: {
                          namespace: "",
                          name: "role-xz-2",
                        },
                        selector: {
                          matchLabels: {
                            cloud: "IBM",
                          },
                        },
                        rules: [
                          {
                            complianceType: "musthave",
                            PolicyRule: {
                              apiGroups: [
                                "extensions",
                                "apps",
                              ],
                              resources: [
                                "deployments",
                              ],
                              verbs: [
                                "get",
                                "list",
                                "watch",
                                "delete",
                              ],
                            },
                          },
                          {
                            complianceType: "mustnothave",
                            PolicyRule: {
                              apiGroups: [
                                "core",
                              ],
                              resources: [
                                "pods",
                              ],
                              verbs: [
                                "create",
                                "update",
                                "patch",
                              ],
                            },
                          },
                          {
                            PolicyRule: {
                              apiGroups: [
                                "core",
                              ],
                              resources: [
                                "secrets",
                              ],
                              verbs: [
                                "get",
                                "watch",
                                "list",
                                "create",
                                "delete",
                                "update",
                                "patch",
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          }])
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });


  //
  // test('Correctly Resolves Delete Compliance Mutation', (done) => {
  //   supertest(server)
  //     .post(GRAPHQL_PATH)
  //     .send({
  //       query: `
  //       mutation {
  //         deleteCompliance(name:"compliance-xz",namespace:"mcm", resources:[])
  //       }
  //     `,
  //     })
  //     .end((err, res) => {
  //       expect(JSON.parse(res.text)).toMatchSnapshot();
  //       done();
  //     });
  // });
});
