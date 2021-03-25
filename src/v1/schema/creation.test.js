/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import ApiGroup from '../lib/ApiGroup';
import {
  mockComplianceListDefaultResponse, mockComplianceListNoResponse,
  mockComplianceListMCMResponse,
} from '../mocks/ComplianceList';
import {
  mockClusterIronmanResponse, mockClusterCluster1Response,
  mockClusterHubResponse, mockClusterNonclusterNs,
} from '../mocks/ClusterList';

describe('Creation Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock(ApiGroup.hostUrl);

    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies`)
      .reply(200, mockComplianceListDefaultResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/kube-system/policies`)
      .reply(200, mockComplianceListNoResponse);
    APIServer.persist().get(`/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies`)
      .reply(200, mockComplianceListMCMResponse);

    // Single cluster
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/ironman/managedclusterinfos')
      .reply(200, mockClusterIronmanResponse);
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/cluster1/managedclusterinfos')
      .reply(200, mockClusterCluster1Response);
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/local-cluster/managedclusterinfos')
      .reply(200, mockClusterHubResponse);
    // No cluster
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/policy-namespace/managedclusterinfos')
      .reply(200, mockClusterNonclusterNs);
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/default/managedclusterinfos')
      .reply(200, mockClusterNonclusterNs);
    APIServer.persist().get('/internal.open-cluster-management.io/v1beta1/namespaces/kube-system/managedclusterinfos')
      .reply(200, mockClusterNonclusterNs);
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
            annotations {
              standards
              categories
              controls
            }
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
