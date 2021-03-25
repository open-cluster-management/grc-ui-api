/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ***************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import ApiGroup from '../lib/ApiGroup';

export const mockPlacementRuleListResponse = {
  kind: 'PlacementRuleList',
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  metadata: {
    selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementrules`,
    resourceVersion: '26755129',
  },
  items: [
    {
      apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
      kind: 'PlacementRule',
      metadata: {
        name: 'placement-test-policy',
        namespace: 'policy-namespace',
        selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementrules/placement-test-policy`,
        uid: '2a52a098-b228-11e9-926f-eae85572ef1a',
        resourceVersion: '60',
        creationTimestamp: '2020-11-02T17:41:59Z',
        annotations: {
          'open-cluster-management.io/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'open-cluster-management.io/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
        },
      },
      spec: {
        clusterConditions: [
          {
            status: 'True',
            type: 'ManagedClusterConditionAvailable',
          },
        ],
        clusterSelector: {
          matchLabels: {
            cloud: 'IBM',
          },
        },
      },
      status: {
        decisions: [
          {
            clusterName: 'local-cluster',
            clusterNamespace: 'local-cluster',
          },
          {
            clusterName: 'cluster1',
            clusterNamespace: 'cluster1',
          },
        ],
      },
    },
    {
      apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
      kind: 'PlacementRule',
      metadata: {
        name: 'placement-policy-ma',
        namespace: 'policy-namespace',
        selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementrules/placement-policy-ma`,
        uid: 'ada3957f-b228-11e9-926f-eae85572ef1a',
        resourceVersion: '98',
        creationTimestamp: '2020-11-02T17:45:39Z',
        annotations: {
          'open-cluster-management.io/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'open-cluster-management.io/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
        },
      },
      spec: {
        clusterConditions: [
          {
            status: 'True',
            type: 'ManagedClusterConditionAvailable',
          },
        ],
        clusterSelector: {
          matchLabels: {
            cloud: 'IBM',
          },
        },
      },
      status: {
        decisions: [
          {
            clusterName: 'local-cluster',
            clusterNamespace: 'local-cluster',
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

export const mockPlacementBindingListResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [
    {
      apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
      kind: 'PlacementBinding',
      metadata: {
        creationTimestamp: '2020-11-03T19:21:39Z',
        generation: 1,
        managedFields: [
          {
            apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
            fieldsType: 'FieldsV1',
            fieldsV1: {
              'f:placementRef': {
                '.': {},
                'f:apiGroup': {},
                'f:kind': {},
                'f:name': {},
              },
              'f:subjects': {},
            },
            manager: 'unknown',
            operation: 'Update',
            time: '2020-11-03T19:21:39Z',
          },
        ],
        name: 'binding-test-policy',
        namespace: 'policy-namespace',
        resourceVersion: '27707535',
        selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementbindings/binding-test-policy`,
        uid: 'd01b711c-f333-44ad-9794-3b676263d135',
      },
      placementRef: {
        apiGroup: 'apps.open-cluster-management.io',
        kind: 'PlacementRule',
        name: 'placement-test-policy',
      },
      subjects: [
        {
          apiGroup: `${ApiGroup.appsGroup}`,
          kind: 'Policy',
          name: 'test-policy',
        },
      ],
    },
  ],
  kind: 'PlacementBindingList',
  metadata: {
    continue: '',
    resourceVersion: '28733694',
    selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementbindings`,
  },
};

export const mockPlacementRuleListNoResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [],
  kind: 'PlacementRuleList',
  metadata: {
    continue: '',
    resourceVersion: '28727378',
    selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/namespace/placementrules`,
  },
};

export const mockPlacementBindingListNoResponse = {
  apiVersion: `${ApiGroup.appsGroup}/${ApiGroup.version}`,
  items: [],
  kind: 'PlacementBindingList',
  metadata: {
    continue: '',
    resourceVersion: '28731685',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/namespace/placementbindings',
  },
};
