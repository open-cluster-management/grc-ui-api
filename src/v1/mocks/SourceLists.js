/* Copyright Contributors to the Open Cluster Management project */

import ApiGroup from '../lib/ApiGroup';

export const mockSubscriptionListDefaultResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [],
  kind: 'SubscriptionList',
};

export const mockChannelListDefaultResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [],
  kind: 'ChannelList',
};

export const mockHelmReleaseListDefaultResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [],
  kind: 'HelmReleaseList',
};

export const mockSubscriptionListPolicyNamespaceResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [
    {
      apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
      kind: 'Subscription',
      metadata: {
        annotations: {
          'apps.open-cluster-management.io/git-branch': 'main',
          'apps.open-cluster-management.io/git-path': 'my-policies',
          'apps.open-cluster-management.io/github-commit': '8de23f',
          'apps.open-cluster-management.io/bucket-path': 'examples',
        },
        name: 'demo-stable-policies-sub',
        namespace: 'policy-namespace',
      },
      spec: {
        channel: 'policy-namespace/demo-stable-policies-chan',
        placement: {
          local: true,
        },
      },
    },
    {
      apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
      kind: 'Subscription',
      metadata: {
        name: 'demo-stable-policies-sub2',
        namespace: 'policy-namespace',
      },
      spec: {
        channel: 'policy-namespace/demo-stable-policies-chan2',
        name: 'iampolicy',
        packageFilter: {
          version: '1.1.0',
        },
        placement: {
          local: true,
        },
      },
    },
  ],
  kind: 'SubscriptionList',
};

export const mockChannelListPolicyNamespaceResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [
    {
      apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
      kind: 'Channel',
      metadata: {
        name: 'demo-stable-policies-chan',
        namespace: 'policy-namespace',
      },
      spec: {
        pathname: 'https://github.com/stolostron/policy-collection',
        type: 'GitHub',
      },
    },
    {
      apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
      kind: 'Channel',
      metadata: {
        name: 'demo-stable-policies-chan2',
        namespace: 'policy-namespace',
      },
      spec: {
        pathname: 'https://example.com/policy-charts',
        type: 'HelmRepo',
      },
    },
  ],
  kind: 'ChannelList',
};

export const mockHelmReleaseListPolicyNamespaceResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [
    {
      apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
      kind: 'HelmRelease',
      metadata: {
        annotations: {
          'apps.open-cluster-management.io/hosting-subscription': 'policy-namespace/demo-stable-policies-sub2',
        },
        name: 'chart-policies-xyz',
        namespace: 'policy-namespace',
      },
    },
  ],
  kind: 'HelmReleaseList',
};
