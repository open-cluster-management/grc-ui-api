/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const hostUrl = 'http://0.0.0.0/kubernetes/apis';

export const mockPlacementListResponse = {
  kind: 'PlacementPolicyList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/mcm/placementpolicies',
    resourceVersion: '14383',
  },
  items: [
    {
      metadata: {
        name: 'placement-my-policy',
        namespace: 'mcm',
        selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/mcm/placementpolicies/placement-my-policy',
        uid: '2a52a098-b228-11e9-926f-eae85572ef1a',
        resourceVersion: '60',
        creationTimestamp: '2019-07-29T17:41:59Z',
        annotations: {
          'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
        },
      },
      spec: {
        resourceSelector: {},
        clusterLabels: {
          matchLabels: {
            cloud: 'IBM',
          },
        },
        resourceHint: {},
      },
      status: {
        decisions: [
          {
            clusterName: 'clusterhub',
            clusterNamespace: 'clusterhub',
          },
          {
            clusterName: 'cluster1',
            clusterNamespace: 'cluster1',
          },
        ],
      },
    },
    {
      metadata: {
        name: 'placement-policy-ma',
        namespace: 'mcm',
        selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/mcm/placementpolicies/placement-policy-ma',
        uid: 'ada3957f-b228-11e9-926f-eae85572ef1a',
        resourceVersion: '98',
        creationTimestamp: '2019-07-29T17:45:39Z',
        annotations: {
          'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
        },
      },
      spec: {
        resourceSelector: {},
        clusterLabels: {
          matchLabels: {
            cloud: 'IBM',
          },
        },
        resourceHint: {},
      },
      status: {
        decisions: [
          {
            clusterName: 'clusterhub',
            clusterNamespace: 'clusterhub',
          },
          {
            clusterName: 'cluster1',
            clusterNamespace: 'cluster1',
          },
        ],
      },
    },
  ],
};
