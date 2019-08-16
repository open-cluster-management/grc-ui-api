/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import {
  mockPolicyListResponse, mockSinglePolicyResponse, mockCreatePolicy, mockDeleteResponse,
  mockClusterListResponse, mockViolationListResponse, mockCreateResourcePost, mockCreateResourceGet,
  mockCompletedResourceView,
} from '../mocks/PolicyList';

describe('Policy Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock('http://0.0.0.0/kubernetes/apis');

    APIServer.persist()
      .post('/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews')
      .reply(200, mockCreateResourcePost);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews?fieldSelector=metadata.name=policies-policy-mcm-ibm-com-1563995392802')
      .reply(200, mockCreateResourceGet);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/policies-policy-mcm-ibm-com-1563995392802')
      .reply(200, mockCompletedResourceView);

    APIServer.get('/policy.mcm.ibm.com/v1alpha1/namespaces/mcm/policies')
      .reply(200, mockPolicyListResponse);

    APIServer.get('/policy.mcm.ibm.com/v1alpha1/namespaces/mcm/policies/policy-all')
      .reply(200, mockSinglePolicyResponse);

    APIServer.post('/policy.mcm.ibm.com/v1alpha1/namespaces/mcm/policies')
      .reply(200, mockCreatePolicy);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/mcm/clusterstatuses')
      .reply(200, mockClusterListResponse);

    APIServer.post('/policies.policy.mcm.ibm.com')
      .reply(200, mockViolationListResponse);

    APIServer.delete('/policy.mcm.ibm.com/v1alpha1/namespaces/default/policies/test-policy')
      .reply(200, mockDeleteResponse);
  });

  test('Correctly Resolves Policy List Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policies {
            enforcement
            metadata {
              name
              namespace
              selfLink
              creationTimestamp
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
  });

  test('Correctly Resolves Single Policy Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policies(name:"policy-all", clusterName:"cluster1") {
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
            violations {
              name
              cluster
              status
              message
              reason
              selector
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
            apiVersion: "policy.mcm.ibm.com/v1alpha1",
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
          clustersInPolicy(policy: "policy-role") {
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

  test('Correctly Resolves Violations List Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          violationsInPolicy(policy: "policy-role") {
            cluster
            message
            name
            reason
            selector
            status
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