/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import {
  kubeGetMock, mockAPIResourceList,
  mockCreateResourcesResponse, mockUpdateResourcesResponse,
} from '../mocks/GenericResources';
import ApiGroup from '../lib/ApiGroup';

describe('Generic Resources Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock('http://0.0.0.0/kubernetes');

    // define the method to be intercepted
    APIServer.get('/').reply(200, kubeGetMock);
    APIServer.get(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}`).reply(200, mockAPIResourceList);
    APIServer.post(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies`)
      .reply(200, mockCreateResourcesResponse);
    APIServer.put(`/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/mcm/compliances/test-policy`)
      .reply(200, mockUpdateResourcesResponse);
  });

  test('Correctly Resolves Create Resources Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createResources(
            resources: [
              {
                apiVersion: "policies.open-cluster-management.io/v1",
                kind: "Policy",
                metadata: {
                  name: "test-policy",
                  namespace: "mcm",
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
  });

  test('Correctly Resolves Update Resource Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          updateResource(
            name: "test-policy", 
            namespace: "mcm", 
            resourceType: "HCMCompliance", 
            body: [{
              apiVersion: "policies.open-cluster-management.io/v1", 
              kind: "Policy", 
              metadata: {
                name: "test-policy",
                finalizers: [
                  "propagator.finalizer.mcm.ibm.com"
                ],
                generation: 7,
                namespace: "mcm",
                resourceVersion: "1234567"
              },
            }]
          )
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Update Resource Labels Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          updateResourceLabels(
            name: "cluster1", 
            namespace: "cluster1", 
            resourceType: "HCMCluster", 
            body: [{
              op: "replace", 
              path: "/metadata/labels",
              value: {
                  cloud: "IBM",
                  datacenter: "toronto",
                  environment: "Dev"
                }
              }]
            )
          }
       `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});
