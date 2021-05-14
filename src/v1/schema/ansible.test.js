/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import {
  mockAnsibleJobTemplatesResponse,
  mockAnsibleSecretsResponse,
  mockSecretExistsInTargetNamespaceResponse,
  mockSecretNotExistsInTargetNamespaceResponse,
  mockRootAnsibleSecetResponse,
  mockCopiedSecetResponse,
  mockPolicyAutomationsResponse,
  mockAnsibleJobListResponse,
  mockCreatePolicyAutomationResponse,
  mockUpdatePolicyAutomationResponse,
} from '../mocks/Ansible';
import ApiGroup from '../lib/ApiGroup';

describe('Ansible Automation Resolver', () => {
  test('Correctly resolves ansible credentials', () => new Promise((done) => {
    const APIServer = nock('http://0.0.0.0/kubernetes');
    ['local-cluster', 'cluster1', 'policy-namespace', 'default', 'kube-system'].forEach((ns) => {
      APIServer.persist().get(`/api/v1/namespaces/${ns}/secrets?labelSelector=cluster.open-cluster-management.io/provider=ans`).reply(200, mockAnsibleSecretsResponse(ns));
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

  test('Correctly resolves Policy Automation in single ns', () => new Promise((done) => {
    const APIServer = nock('http://0.0.0.0/kubernetes');
    const ns = 'default';
    APIServer.persist().get(`/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${ns}/policyautomations`).reply(200, mockPolicyAutomationsResponse(ns));
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          policyAutomations{
            kind
            apiVersion
            metadata {
              name
              namespace
            }
            spec
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly resolves Policy Automation in multi ns', () => new Promise((done) => {
    const APIServer = nock('http://0.0.0.0/kubernetes');
    ['local-cluster', 'cluster1', 'policy-namespace', 'default', 'kube-system'].forEach((ns) => {
      APIServer.persist().get(`/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${ns}/policyautomations`).reply(200, mockPolicyAutomationsResponse(ns));
    });
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          policyAutomations{
            kind
            apiVersion
            metadata {
              name
              namespace
            }
            spec
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly resolves Ansible Job Templates', () => new Promise((done) => {
    nock('https://ansible-tower.com').persist().get('/api/v2/job_templates')
      .reply(200, mockAnsibleJobTemplatesResponse);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          ansibleJobTemplates(host:"https://ansible-tower.com", token:"bW9ja3Rva2Vu"){
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

  test('Should return root ansible credential name as the targeNamespace is same as credential namespace', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          copyAnsibleSecret(name: "toweraccess", namespace: "default", targetNamespace: "default"){
            name
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Should return existing secret name as the copied secret already exists', () => new Promise((done) => {
    const name = 'toweraccess';
    const namespace = 'default';
    const targetNamespace = 'kube-system';
    const APIServer = nock('http://0.0.0.0/kubernetes');
    APIServer.persist().get(`/api/v1/namespaces/${targetNamespace}/secrets?labelSelector=cluster.open-cluster-management.io/copiedFromSecretName=${name},cluster.open-cluster-management.io/copiedFromNamespace=${namespace}`).reply(200, mockSecretExistsInTargetNamespaceResponse);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          copyAnsibleSecret(name: "toweraccess", namespace: "default", targetNamespace: "kube-system"){
            name
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        nock.cleanAll(); // clear mock
        done();
      });
  }));

  test('Should copy and return secret name as credential needs to be copied', () => new Promise((done) => {
    const name = 'toweraccess';
    const namespace = 'default';
    const targetNamespace = 'kube-system';
    const APIServer = nock('http://0.0.0.0/kubernetes');
    APIServer.persist().get(`/api/v1/namespaces/${targetNamespace}/secrets?labelSelector=cluster.open-cluster-management.io/copiedFromSecretName=${name},cluster.open-cluster-management.io/copiedFromNamespace=${namespace}`).reply(200, mockSecretNotExistsInTargetNamespaceResponse);
    APIServer.persist().get(`/api/v1/namespaces/${namespace}/secrets/${name}`).reply(200, mockRootAnsibleSecetResponse);
    APIServer.persist().post(`/api/v1/namespaces/${targetNamespace}/secrets`).reply(200, mockCopiedSecetResponse);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          copyAnsibleSecret(name: "toweraccess", namespace: "default", targetNamespace: "kube-system"){
            name
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Should correctly resolve ansible automation history', () => new Promise((done) => {
    const namespace = 'default';
    const APIServer = nock('http://0.0.0.0/kubernetes');
    APIServer.persist().get(`/apis/tower.ansible.com/v1alpha1/namespaces/${namespace}/ansiblejobs`).reply(200, mockAnsibleJobListResponse);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `{
          ansibleAutomationHistories(name: "policy-role", namespace:"default") {
            name
            namespace
            status
            started
            finished
            job
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

test('Correctly Resolves Create Policy Automation Mutation', () => new Promise((done) => {
  const APIServer = nock('http://0.0.0.0/kubernetes');
  ['default'].forEach((namespace) => {
    APIServer.persist().post(`/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${namespace}/policyautomations`)
      .reply(200, mockCreatePolicyAutomationResponse);
  });
  supertest(server)
    .post(GRAPHQL_PATH)
    .send({
      query: `
      mutation {
        modifyPolicyAutomation(
          poliyAutomationJSON: [{
            kind: "PolicyAutomation",
            apiVersion: "policy.open-cluster-management.io/v1alpha1",
            metadata: {
              name: "policy-grc-default-policyAutomation",
              namespace: "default",
            },
            spec: {
              policyRef: "policy-grc-111",
              eventHook: "non-compliance",
              mode: "once",
              automationDef: {
                type: "AnsibleJob",
                name: "Demo Job Template",
                secret: "grc-testing",
                extra_vars: {
                  selector: "target-cluster",
                },
              },
            },
          }],
          action: "post"
        )
      }
    `,
    })
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done();
    });
}));

test('Resolves Policy Automation Mutation Empty Case', () => new Promise((done) => {
  const APIServer = nock('http://0.0.0.0/kubernetes');
  ['default'].forEach((namespace) => {
    APIServer.persist().post(`/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${namespace}/policyautomations`)
      .reply(200, mockCreatePolicyAutomationResponse);
  });
  supertest(server)
    .post(GRAPHQL_PATH)
    .send({
      query: `
      mutation {
        modifyPolicyAutomation(
          poliyAutomationJSON: [],
          action: "post"
        )
      }
    `,
    })
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done();
    });
}));

test('Correctly Resolves Update Policy Automation Mutation', () => new Promise((done) => {
  const APIServer = nock('http://0.0.0.0/kubernetes');
  ['default'].forEach((namespace) => {
    APIServer.persist().put(`/apis/${ApiGroup.policiesGroup}/v1beta1/namespaces/${namespace}/policyautomations/policy-grc-default-policyAutomation`)
      .reply(200, mockUpdatePolicyAutomationResponse);
  });
  supertest(server)
    .post(GRAPHQL_PATH)
    .send({
      query: `
      mutation {
        modifyPolicyAutomation(
          poliyAutomationJSON: [{
            kind: "PolicyAutomation",
            apiVersion: "policy.open-cluster-management.io/v1alpha1",
            metadata: {
              name: "policy-grc-default-policyAutomation",
              namespace: "default",
            },
            spec: {
              policyRef: "policy-grc-111",
              eventHook: "non-compliance",
              mode: "once",
              automationDef: {
                type: "AnsibleJob",
                name: "Demo Job Template",
                secret: "grc-testing",
                extra_vars: {
                  selector: "target-cluster",
                },
              },
            },
          }],
          action: "put"
        )
      }
    `,
    })
    .end((err, res) => {
      expect(JSON.parse(res.text)).toMatchSnapshot();
      done();
    });
}));
