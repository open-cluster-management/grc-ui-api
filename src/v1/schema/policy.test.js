/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019, 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import ApiGroup from '../lib/ApiGroup';
import {
  mockPolicyListResponse, mockSinglePolicyResponse, mockCreatePolicy, mockDeleteResponse,
  mockClusterListResponse, mockCluster1ListResponse, mockClusterHubListResponse,
  mockDefaultListResponse, mockKubeSystemListResponse, mockViolationListResponse,
  mockNewAPISinglePolicyResponse,
} from '../mocks/PolicyList';
import { mockCluster1Response, mockClusterHubResponse, mockMCMResponse, mockDefaultResponse, mockKubeSystemResponse } from '../mocks/ClusterList';

describe('Policy Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(ApiGroup.hostUrl);

    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies`)
      .reply(200, mockPolicyListResponse);

    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies/policy-all`)
      .reply(200, mockSinglePolicyResponse);

    APIServer.post(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies`)
      .reply(200, mockCreatePolicy);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/mcm/clusterstatuses')
      .reply(200, mockClusterListResponse);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/cluster1/clusterstatuses')
      .reply(200, mockCluster1ListResponse);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/default/clusterstatuses')
      .reply(200, mockDefaultListResponse);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/kube-system/clusterstatuses')
      .reply(200, mockKubeSystemListResponse);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/clusterhub/clusterstatuses')
      .reply(200, mockClusterHubListResponse);

    APIServer.post('/policies.policies.open-cluster-management.io')
      .reply(200, mockViolationListResponse);

    APIServer.delete(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies/test-policy`)
      .reply(200, mockDeleteResponse);

    APIServer.delete('/clusterregistry.k8s.io/v1alpha1/namespaces/default/clusters')
      .reply(200, mockDefaultResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/default/clusters/cluster1')
      .reply(200, mockDefaultResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/default/clusters')
      .reply(200, mockDefaultResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/kube-system/clusters/cluster1')
      .reply(200, mockKubeSystemResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/kube-system/clusters')
      .reply(200, mockKubeSystemResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/mcm/clusters/cluster1')
      .reply(200, mockMCMResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/mcm/clusters')
      .reply(200, mockMCMResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/clusterhub/clusters/cluster1')
      .reply(200, mockDefaultResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/clusterhub/clusters')
      .reply(200, mockDefaultResponse);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/cluster1/clusters')
      .reply(200, mockDefaultResponse);

    // Single cluster
    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/cluster1/clusters/cluster1')
      .reply(200, mockCluster1Response);

    APIServer.get('/clusterregistry.k8s.io/v1alpha1/namespaces/clusterhub/clusters/clusterhub')
      .reply(200, mockClusterHubResponse);

    APIServer.get('/policies.open-cluster-management.io/v1/namespaces/calamari/policies/default.case1-test-policy')
      .reply(200, mockNewAPISinglePolicyResponse);
  });

  test('Correctly Resolves All Policies per Cluster List Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policiesInCluster(cluster: "cluster1") {
            cluster
            metadata {
              name
              namespace
              selfLink
              creationTimestamp
              annotations
              resourceVersion
              uid
            }
            status
            enforcement
            detail {
              exclude_namespace
              include_namespace
            }
            raw
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves All Policies per Application List Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
        policiesInApplication(
          violatedPolicies:
          [
            {
            name:"policies-policy-mcm-ibm-com-1563995392802",
            namespace:"default",
            clusters:[{name:"cluster1"}]},
            {name:"policy-namespace",namespace:"default",clusters:[{name:"cluster1"}]}
          ]) {
            cluster
            metadata {
              name
              namespace
              selfLink
              creationTimestamp
              annotations
              resourceVersion
              uid
            }
            status
            enforcement
            detail {
              exclude_namespace
              include_namespace
            }
            raw
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Single Policy Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policies(name:"default.case1-test-policy", clusterName:"calamari") {
            cluster
            message
            metadata {
              name
              namespace
              selfLink
              creationTimestamp
              annotations
              resourceVersion
              uid
            }
            status
            enforcement
            detail {
              exclude_namespace
              include_namespace
            }
            raw
            roleTemplates {
              apiVersion
              complianceType
              compliant
              status
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
              status
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
              status
              lastTransition
              name
              kind
              validity
              raw
            }
            policyTemplates {
              name
              kind
              lastTransition
              complianceType
              apiVersion
              status
              raw
            }
            violations {
              name
              cluster
              message
              timestamp
            }
            rules {
              complianceType
              templateType
              ruleUID
              verbs
              apiGroups
              resources
            }
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Create Policy Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createPolicy(resources:[{
            apiVersion: "policies.open-cluster-management.io/v1",
            kind: "Policy",
            metadata: {
              name: "test-policy",
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
                    name: "test-role",
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
          }]),
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Cluster List Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          clustersInPolicy(policy: "policy-namespace", hubNamespace: "mcm") {
            name
            metadata {
              labels
              name
              namespace
              annotations
              uid
              selfLink
            }
            kind
            apiVersion
            spec
            status
            total
            violated
            policy
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Delete Policy Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          deletePolicy(name:"test-policy",namespace:"default")
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});
