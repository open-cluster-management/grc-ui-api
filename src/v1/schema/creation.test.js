import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import ApiGroup from '../lib/ApiGroup';
import { mockComplianceListDefaultResponse, mockComplianceListKubeSystemResponse, mockComplianceListMCMResponse } from '../mocks/ComplianceList';
import {
  mockClusterIronmanResponse, mockClusterDefaultResponse,
  mockCluster1Response, mockClusterHubResponse, mockMCMResponse,
  mockDefaultResponse, mockClusterKubeSystemResponse,
} from '../mocks/ClusterList';

describe('Creation Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(ApiGroup.hostUrl);

    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/default/policies')
      .reply(200, mockComplianceListDefaultResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/kube-system/policies')
      .reply(200, mockComplianceListKubeSystemResponse);
    APIServer.persist().get('/policy.open-cluster-management.io/v1/namespaces/mcm/policies')
      .reply(200, mockComplianceListMCMResponse);

    // Single cluster
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/ironman/managedclusterinfos')
      .reply(200, mockClusterIronmanResponse);
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/default/managedclusterinfos')
      .reply(200, mockClusterDefaultResponse);
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
      .reply(200, mockClusterKubeSystemResponse);
  });

  test('Correctly Resolves Creation Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          discoveries {
            clusterLabels
            policyNames
            annotations
            templates { 
              name
              spec
            }
            namespaces 
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
