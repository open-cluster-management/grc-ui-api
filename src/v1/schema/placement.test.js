/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ******************************************************************************* */
/* Copyright (c) 2020 Red Hat, Inc. */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import mockPlacementListResponse from '../mocks/PlacementList';
import ApiGroup from '../lib/ApiGroup';

describe('Placement Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(ApiGroup.hostUrl);

    APIServer.get('/apps.open-cluster-management.io/v1/namespaces/default/placementrules')
      .reply(200, mockPlacementListResponse);
    APIServer.get('/apps.open-cluster-management.io/v1/namespaces/kube-system/placementrules')
      .reply(200, mockPlacementListResponse);
    APIServer.get('/apps.open-cluster-management.io/v1/namespaces/mcm/placementrules')
      .reply(200, mockPlacementListResponse);
    APIServer.get('/apps.open-cluster-management.io/v1/namespaces/cluster1/placementrules')
      .reply(200, mockPlacementListResponse);
    APIServer.get('/apps.open-cluster-management.io/v1/namespaces/clusterhub/placementrules')
      .reply(200, mockPlacementListResponse);
  });

  test('Correctly Resolves Placement Policy List Query', () => new Promise((done) => {
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
  }));
});
