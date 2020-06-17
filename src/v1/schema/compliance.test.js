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
  mockComplianceListMCMResponse, mockComplianceListDefaultResponse,
  mockComplianceListKubeSystemResponse, mockRootPoliciesListResponse,
  mockRootPolicyResponse,
} from '../mocks/ComplianceList';
import {
  mockPlacementBindingResponse, mockPlacementRuleResponse,
  mockSinglePolicyResponse, mockSingleNoPolicyResponse,
} from '../mocks/PolicyList';
import {
  mockCluster1Response, mockClusterHubResponse, mockMCMResponse,
  mockDefaultResponse, mockKubeSystemResponse,
} from '../mocks/ClusterList';

describe('Compliance Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(ApiGroup.hostUrl);

    // Compliance / Policy list
    // define the method to be intercepted
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/mcm/policies')
      .reply(200, mockComplianceListMCMResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/default/policies')
      .reply(200, mockComplianceListDefaultResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/kube-system/policies')
      .reply(200, mockComplianceListKubeSystemResponse);

    // Single compliance / policy
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/mcm/policies/case1-test-policy')
      .reply(200, mockSinglePolicyResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/default/policies/compliance-xz')
      .reply(200, mockSinglePolicyResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/kube-system/policies/case1-test-policy')
      .reply(200, mockSingleNoPolicyResponse);

    APIServer.get('/policy.open-cluster-management.io/v1/namespaces/default/policies/case1-test-policy')
      .reply(200, mockRootPolicyResponse);
    APIServer.get('/policy.open-cluster-management.io/v1/namespaces/default/policies')
      .reply(200, mockRootPoliciesListResponse);
    // Placement bindings
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/mcm/placementbindings')
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/cluster1/placementbindings')
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/clusterhub/placementbindings')
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/kube-system/placementbindings')
      .reply(200, mockPlacementBindingResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/default/placementbindings')
      .reply(200, mockPlacementBindingResponse);

    // Placement rules
    APIServer.persist().get('/apps.open-cluster-management.io/v1/namespaces/mcm/placementrules')
      .reply(200, mockPlacementRuleResponse);
    APIServer.persist().get('/apps.open-cluster-management.io/v1/namespaces/cluster1/placementrules')
      .reply(200, mockPlacementRuleResponse);
    APIServer.persist().get('/apps.open-cluster-management.io/v1/namespaces/clusterhub/placementrules')
      .reply(200, mockPlacementRuleResponse);
    APIServer.persist().get('/apps.open-cluster-management.io/v1/namespaces/kube-system/placementrules')
      .reply(200, mockPlacementRuleResponse);
    APIServer.persist().get('/apps.open-cluster-management.io/v1/namespaces/default/placementrules')
      .reply(200, mockPlacementRuleResponse);

    // Single cluster
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/cluster1/managedclusterinfos')
      .reply(200, mockCluster1Response);
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/clusterhub/managedclusterinfos')
      .reply(200, mockClusterHubResponse);
    // No cluster
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/mcm/managedclusterinfos')
      .reply(200, mockMCMResponse);
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/default/managedclusterinfos')
      .reply(200, mockDefaultResponse);
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/kube-system/managedclusterinfos')
      .reply(200, mockKubeSystemResponse);
  });

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
