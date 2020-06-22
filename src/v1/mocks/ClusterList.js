/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import ApiGroup from '../lib/ApiGroup';

export const mockCluster1Response = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.clusterRegistryGroup}/${ApiGroup.mcmVersion}/namespaces/cluster1/clusters/`,
    resourceVersion: '219916',
  },
  items: [
    {
      kind: 'Cluster',
      apiVersion: 'clusterregistry.k8s.io/v1alpha1',
      metadata: {
        name: 'cluster1',
        namespace: 'cluster1',
        selfLink: `/apis/${ApiGroup.clusterRegistryGroup}/${ApiGroup.mcmVersion}/namespaces/cluster1/clusters/cluster1`,
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

export const mockClusterIronmanResponse
 = [
   {
     apiVersion: 'internal.open-cluster-management.io/v1beta1',
     kind: 'ManagedClusterInfo',
     metadata: {
       creationTimestamp: '2020-06-16T13:58:50Z',
       generation: 2,
       labels: {
         cloud: 'auto-detect',
         environment: '',
         name: 'ironman',
         vendor: 'auto-detect',
       },
       name: 'ironman',
       namespace: 'ironman',
       resourceVersion: '5002550',
       selfLink: '/apis/internal.open-cluster-management.io/v1beta1/namespaces/ironman/managedclusterinfos/ironman',
       uid: '23b04acb-6d80-40c5-9db8-4a53782cbfb8',
     },
     spec: {
       masterEndpoint: 'api.ironman.dev08.red-chesterfield.com:6443',
     },
     status: {
       conditions: [
         {
           lastTransitionTime: '2020-06-19T13:13:59Z',
           message: 'cluster is posting ready status',
           reason: 'ClusterReady',
           status: 'True',
           type: 'ManagedClusterJoined',
         },
       ],
       distributionInfo: {
         ocp: {},
       },
       loggingEndpoint: {
         ip: '',
       },
       loggingPort: {
         port: 0,
       },
     },
   },
 ];

export const mockClusterDefaultResponse
 = [
   {
     apiVersion: 'internal.open-cluster-management.io/v1beta1',
     kind: 'ManagedClusterInfo',
     metadata: {
       creationTimestamp: '2020-06-16T13:58:50Z',
       generation: 2,
       labels: {
         cloud: 'auto-detect',
         environment: '',
         name: 'default',
         vendor: 'auto-detect',
       },
       name: 'default',
       namespace: 'default',
       resourceVersion: '5002550',
       selfLink: '/apis/internal.open-cluster-management.io/v1beta1/namespaces/default/managedclusterinfos/default',
       uid: '23b04acb-6d80-40c5-9db8-4a53782cbfb8',
     },
     spec: {
       masterEndpoint: 'api.default.dev08.red-chesterfield.com:6443',
     },
     status: {
       conditions: [
         {
           lastTransitionTime: '2020-06-19T13:13:59Z',
           message: 'cluster is posting ready status',
           reason: 'ClusterReady',
           status: 'True',
           type: 'ManagedClusterJoined',
         },
       ],
       distributionInfo: {
         ocp: {},
       },
       loggingEndpoint: {
         ip: '',
       },
       loggingPort: {
         port: 0,
       },
     },
   },
 ];

export const mockClusterKubeSystemResponse
 = [
   {
     apiVersion: 'internal.open-cluster-management.io/v1beta1',
     kind: 'ManagedClusterInfo',
     metadata: {
       creationTimestamp: '2020-06-16T13:58:50Z',
       generation: 2,
       labels: {
         cloud: 'auto-detect',
         environment: '',
         name: 'kube-system',
         vendor: 'auto-detect',
       },
       name: 'kube-system',
       namespace: 'kube-system',
       resourceVersion: '5002550',
       selfLink: '/apis/internal.open-cluster-management.io/v1beta1/namespaces/kube-system/managedclusterinfos/kube-system',
       uid: '23b04acb-6d80-40c5-9db8-4a53782cbfb8',
     },
     spec: {
       masterEndpoint: 'api.kube-system.dev08.red-chesterfield.com:6443',
     },
     status: {
       conditions: [
         {
           lastTransitionTime: '2020-06-19T13:13:59Z',
           message: 'cluster is posting ready status',
           reason: 'ClusterReady',
           status: 'True',
           type: 'ManagedClusterJoined',
         },
       ],
       distributionInfo: {
         ocp: {},
       },
       loggingEndpoint: {
         ip: '',
       },
       loggingPort: {
         port: 0,
       },
     },
   },
 ];

export const mockClusterHubResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.clusterRegistryGroup}/${ApiGroup.mcmVersion}/namespaces/clusterhub/clusters/`,
    resourceVersion: '219917',
  },
  items: [
    {
      kind: 'Cluster',
      apiVersion: 'clusterregistry.k8s.io/v1alpha1',
      metadata: {
        name: '',
        namespace: '',
        selfLink: `/apis/${ApiGroup.clusterRegistryGroup}/${ApiGroup.mcmVersion}/namespaces/clusterhub/clusters/clusterhub`,
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
    selfLink: `/apis/${ApiGroup.clusterRegistryGroup}/${ApiGroup.mcmVersion}/namespaces/mcm/clusters/`,
    resourceVersion: '219919',
  },
  items: [],
};

export const mockDefaultResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.clusterRegistryGroup}/${ApiGroup.mcmVersion}/namespaces/default/clusters/`,
    resourceVersion: '219920',
  },
  items: [],
};

export const mockKubeSystemResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.clusterRegistryGroup}/${ApiGroup.mcmVersion}/namespaces/kube-system/clusters/`,
    resourceVersion: '219921',
  },
  items: [],
};
