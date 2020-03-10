/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import { mockPlacementListResponse, hostUrl } from '../mocks/PlacementList';

describe('Placement Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(hostUrl);

    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/default/placementpolicies')
      .reply(200, mockPlacementListResponse);
    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/kube-system/placementpolicies')
      .reply(200, mockPlacementListResponse);
    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/mcm/placementpolicies')
      .reply(200, mockPlacementListResponse);
    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/cluster1/placementpolicies')
      .reply(200, mockPlacementListResponse);
    APIServer.get('/mcm.ibm.com/v1alpha1/namespaces/clusterhub/placementpolicies')
      .reply(200, mockPlacementListResponse);
  });

  test('Correctly Resolves Placement Policy List Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
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
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});
