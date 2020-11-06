/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
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
  mockComplianceListMCMResponse, mockComplianceListNoResponse,
  mockRootPoliciesListResponse, mockRootPolicyResponse, mockComplianceListDefaultResponse,
} from '../mocks/ComplianceList';
import {
  mockPlacementBindingResponse, mockPlacementRuleResponse,
  mockSinglePolicyResponse, mockSingleNoPolicyResponse,
} from '../mocks/PolicyList';
import {
  mockClusterCluster1Response, mockClusterHubResponse, mockClusterNonclusterNs,
} from '../mocks/ClusterList';

describe('Compliance Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(ApiGroup.hostUrl);

    // Compliance / Policy list
    // define the method to be intercepted
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies`)
      .reply(200, mockComplianceListMCMResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies`)
      .reply(200, mockComplianceListDefaultResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/kube-system/policies`)
      .reply(200, mockComplianceListNoResponse);

    // Single compliance / policy
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/case1-test-policy`)
      .reply(200, mockSinglePolicyResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies/compliance-xz`)
      .reply(200, mockSinglePolicyResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/kube-system/policies/case1-test-policy`)
      .reply(200, mockSingleNoPolicyResponse);

    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies/case1-test-policy`)
      .reply(200, mockRootPolicyResponse);
    APIServer.get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies`)
      .reply(200, mockRootPoliciesListResponse);

    // Placement bindings
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementbindings`)
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/placementbindings`)
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/local-cluster/placementbindings`)
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/kube-system/placementbindings`)
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/placementbindings`)
      .reply(200, mockPlacementBindingResponse);

    // Placement rules
    APIServer.persist().get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementrules`)
      .reply(200, mockPlacementRuleResponse);
    APIServer.persist().get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/cluster1/placementrules`)
      .reply(200, mockPlacementRuleResponse);
    APIServer.persist().get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/local-cluster/placementrules`)
      .reply(200, mockPlacementRuleResponse);
    APIServer.persist().get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/kube-system/placementrules`)
      .reply(200, mockPlacementRuleResponse);
    APIServer.persist().get(`/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/default/placementrules`)
      .reply(200, mockPlacementRuleResponse);

    // Single cluster
    APIServer.persist().get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/cluster1/managedclusterinfos`)
      .reply(200, mockClusterCluster1Response);
    APIServer.persist().get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/local-cluster/managedclusterinfos`)
      .reply(200, mockClusterHubResponse);
    // No cluster
    APIServer.persist().get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/policy-namespace/managedclusterinfos`)
      .reply(200, mockClusterNonclusterNs);
    APIServer.persist().get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/default/managedclusterinfos`)
      .reply(200, mockClusterNonclusterNs);
    APIServer.persist().get(`/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/kube-system/managedclusterinfos`)
      .reply(200, mockClusterNonclusterNs);

    // DELETE responses
    APIServer.persist().delete('/path/to/valid/resource')
      .reply(200, {
        metadata: {
          name: 'deleted-resource',
        },
      });
    APIServer.persist().delete('/path/to/invalid/resource')
      .reply(400, {
        code: 400,
        message: 'There was an error.',
      });
  });

  describe('Query', () => {
    test('Correctly Resolves Compliance List Query', () => new Promise((done) => {
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
              annotations
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
          expect(JSON.parse(res.text)).toMatchSnapshot();
          done();
        });
    }));

    test('Correctly Resolves Compliance List Query with specific namespace', () => new Promise((done) => {
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
          expect(JSON.parse(res.text)).toMatchSnapshot();
          done();
        });
    }));

    test('Correctly Resolves Single Compliance Query', () => new Promise((done) => {
      supertest(server)
        .post(GRAPHQL_PATH)
        .send({
          query: `
          {
            compliances(name:"case1-test-policy",namespace:"default") {
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
                    message
                    timestamp
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
    }));

    test('Correctly Resolves Single Compliance Query without namespace', () => new Promise((done) => {
      supertest(server)
        .post(GRAPHQL_PATH)
        .send({
          query: `
          {
            compliances(name:"case1-test-policy") {
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
                    message
                    timestamp
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
    }));
  });

  describe('Mutation', () => {
    test('Correctly Resolves Delete Compliance Mutation', () => new Promise((done) => {
      supertest(server)
        .post(GRAPHQL_PATH)
        .send({
          query: `
            mutation {
              deleteCompliance(selfLink: "/apis/path/to/valid/resource", resources: [{
                selfLink: "/apis/path/to/valid/resource"
              }])
            }
          `,
        })
        .end((err, res) => {
          expect(JSON.parse(res.text)).toMatchSnapshot();
          done();
        });
    }));

    test('Correctly Resolves Delete Compliance Mutation with no resources', () => new Promise((done) => {
      supertest(server)
        .post(GRAPHQL_PATH)
        .send({
          query: `
            mutation {
              deleteCompliance(selfLink: "/apis/path/to/valid/resource")
            }
          `,
        })
        .end((err, res) => {
          expect(JSON.parse(res.text)).toMatchSnapshot();
          done();
        });
    }));

    test('Error on Delete Compliance Mutation with invalid selfLink argument', () => new Promise((done) => {
      supertest(server)
        .post(GRAPHQL_PATH)
        .send({
          query: `
            mutation {
              deleteCompliance(selfLink: "/apis/path/to/invalid/resource", resources: [
                {
                selfLink: "/apis/path/to/invalid/resource"
              }])
            }
          `,
        })
        .end((err, res) => {
          expect(JSON.parse(res.text)).toMatchSnapshot();
          done();
        });
    }));

    test('Error on Delete Compliance Mutation with invalid resource selfLink', () => new Promise((done) => {
      supertest(server)
        .post(GRAPHQL_PATH)
        .send({
          query: `
            mutation {
              deleteCompliance(selfLink: "/apis/path/to/valid/resource", resources: [
                {
                selfLink: "/apis/path/to/invalid/resource"
              }])
            }
          `,
        })
        .end((err, res) => {
          expect(JSON.parse(res.text)).toMatchSnapshot();
          done();
        });
    }));
  });
});
