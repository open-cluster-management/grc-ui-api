/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import ApiURL from '../lib/ApiURL';

export const mockCluster1Response = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.clusterRegistryApiURL}cluster1/clusters/`,
    resourceVersion: '219916',
  },
  items: [
    {
      kind: 'Cluster',
      apiVersion: 'clusterregistry.k8s.io/v1alpha1',
      metadata: {
        name: 'cluster1',
        namespace: 'cluster1',
        selfLink: `${ApiURL.clusterRegistryApiURL}cluster1/clusters/cluster1`,
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

export const mockCluster1StatusResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.mcmNSApiURL}cluster1/clusterstatuses`,
    resourceVersion: '219916',
  },
  items: [
    {
      metadata: {
        name: 'cluster1',
        namespace: 'cluster1',
        selfLink: `${ApiURL.mcmNSApiURL}cluster1/clusterstatuses/cluster1`,
        uid: 'cc540dfa-96b0-44e4-93d4-cfa18c387325',
        resourceVersion: '219916',
        creationTimestamp: '2020-03-30T13:37:26Z',
        labels: {
          cloud: 'Amazon',
          name: 'cluster1',
          vendor: 'OpenShift',
        },
        annotations: {
          'mcm.ibm.com/deployer-prefix': 'md',
          'mcm.ibm.com/secretRef': 'cluster1-federation-secret',
          'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNhbGFtYXJpOmNhbGFtYXJp',
        },
        ownerReferences: [
          {
            apiVersion: 'mcm.ibm.com/__internal',
            kind: 'Cluster',
            name: 'cluster1',
            uid: '8f3724f1-2d9b-4a1d-8dd8-b88e59675c45',
            controller: true,
            blockOwnerDeletion: true,
          },
        ],
      },
      spec: {
        masterAddresses: [
          {
            ip: 'api.cluster1.dev08.red-chesterfield.com',
          },
        ],
        consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
        capacity: {
          cpu: '36',
          memory: '142867Mi',
          nodes: '6',
          storage: '0',
        },
        usage: {
          cpu: '9155m',
          memory: '22188Mi',
          pods: '225',
          storage: '0',
        },
        klusterletEndpoint: {
          ip: '',
          hostname: 'endpoint-workmgr-multicluster-endpoint.apps.cluster1.dev08.red-chesterfield.com',
        },
        klusterletPort: {
          name: 'https',
          port: 443,
          protocol: 'TCP',
        },
        monitoringScrapeTarget: 'kubernetes-cadvisor',
        klusterletVersion: '0.0.1-SNAPSHOT-2020-03-12-20-43-45-9-g4d01dc75b4f8bf',
        version: 'v1.16.2+rhos',
        klusterletCA: 'Test klusterletCA',
      },
    },
  ],
};

export const mockClusterHubResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.clusterRegistryApiURL}clusterhub/clusters/`,
    resourceVersion: '219917',
  },
  items: [
    {
      kind: 'Cluster',
      apiVersion: 'clusterregistry.k8s.io/v1alpha1',
      metadata: {
        name: '',
        namespace: '',
        selfLink: `${ApiURL.clusterRegistryApiURL}clusterhub/clusters/clusterhub`,
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

export const mockClusterHubStatusResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.mcmNSApiURL}clusterhub/clusterstatuses`,
    resourceVersion: '219917',
  },
  items: [
    {
      metadata: {
        name: '',
        namespace: '',
        selfLink: `${ApiURL.mcmNSApiURL}clusterhub/clusterstatuses/clusterhub`,
        uid: 'cc540dfa-96b0-44e4-93d4-cfa18c387325',
        resourceVersion: '219917',
        creationTimestamp: '2020-03-30T13:37:26Z',
        labels: {
          cloud: 'Amazon',
          name: 'clusterhub',
          vendor: 'OpenShift',
        },
        annotations: {
          'mcm.ibm.com/deployer-prefix': 'md',
          'mcm.ibm.com/secretRef': 'clusterhub-federation-secret',
          'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNhbGFtYXJpOmNhbGFtYXJp',
        },
        ownerReferences: [
          {
            apiVersion: 'mcm.ibm.com/__internal',
            kind: 'Cluster',
            name: 'clusterhub',
            uid: '8f3724f1-2d9b-4a1d-8dd8-b88e59675c45',
            controller: true,
            blockOwnerDeletion: true,
          },
        ],
      },
      spec: {
        masterAddresses: [
          {
            ip: 'api.clusterhub.dev08.red-chesterfield.com',
          },
        ],
        consoleURL: '',
        capacity: {
          cpu: '36',
          memory: '142867Mi',
          nodes: '6',
          storage: '0',
        },
        usage: {
          cpu: '9155m',
          memory: '22188Mi',
          pods: '225',
          storage: '0',
        },
        klusterletEndpoint: {
          ip: '',
          hostname: 'endpoint-workmgr-multicluster-endpoint.apps.clusterhub.dev08.red-chesterfield.com',
        },
        klusterletPort: {
          name: 'https',
          port: 443,
          protocol: 'TCP',
        },
        monitoringScrapeTarget: 'kubernetes-cadvisor',
        klusterletVersion: '0.0.1-SNAPSHOT-2020-03-12-20-43-45-9-g4d01dc75b4f8bf',
        version: 'v1.16.2+rhos',
        klusterletCA: 'Test klusterletCA',
      },
    },
  ],
};

export const mockMCMResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.clusterRegistryApiURL}mcm/clusters/`,
    resourceVersion: '219919',
  },
  items: [],
};

export const mockDefaultResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.clusterRegistryApiURL}default/clusters/`,
    resourceVersion: '219920',
  },
  items: [],
};

export const mockKubeSystemResponse = {
  kind: 'ClusterList',
  apiVersion: 'clusterregistry.k8s.io/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.clusterRegistryApiURL}kube-system/clusters/`,
    resourceVersion: '219921',
  },
  items: [],
};

export const mockMCMStatusResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.mcmNSApiURL}mcm/clusterstatuses`,
    resourceVersion: '219919',
  },
  items: [],
};

export const mockDefaultStatusResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.mcmNSApiURL}default/clusterstatuses`,
    resourceVersion: '219920',
  },
  items: [],
};

export const mockKubeSystemStatusResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `${ApiURL.mcmNSApiURL}kube-system/clusterstatuses`,
    resourceVersion: '219921',
  },
  items: [],
};
