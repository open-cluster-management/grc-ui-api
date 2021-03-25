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

import ApiGroup from '../lib/ApiGroup';

export const mockClusterIronmanResponse = [
  {
    apiVersion: `${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}`,
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
      selfLink: `/apis/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/ironman/managedclusterinfos/ironman`,
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

export const mockClusterCluster1Response = {
  apiVersion: 'internal.open-cluster-management.io/v1beta1',
  items: [
    {
      apiVersion: 'internal.open-cluster-management.io/v1beta1',
      kind: 'ManagedClusterInfo',
      metadata: {
        creationTimestamp: '2020-10-26T19:36:24Z',
        generation: 1,
        labels: {
          cloud: 'Amazon',
          environment: 'dev',
          name: 'cluster1',
          vendor: 'OpenShift',
        },
        name: 'cluster1',
        namespace: 'cluster1',
        resourceVersion: '28604210',
        selfLink: '/apis/internal.open-cluster-management.io/v1beta1/namespaces/cluster1/managedclusterinfos/cluster1',
        uid: 'e3031b12-fff1-4f2b-bfef-cb27f4804895',
      },
      spec: {
        loggingCA: '12345',
      },
      status: {
        cloudVendor: 'Amazon',
        conditions: [
          {
            lastTransitionTime: '2020-10-26T19:36:23Z',
            message: 'Accepted by hub cluster admin',
            reason: 'HubClusterAdminAccepted',
            status: 'True',
            type: 'HubAcceptedManagedCluster',
          },
          {
            lastTransitionTime: '2020-10-26T19:36:58Z',
            message: 'Managed cluster joined',
            reason: 'ManagedClusterJoined',
            status: 'True',
            type: 'ManagedClusterJoined',
          },
          {
            lastTransitionTime: '2020-10-28T15:13:59Z',
            message: 'Managed cluster is available',
            reason: 'ManagedClusterAvailable',
            status: 'True',
            type: 'ManagedClusterConditionAvailable',
          },
          {
            lastTransitionTime: '2020-10-26T19:39:12Z',
            message: 'Managed cluster info is synced',
            reason: 'ManagedClusterInfoSynced',
            status: 'True',
            type: 'ManagedClusterInfoSynced',
          },
        ],
        consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
        distributionInfo: {
          ocp: {},
          type: 'OCP',
        },
        kubeVendor: 'OpenShift',
        loggingEndpoint: {
          hostname: 'klusterlet-addon-workmgr-open-cluster-management-agent-addon.apps.cluster1.dev08.red-chesterfield.com',
          ip: '',
        },
        loggingPort: {
          name: 'https',
          port: 0,
          protocol: 'TCP',
        },
        nodeList: [],
        version: 'v1.18.3+3107688',
      },
    },
  ],
  kind: 'ManagedClusterInfoList',
  metadata: {
    continue: '',
    resourceVersion: '28605725',
    selfLink: '/apis/internal.open-cluster-management.io/v1beta1/namespaces/cluster1/managedclusterinfos/',
  },
};

export const mockClusterHubResponse = {
  apiVersion: `${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}`,
  items: [
    {
      apiVersion: `${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}`,
      kind: 'ManagedClusterInfo',
      metadata: {
        creationTimestamp: '2020-10-26T18:41:50Z',
        generation: 1,
        labels: {
          cloud: 'Amazon',
          'installer.name': 'multiclusterhub',
          'installer.namespace': 'open-cluster-management',
          'local-cluster': 'true',
          name: 'local-cluster',
          vendor: 'OpenShift',
        },
        name: 'local-cluster',
        namespace: 'local-cluster',
        resourceVersion: '28571169',
        selfLink: `/apis/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/local-cluster/managedclusterinfos/local-cluster`,
        uid: '22ef5d6b-2bed-409b-b9cc-791397662d1f',
      },
      spec: {
        loggingCA: '12345',
      },
      status: {
        cloudVendor: 'Amazon',
        conditions: [
          {
            lastTransitionTime: '2020-10-26T18:41:50Z',
            message: 'Accepted by hub cluster admin',
            reason: 'HubClusterAdminAccepted',
            status: 'True',
            type: 'HubAcceptedManagedCluster',
          },
          {
            lastTransitionTime: '2020-10-26T18:42:06Z',
            message: 'Managed cluster is available',
            reason: 'ManagedClusterAvailable',
            status: 'True',
            type: 'ManagedClusterConditionAvailable',
          },
          {
            lastTransitionTime: '2020-10-26T18:42:06Z',
            message: 'Managed cluster joined',
            reason: 'ManagedClusterJoined',
            status: 'True',
            type: 'ManagedClusterJoined',
          },
          {
            lastTransitionTime: '2020-10-26T18:44:12Z',
            message: 'Managed cluster info is synced',
            reason: 'ManagedClusterInfoSynced',
            status: 'True',
            type: 'ManagedClusterInfoSynced',
          },
        ],
        consoleURL: 'https://console-openshift-console.apps.hub.dev08.red-chesterfield.com',
        distributionInfo: {
          ocp: {},
          type: 'OCP',
        },
        kubeVendor: 'OpenShift',
        loggingEndpoint: {
          hostname: 'klusterlet-addon-workmgr.open-cluster-management-agent-addon.svc',
          ip: '',
        },
        loggingPort: {
          name: 'https',
          port: 443,
          protocol: 'TCP',
        },
        nodeList: [],
        version: 'v1.18.3+3107688',
      },
    },
  ],
  kind: 'ManagedClusterInfoList',
  metadata: {
    continue: '',
    resourceVersion: '28572465',
    selfLink: `/apis/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/local-cluster/managedclusterinfos/`,
  },
};

export const mockClusterNonclusterNs = {
  apiVersion: `${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}`,
  items: [],
  kind: 'ManagedClusterInfoList',
  metadata: {
    continue: '',
    resourceVersion: '28559610',
    selfLink: `/apis/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces/default/managedclusterinfos`,
  },
};
