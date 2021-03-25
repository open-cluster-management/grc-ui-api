/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
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
import {
  kubeGetMock, mockAPIResourceList,
  mockCreateResourcesResponse, mockUpdateResourcesResponse,
  mockGetResourceLocallyResponse, mockGetResourceResponse,
} from '../mocks/GenericResources';
import ApiGroup from '../lib/ApiGroup';

describe('Generic Resources Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock('http://0.0.0.0/kubernetes');

    // define the method to be intercepted
    APIServer.persist().get('/')
      .reply(200, kubeGetMock);
    APIServer.persist().get(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}`)
      .reply(200, mockAPIResourceList);
    APIServer.persist().get(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/test-policy`)
      .reply(200, mockGetResourceResponse);
    APIServer.persist().post(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies`)
      .reply(200, mockCreateResourcesResponse);
    APIServer.persist().put(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/test-policy`)
      .reply(200, mockUpdateResourcesResponse);
    APIServer.persist().get('/api/v1/namespaces/open-cluster-management/pods/grc-f2e12-grcui-6b756dfc76-4fk7c')
      .reply(200, mockGetResourceLocallyResponse);

    // PATCH managedclusterinfos
    APIServer.patch(`/apis/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/cluster1/managedclusterinfos/cluster1`)
      .reply(200, {
        cloud: 'IBM',
        datacenter: 'toronto',
        environment: 'Dev',
      });
  });

  test('Correctly Resolves Create Resources Mutation', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createResources(
            resources: [
              {
                apiVersion: "policy.open-cluster-management.io/v1",
                kind: "Policy",
                metadata: {
                  name: "test-policy",
                  namespace: "policy-namespace",
                  annotations: {
                  }
                },
                spec: {
                  complianceType: "musthave",
                  remediationAction: "inform",
                  namespaces: {
                    exclude: [
                      "kube-*"
                    ],
                    include: [
                      "default"
                    ]
                  },
                },
              }
            ]
          )
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Create and Update Resources Mutation', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createAndUpdateResources(
            toCreate: [{
              apiVersion: "policy.open-cluster-management.io/v1", 
              kind: "Policy", 
              metadata: {
                name: "test-policy-cau",
                finalizers: [
                  "propagator.finalizer.mcm.ibm.com"
                ],
                generation: 7,
                namespace: "policy-namespace",
                resourceVersion: "1234567"
              },
            }],
            toUpdate: [{
              apiVersion: "policy.open-cluster-management.io/v1", 
              kind: "Policy", 
              metadata: {
                name: "test-policy",
                finalizers: [
                  "propagator.finalizer.mcm.ibm.com",
                  "new.finalizer.test.com"
                ],
                generation: 7,
                namespace: "policy-namespace",
                resourceVersion: "1234567",
                selfLink: "/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/test-policy"
              },
            }],
          )
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Update Resource Mutation', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          updateResource(
            name: "test-policy", 
            namespace: "policy-namespace", 
            selfLink: "/apis/policy.open-cluster-management.io/v1/namespaces/policy-namespace/policies/test-policy",
            body: {
              apiVersion: "policy.open-cluster-management.io/v1", 
              kind: "Policy", 
              metadata: {
                name: "test-policy",
                finalizers: [
                  "propagator.finalizer.mcm.ibm.com"
                ],
                generation: 7,
                namespace: "policy-namespace",
                resourceVersion: "1234567"
              },
            }
          )
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
});
