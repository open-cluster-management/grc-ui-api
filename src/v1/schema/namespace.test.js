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
import { mockResourceView, mockResponse } from '../mocks/NamespaceList';
import ApiGroup from '../lib/ApiGroup';

function sliceIngoreEscape(str, remover, len, flag) {
  const index = flag ? str.indexOf(remover) : str.lastIndexOf(remover);
  return str.substring(0, index + remover.length)
  + str.substring(index + remover.length + len);
}

describe('Namespace Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(ApiGroup.hostUrl);

    // define the method to be intercepted
    APIServer.get('/compliance.mcm.ibm.com/v1alpha1/namespaces/mcm/namespaces')
      .reply(200, mockResourceView);
    APIServer.get('/policy.open-cluster-management.io/v1/namespaces/mcm/namespaces')
      .reply(200, mockResponse);
  });

  test('Correctly Resolves Namespace Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          namespaces {
            cluster
            metadata {
              creationTimestamp
              name
              uid
            }
            status
          }
        }
      `,
      })
      .end((err, res) => {
        let textMessage = JSON.parse(res.text);
        textMessage = sliceIngoreEscape(textMessage.errors[0].message, 'namespaces-', 13, true);
        textMessage = sliceIngoreEscape(textMessage, 'namespaces-', 13, false);
        expect(textMessage).toMatchSnapshot();
        done();
      });
  }));
});
