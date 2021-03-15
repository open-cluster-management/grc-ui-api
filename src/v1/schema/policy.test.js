/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019, 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import ApiGroup from '../lib/ApiGroup';
import {
  mockPolicyListResponse, mockPolicyListResponseLocalCluster, mockCreatePolicy, mockDeletePolicyResponse,
  mockNewAPISinglePolicyResponse, mockStatusHistoryResponse, mockStatusHistoryResponseNoHistory,
  mockStatusHistoryResponseLong, mockSinglePolicyResponse, mockSinglePolicyCluster1Response,
  mockSinglePolicyHubResponse,
} from '../mocks/PolicyList';
import {
  mockClusterCluster1Response, mockClusterHubResponse, mockClusterNonclusterNs,
} from '../mocks/ClusterList';
import {
  mockPlacementRuleListResponse, mockPlacementRuleListNoResponse,
  mockPlacementBindingListResponse, mockPlacementBindingListNoResponse,
} from '../mocks/PlacementList';

describe('Policy Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(ApiGroup.hostUrl);
    // GET policy list from cluster ns
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/`)
      .reply(200, mockPolicyListResponse)
      .persist();
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/local-cluster/policies/`)
      .reply(200, mockPolicyListResponseLocalCluster);
    // GET policy
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies/test-policy`)
      .reply(200, mockSinglePolicyResponse);
    // POST create policy
    APIServer.post(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies`)
      .reply(200, mockCreatePolicy);
    // DELETE policy
    APIServer.delete(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies/test-policy`)
      .reply(200, mockDeletePolicyResponse);

    // GET single policy from clsuter ns
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/default.test-policy`)
      .reply(200, mockSinglePolicyCluster1Response);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/local-cluster/policies/default.test-policy`)
      .reply(200, mockSinglePolicyHubResponse);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/default.case1-test-policy`)
      .reply(200, mockNewAPISinglePolicyResponse)
      .persist();
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/default.policy-pod`)
      .reply(200, mockStatusHistoryResponse);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/default.policy-pod-1`)
      .reply(200, mockStatusHistoryResponseNoHistory);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/default.policy-pod-2`)
      .reply(200, mockStatusHistoryResponseLong);

    // GET managedclusterinfos per namespace
    APIServer.get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/cluster1/managedclusterinfos`)
      .reply(200, mockClusterCluster1Response);
    APIServer.get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/local-cluster/managedclusterinfos`)
      .reply(200, mockClusterHubResponse);
    APIServer.get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/default/managedclusterinfos`)
      .reply(200, mockClusterNonclusterNs);
    APIServer.get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/kube-system/managedclusterinfos`)
      .reply(200, mockClusterNonclusterNs);
    APIServer.get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/policy-namespace/managedclusterinfos`)
      .reply(200, mockClusterNonclusterNs);

    // GET placementrules per namespace
    APIServer.get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementrules`)
      .reply(200, mockPlacementRuleListResponse);
    APIServer.get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/default/placementrules`)
      .reply(200, mockPlacementRuleListNoResponse);
    APIServer.get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/cluster1/placementrules`)
      .reply(200, mockPlacementRuleListNoResponse);
    APIServer.get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/local-cluster/placementrules`)
      .reply(200, mockPlacementRuleListNoResponse);
    APIServer.get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/kube-system/placementrules`)
      .reply(200, mockPlacementRuleListNoResponse);

    // GET placement bindings per namespace
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementbindings`)
      .reply(200, mockPlacementBindingListResponse);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/placementbindings`)
      .reply(200, mockPlacementBindingListNoResponse);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/placementbindings`)
      .reply(200, mockPlacementBindingListNoResponse);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/local-cluster/placementbindings`)
      .reply(200, mockPlacementBindingListNoResponse);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/kube-system/placementbindings`)
      .reply(200, mockPlacementBindingListNoResponse);
  });

  test('Correctly Resolves All Policies per Cluster List Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policiesInCluster(cluster: "cluster1") {
            cluster
            apiVersion
            kind
            metadata {
              name
              namespace
              selfLink
              creationTimestamp
              annotations
              labels
              resourceVersion
              uid
            }
            spec
            status
            policiesStatusDetails
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Single Policy Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policies(name:"default.case1-test-policy", clusterName:"cluster1") {
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
            remediation
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
  }));

  test('Correctly Resolves Cluster List Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          clustersInPolicy(policy: "test-policy", hubNamespace: "default") {
            name
            total
            violated
            policyListStatuses
            metadata {
              labels
              name
              namespace
              annotations
              uid
              selfLink
            }
            status
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Policy Status Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policyStatus(policyName: "test-policy", hubNamespace: "default") {
            templateName
            cluster
            clusterNamespace
            status
            apiVersion
            kind
            message
            timestamp
            consoleURL
            policyName
            policyNamespace
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Placement Rule Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          placementRules(prs: [ "placement-test-policy" ]) {
            metadata {
              name
              resourceVersion
              selfLink
            }
          }
        }
        `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Placement Binding Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          placementBindings(pbs: [ "binding-test-policy" ]) {
            metadata {
              name
              resourceVersion
              selfLink
            }
          }
        }
        `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Create Policy Mutation', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createPolicy(resources:[{
            apiVersion: "policy.open-cluster-management.io/v1",
            kind: "Policy",
            metadata: {
              name: "test-policy",
              namespace: "default",
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
  }));

  test('Correctly Resolves Delete Policy Mutation', () => new Promise((done) => {
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
  }));

  test('Correctly Resolves Violation History Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          statusHistory(policyName: "policy-pod", hubNamespace: "default", cluster: "cluster1", template: "policy-pod-sample-nginx-pod") {
            message
            timestamp
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Violation History Query (no data)', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          statusHistory(policyName: "policy-pod-1", hubNamespace: "default", cluster: "cluster1", template: "policy-pod-sample-nginx-pod") {
            message
            timestamp
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Violation History Query (longer history response)', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          statusHistory(policyName: "policy-pod-2", hubNamespace: "default", cluster: "cluster1", template: "policy-pod-sample-nginx-pod") {
            message
            timestamp
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
});
