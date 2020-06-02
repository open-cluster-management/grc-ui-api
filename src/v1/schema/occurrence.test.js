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
import { mockOccurrences, mockDiffIdOccurrences } from '../mocks/OccurrenceList';


describe('Occurrences Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock('http://0.0.0.0/findings');

    // define the method to be intercepted
    APIServer.persist().post('/v1/id-mycluster-account/graph', /\.*occurrences\.*/gi)
      .reply(200, mockOccurrences);
    APIServer.persist().post('/v1/testing-different-id/graph', /\.*occurrences\.*/gi)
      .reply(200, mockDiffIdOccurrences);
  });

  test('Correctly Resolves Occurrences Query without userAccountID', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          occurrences {
            name
            noteName
            updateTime
            createTime
            shortDescription
            longDescription
            providerId
            providerName
            remediation
            context
            reportedBy
            finding
            securityClassification
          }
        }
      `,
      })
      .end((err, res) => {
        const textMessage = JSON.parse(res.text);
        expect(textMessage).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Occurrences Query with empty userAccountID', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          occurrences(userAccountID:"") {
            name
            noteName
            updateTime
            createTime
            shortDescription
            longDescription
            providerId
            providerName
            remediation
            context
            reportedBy
            finding
            securityClassification
          }
        }
      `,
      })
      .end((err, res) => {
        const textMessage = JSON.parse(res.text);
        expect(textMessage).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Occurrences Query with specific userAccountID', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          occurrences(userAccountID:"testing-different-id") {
            name
            noteName
            updateTime
            createTime
            shortDescription
            longDescription
            providerId
            providerName
            remediation
            context
            reportedBy
            finding
            securityClassification
          }
        }
      `,
      })
      .end((err, res) => {
        const textMessage = JSON.parse(res.text);
        expect(textMessage).toMatchSnapshot();
        done();
      });
  }));
});
