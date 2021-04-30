/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import {
  mockAnsibleJobTemplatesResponse,
  mockAnsibleSecretsResponse,
} from '../mocks/Ansible';

describe('Ansible Automation Resolver', () => {
  // beforeAll(() => {
  //   // specify the url to be intercepted
  //   const APIServer = nock('http://0.0.0.0/kubernetes');
  //   APIServer.persist().get('/').reply(200, kubeGetMock);
  // });

  test('Correctly resoves ansible credentials', () => new Promise((done) => {
    const APIServer = nock('http://0.0.0.0/kubernetes');
    ['local-cluster', 'cluster1', 'policy-namespace', 'default', 'kube-system'].forEach((ns) => {
      APIServer.persist().get(`/api/v1/namespaces/${ns}/secrets?labelSelector=cluster.open-cluster-management.io%2Fprovider%3Dans`).reply(200, mockAnsibleSecretsResponse(ns));
    });
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          ansibleCredentials{
            name
            namespace
            host
            token
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Ansible Job Templates', () => new Promise((done) => {
    nock('https://ansible-tower.com').persist().get('/api/v2/job_templates')
      .reply(200, mockAnsibleJobTemplatesResponse);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          ansibleJobTemplates(host:"https://ansible-tower.com", token:"mocktoken"){
            name
            description
            extra_vars
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
