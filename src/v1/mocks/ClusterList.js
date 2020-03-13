/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockCluster1Response = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/cluster1/clusters/',
    resourceVersion: '219916',
  },
  items: [
    {
      kind: 'Cluster',
      apiVersion: 'clusterregistry.k8s.io/v1alpha1',
      metadata: {
        name: 'cluster1',
        namespace: 'cluster1',
        selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/cluster1/clusters/cluster1',
        uid: '6120d6bb-e482-11e9-aa00-96bb9600cc18',
        resourceVersion: '219786',
        creationTimestamp: '2019-10-01T19:33:43Z',
        labels: {
          environment: 'Dev',
          name: 'cluster1',
          region: 'US',
        },
        annotations: {
          'mcm.ibm.com/hub': 'hub0',
          'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
          'seed-generation': '2',
        },
        finalizers: [
          'platform-api.cluster',
          'propagator.finalizer.mcm.ibm.com',
        ],
      },
      spec: {
        kubernetesApiEndpoints: {
          serverEndpoints: [
            {
              clientCIDR: '0.0.0.0/0',
              serverAddress: '9.42.82.160:8001',
            },
          ],
        },
        authInfo: {

        },
      },
      status: {
        conditions: [
          {
            type: '',
            status: '',
            lastHeartbeatTime: '2019-10-31T17:10:33Z',
            lastTransitionTime: '2019-10-31T17:11:34Z',
            reason: 'Klusterlet failed to update cluster status on time',
          },
        ],
      },
    },
  ],
};

export const mockClusterHubResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/clusterhub/clusters/',
    resourceVersion: '219917',
  },
  items: [
    {
      kind: 'Cluster',
      apiVersion: 'clusterregistry.k8s.io/v1alpha1',
      metadata: {
        name: 'clusterhub',
        namespace: 'clusterhub',
        selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/clusterhub/clusters/clusterhub',
        uid: '24466f0f-e482-11e9-aa00-96bb9600cc18',
        resourceVersion: '219917',
        creationTimestamp: '2019-10-01T19:32:01Z',
        labels: {
          environment: 'Dev',
          name: 'clusterhub',
          region: 'US',
        },
        annotations: {
          'mcm.ibm.com/hub': 'hub0',
          'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNsdXN0ZXJodWI6Y2x1c3Rlcmh1Yg==',
          'seed-generation': '2',
        },
        finalizers: [
          'platform-api.cluster',
          'propagator.finalizer.mcm.ibm.com',
        ],
      },
      spec: {
        kubernetesApiEndpoints: {
          serverEndpoints: [
            {
              clientCIDR: '0.0.0.0/0',
              serverAddress: '9.42.82.240:8001',
            },
          ],
        },
        authInfo: {

        },
      },
      status: {
        conditions: [
          {
            type: 'OK',
            status: '',
            lastHeartbeatTime: '2019-10-31T18:02:41Z',
            lastTransitionTime: '2019-10-19T21:47:19Z',
          },
        ],
      },
    },
  ],
};

export const mockMCMResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/mcm/clusters/',
    resourceVersion: '219919',
  },
  items: [],
};

export const mockDefaultResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/default/clusters/',
    resourceVersion: '219920',
  },
  items: [],
};

export const mockKubeSystemResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/kube-system/clusters/',
    resourceVersion: '219921',
  },
  items: [],
};
