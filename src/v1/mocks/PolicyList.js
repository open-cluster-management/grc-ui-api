/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ******************************************************************************* */
/* Copyright (c) 2020 Red Hat, Inc. */

import ApiGroup from '../lib/ApiGroup';

export const mockSinglePolicyCluster1Response = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'policy.open-cluster-management.io/categories': 'PR.AC Identity Management Authentication and Access Control',
      'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
      'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-11-03T22:03:49Z',
    generation: 1,
    labels: {
      'policy.open-cluster-management.io/cluster-name': 'cluster1',
      'policy.open-cluster-management.io/cluster-namespace': 'cluster1',
      'policy.open-cluster-management.io/root-policy': 'default.test-policy',
    },
    managedFields: [
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:annotations': {
              '.': {},
              'f:policy.open-cluster-management.io/categories': {},
              'f:policy.open-cluster-management.io/controls': {},
              'f:policy.open-cluster-management.io/standards': {},
            },
            'f:labels': {
              '.': {},
              'f:policy.open-cluster-management.io/cluster-name': {},
              'f:policy.open-cluster-management.io/cluster-namespace': {},
              'f:policy.open-cluster-management.io/root-policy': {},
            },
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"0799c99e-de36-4899-9733-818e23e2cab3"}': {
                '.': {},
                'f:apiVersion': {},
                'f:blockOwnerDeletion': {},
                'f:controller': {},
                'f:kind': {},
                'f:name': {},
                'f:uid': {},
              },
            },
          },
          'f:spec': {
            '.': {},
            'f:disabled': {},
            'f:policy-templates': {},
            'f:remediationAction': {},
          },
        },
        manager: 'governance-policy-propagator',
        operation: 'Update',
        time: '2020-11-03T22:03:49Z',
      },
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:status': {
            '.': {},
            'f:compliant': {},
            'f:details': {},
          },
        },
        manager: 'governance-policy-status-sync',
        operation: 'Update',
        time: '2020-11-03T22:04:06Z',
      },
    ],
    name: 'default.test-policy',
    namespace: 'cluster1',
    ownerReferences: [
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'Policy',
        name: 'test-policy',
        uid: '0799c99e-de36-4899-9733-818e23e2cab3',
      },
    ],
    resourceVersion: '27822692',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/default.test-policy',
    uid: '4bf41f90-3dc4-4e87-84ae-4bede862c9b8',
  },
  spec: {
    disabled: false,
    'policy-templates': [
      {
        objectDefinition: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'ConfigurationPolicy',
          metadata: {
            name: 'test-policy-sample-role',
          },
          spec: {
            namespaceSelector: {
              exclude: [
                'kube-*',
              ],
              include: [
                'default',
              ],
            },
            'object-templates': [
              {
                complianceType: 'mustonlyhave',
                objectDefinition: {
                  apiVersion: 'rbac.authorization.k8s.io/v1',
                  kind: 'Role',
                  metadata: {
                    name: 'sample-role',
                  },
                  rules: [
                    {
                      apiGroups: [
                        'extensions',
                        'apps',
                      ],
                      resources: [
                        'deployments',
                      ],
                      verbs: [
                        'get',
                        'list',
                        'watch',
                        'delete',
                        'patch',
                      ],
                    },
                  ],
                },
              },
            ],
            remediationAction: 'inform',
            severity: 'high',
          },
        },
      },
    ],
    remediationAction: 'inform',
  },
  status: {
    compliant: 'NonCompliant',
    details: [
      {
        compliant: 'NonCompliant',
        history: [
          {
            eventName: 'default.test-policy.16441ea19722fbf8',
            lastTimestamp: '2020-11-03T22:04:06Z',
            message: 'NonCompliant; violation - roles `sample-role` does not exist as specified',
          },
          {
            eventName: 'default.test-policy.164415c7210a573c',
            lastTimestamp: '2020-11-03T19:21:52Z',
            message: 'NonCompliant; violation - roles `sample-role` does not exist as specified',
          },
        ],
        templateMeta: {
          creationTimestamp: null,
          name: 'test-policy-sample-role',
        },
      },
    ],
  },
};

export const mockSinglePolicyHubResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'policy.open-cluster-management.io/categories': 'PR.AC Identity Management Authentication and Access Control',
      'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
      'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-11-03T22:03:49Z',
    generation: 1,
    labels: {
      'policy.open-cluster-management.io/cluster-name': 'local-cluster',
      'policy.open-cluster-management.io/cluster-namespace': 'local-cluster',
      'policy.open-cluster-management.io/root-policy': 'default.test-policy',
    },
    managedFields: [
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:annotations': {
              '.': {},
              'f:policy.open-cluster-management.io/categories': {},
              'f:policy.open-cluster-management.io/controls': {},
              'f:policy.open-cluster-management.io/standards': {},
            },
            'f:labels': {
              '.': {},
              'f:policy.open-cluster-management.io/cluster-name': {},
              'f:policy.open-cluster-management.io/cluster-namespace': {},
              'f:policy.open-cluster-management.io/root-policy': {},
            },
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"0799c99e-de36-4899-9733-818e23e2cab3"}': {
                '.': {},
                'f:apiVersion': {},
                'f:blockOwnerDeletion': {},
                'f:controller': {},
                'f:kind': {},
                'f:name': {},
                'f:uid': {},
              },
            },
          },
          'f:spec': {
            '.': {},
            'f:disabled': {},
            'f:policy-templates': {},
            'f:remediationAction': {},
          },
        },
        manager: 'governance-policy-propagator',
        operation: 'Update',
        time: '2020-11-03T22:03:49Z',
      },
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:status': {
            '.': {},
            'f:compliant': {},
            'f:details': {},
          },
        },
        manager: 'governance-policy-status-sync',
        operation: 'Update',
        time: '2020-11-03T22:04:10Z',
      },
    ],
    name: 'default.test-policy',
    namespace: 'local-cluster',
    ownerReferences: [
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'Policy',
        name: 'test-policy',
        uid: '0799c99e-de36-4899-9733-818e23e2cab3',
      },
    ],
    resourceVersion: '27822741',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/local-cluster/policies/default.test-policy',
    uid: 'e260b15f-571c-410e-b103-d18d251f7aec',
  },
  spec: {
    disabled: false,
    'policy-templates': [
      {
        objectDefinition: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'ConfigurationPolicy',
          metadata: {
            name: 'test-policy-sample-role',
          },
          spec: {
            namespaceSelector: {
              exclude: [
                'kube-*',
              ],
              include: [
                'default',
              ],
            },
            'object-templates': [
              {
                complianceType: 'mustonlyhave',
                objectDefinition: {
                  apiVersion: 'rbac.authorization.k8s.io/v1',
                  kind: 'Role',
                  metadata: {
                    name: 'sample-role',
                  },
                  rules: [
                    {
                      apiGroups: [
                        'extensions',
                        'apps',
                      ],
                      resources: [
                        'deployments',
                      ],
                      verbs: [
                        'get',
                        'list',
                        'watch',
                        'delete',
                        'patch',
                      ],
                    },
                  ],
                },
              },
            ],
            remediationAction: 'inform',
            severity: 'high',
          },
        },
      },
    ],
    remediationAction: 'inform',
  },
  status: {
    compliant: 'NonCompliant',
    details: [
      {
        compliant: 'NonCompliant',
        history: [
          {
            eventName: 'default.test-policy.16441ea291fd8454',
            lastTimestamp: '2020-11-03T22:04:10Z',
            message: 'NonCompliant; violation - roles `sample-role` does not exist as specified',
          },
          {
            eventName: 'default.test-policy.164415c9476804ef',
            lastTimestamp: '2020-11-03T19:22:01Z',
            message: 'NonCompliant; violation - roles `sample-role` does not exist as specified',
          },
        ],
        templateMeta: {
          creationTimestamp: null,
          name: 'test-policy-sample-role',
        },
      },
    ],
  },
};

export const mockPolicyListResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'PolicyList',
  metadata: {
    continue: '',
    resourceVersion: '17800255',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/',
  },
  items: [
    {
      apiVersion: 'policy.open-cluster-management.io/v1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'PR.AC Identity Management Authentication and Access Control',
          'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
          'policy.open-cluster-management.io/standards': 'NIST-CSF',
        },
        creationTimestamp: '2020-11-03T22:03:49Z',
        generation: 1,
        labels: {
          'policy.open-cluster-management.io/cluster-name': 'cluster1',
          'policy.open-cluster-management.io/cluster-namespace': 'cluster1',
          'policy.open-cluster-management.io/root-policy': 'default.test-policy',
        },
        managedFields: [
          {
            apiVersion: 'policy.open-cluster-management.io/v1',
            fieldsType: 'FieldsV1',
            fieldsV1: {
              'f:metadata': {
                'f:annotations': {
                  '.': {},
                  'f:policy.open-cluster-management.io/categories': {},
                  'f:policy.open-cluster-management.io/controls': {},
                  'f:policy.open-cluster-management.io/standards': {},
                },
                'f:labels': {
                  '.': {},
                  'f:policy.open-cluster-management.io/cluster-name': {},
                  'f:policy.open-cluster-management.io/cluster-namespace': {},
                  'f:policy.open-cluster-management.io/root-policy': {},
                },
                'f:ownerReferences': {
                  '.': {},
                  'k:{"uid":"0799c99e-de36-4899-9733-818e23e2cab3"}': {
                    '.': {},
                    'f:apiVersion': {},
                    'f:blockOwnerDeletion': {},
                    'f:controller': {},
                    'f:kind': {},
                    'f:name': {},
                    'f:uid': {},
                  },
                },
              },
              'f:spec': {
                '.': {},
                'f:disabled': {},
                'f:policy-templates': {},
                'f:remediationAction': {},
              },
            },
            manager: 'governance-policy-propagator',
            operation: 'Update',
            time: '2020-11-03T22:03:49Z',
          },
          {
            apiVersion: 'policy.open-cluster-management.io/v1',
            fieldsType: 'FieldsV1',
            fieldsV1: {
              'f:status': {
                '.': {},
                'f:compliant': {},
                'f:details': {},
              },
            },
            manager: 'governance-policy-status-sync',
            operation: 'Update',
            time: '2020-11-03T22:04:06Z',
          },
        ],
        name: 'default.test-policy',
        namespace: 'cluster1',
        ownerReferences: [
          {
            apiVersion: 'policy.open-cluster-management.io/v1',
            blockOwnerDeletion: true,
            controller: true,
            kind: 'Policy',
            name: 'test-policy',
            uid: '0799c99e-de36-4899-9733-818e23e2cab3',
          },
        ],
        resourceVersion: '27822692',
        selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/default.test-policy',
        uid: '4bf41f90-3dc4-4e87-84ae-4bede862c9b8',
      },
      spec: {
        disabled: false,
        'policy-templates': [
          {
            objectDefinition: {
              apiVersion: 'policy.open-cluster-management.io/v1',
              kind: 'ConfigurationPolicy',
              metadata: {
                name: 'test-policy-sample-role',
              },
              spec: {
                namespaceSelector: {
                  exclude: [
                    'kube-*',
                  ],
                  include: [
                    'default',
                  ],
                },
                'object-templates': [
                  {
                    complianceType: 'mustonlyhave',
                    objectDefinition: {
                      apiVersion: 'rbac.authorization.k8s.io/v1',
                      kind: 'Role',
                      metadata: {
                        name: 'sample-role',
                      },
                      rules: [
                        {
                          apiGroups: [
                            'extensions',
                            'apps',
                          ],
                          resources: [
                            'deployments',
                          ],
                          verbs: [
                            'get',
                            'list',
                            'watch',
                            'delete',
                            'patch',
                          ],
                        },
                      ],
                    },
                  },
                ],
                remediationAction: 'inform',
                severity: 'high',
              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        compliant: 'NonCompliant',
        details: [
          {
            compliant: 'NonCompliant',
            history: [
              {
                eventName: 'default.test-policy.16441ea19722fbf8',
                lastTimestamp: '2020-11-03T22:04:06Z',
                message: 'NonCompliant; violation - roles `sample-role` does not exist as specified',
              },
              {
                eventName: 'default.test-policy.164415c7210a573c',
                lastTimestamp: '2020-11-03T19:21:52Z',
                message: 'NonCompliant; violation - roles `sample-role` does not exist as specified',
              },
            ],
            templateMeta: {
              creationTimestamp: null,
              name: 'test-policy-sample-role',
            },
          },
        ],
      },
    },
  ],
};

export const mockPolicyListResponseLocalCluster = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'PolicyList',
  metadata: {
    continue: '',
    resourceVersion: '27834208',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/local-cluster/policies/',
  },
  items: [
    {
      apiVersion: 'policy.open-cluster-management.io/v1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'PR.AC Identity Management Authentication and Access Control',
          'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
          'policy.open-cluster-management.io/standards': 'NIST-CSF',
        },
        creationTimestamp: '2020-11-03T22:03:49Z',
        generation: 1,
        labels: {
          'policy.open-cluster-management.io/cluster-name': 'local-cluster',
          'policy.open-cluster-management.io/cluster-namespace': 'local-cluster',
          'policy.open-cluster-management.io/root-policy': 'default.test-policy',
        },
        managedFields: [
          {
            apiVersion: 'policy.open-cluster-management.io/v1',
            fieldsType: 'FieldsV1',
            fieldsV1: {
              'f:metadata': {
                'f:annotations': {
                  '.': {},
                  'f:policy.open-cluster-management.io/categories': {},
                  'f:policy.open-cluster-management.io/controls': {},
                  'f:policy.open-cluster-management.io/standards': {},
                },
                'f:labels': {
                  '.': {},
                  'f:policy.open-cluster-management.io/cluster-name': {},
                  'f:policy.open-cluster-management.io/cluster-namespace': {},
                  'f:policy.open-cluster-management.io/root-policy': {},
                },
                'f:ownerReferences': {
                  '.': {},
                  'k:{"uid":"0799c99e-de36-4899-9733-818e23e2cab3"}': {
                    '.': {},
                    'f:apiVersion': {},
                    'f:blockOwnerDeletion': {},
                    'f:controller': {},
                    'f:kind': {},
                    'f:name': {},
                    'f:uid': {},
                  },
                },
              },
              'f:spec': {
                '.': {},
                'f:disabled': {},
                'f:policy-templates': {},
                'f:remediationAction': {},
              },
            },
            manager: 'governance-policy-propagator',
            operation: 'Update',
            time: '2020-11-03T22:03:49Z',
          },
          {
            apiVersion: 'policy.open-cluster-management.io/v1',
            fieldsType: 'FieldsV1',
            fieldsV1: {
              'f:status': {
                '.': {},
                'f:compliant': {},
                'f:details': {},
              },
            },
            manager: 'governance-policy-status-sync',
            operation: 'Update',
            time: '2020-11-03T22:04:10Z',
          },
        ],
        name: 'default.test-policy',
        namespace: 'local-cluster',
        ownerReferences: [
          {
            apiVersion: 'policy.open-cluster-management.io/v1',
            blockOwnerDeletion: true,
            controller: true,
            kind: 'Policy',
            name: 'test-policy',
            uid: '0799c99e-de36-4899-9733-818e23e2cab3',
          },
        ],
        resourceVersion: '27822741',
        selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/local-cluster/policies/default.test-policy',
        uid: 'e260b15f-571c-410e-b103-d18d251f7aec',
      },
      spec: {
        disabled: false,
        'policy-templates': [
          {
            objectDefinition: {
              apiVersion: 'policy.open-cluster-management.io/v1',
              kind: 'ConfigurationPolicy',
              metadata: {
                name: 'test-policy-sample-role',
              },
              spec: {
                namespaceSelector: {
                  exclude: [
                    'kube-*',
                  ],
                  include: [
                    'default',
                  ],
                },
                'object-templates': [
                  {
                    complianceType: 'mustonlyhave',
                    objectDefinition: {
                      apiVersion: 'rbac.authorization.k8s.io/v1',
                      kind: 'Role',
                      metadata: {
                        name: 'sample-role',
                      },
                      rules: [
                        {
                          apiGroups: [
                            'extensions',
                            'apps',
                          ],
                          resources: [
                            'deployments',
                          ],
                          verbs: [
                            'get',
                            'list',
                            'watch',
                            'delete',
                            'patch',
                          ],
                        },
                      ],
                    },
                  },
                ],
                remediationAction: 'inform',
                severity: 'high',
              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        compliant: 'NonCompliant',
        details: [
          {
            compliant: 'NonCompliant',
            history: [
              {
                eventName: 'default.test-policy.16441ea291fd8454',
                lastTimestamp: '2020-11-03T22:04:10Z',
                message: 'NonCompliant; violation - roles `sample-role` does not exist as specified',
              },
              {
                eventName: 'default.test-policy.164415c9476804ef',
                lastTimestamp: '2020-11-03T19:22:01Z',
                message: 'NonCompliant; violation - roles `sample-role` does not exist as specified',
              },
            ],
            templateMeta: {
              creationTimestamp: null,
              name: 'test-policy-sample-role',
            },
          },
        ],
      },
    },
  ],
};

export const mockSinglePolicyResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'policy.open-cluster-management.io/categories': 'PR.AC Identity Management Authentication and Access Control',
      'policy.open-cluster-management.io/controls': 'PR.AC-4 Access Control',
      'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-11-03T19:21:39Z',
    generation: 3,
    managedFields: [
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:status': {
            '.': {},
            'f:placement': {},
            'f:status': {},
          },
        },
        manager: 'governance-policy-propagator',
        operation: 'Update',
        time: '2020-11-03T22:03:49Z',
      },
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:annotations': {
              '.': {},
              'f:policy.open-cluster-management.io/categories': {},
              'f:policy.open-cluster-management.io/controls': {},
              'f:policy.open-cluster-management.io/standards': {},
            },
          },
          'f:spec': {
            '.': {},
            'f:disabled': {},
            'f:policy-templates': {},
            'f:remediationAction': {},
          },
        },
        manager: 'unknown',
        operation: 'Update',
        time: '2020-11-03T22:03:49Z',
      },
    ],
    name: 'test-policy',
    namespace: 'default',
    resourceVersion: '27822459',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/test-policy',
    uid: '0799c99e-de36-4899-9733-818e23e2cab3',
  },
  spec: {
    disabled: false,
    'policy-templates': [
      {
        objectDefinition: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'ConfigurationPolicy',
          metadata: {
            name: 'test-policy-sample-role',
          },
          spec: {
            namespaceSelector: {
              exclude: [
                'kube-*',
              ],
              include: [
                'default',
              ],
            },
            'object-templates': [
              {
                complianceType: 'mustonlyhave',
                objectDefinition: {
                  apiVersion: 'rbac.authorization.k8s.io/v1',
                  kind: 'Role',
                  metadata: {
                    name: 'sample-role',
                  },
                  rules: [
                    {
                      apiGroups: [
                        'extensions',
                        'apps',
                      ],
                      resources: [
                        'deployments',
                      ],
                      verbs: [
                        'get',
                        'list',
                        'watch',
                        'delete',
                        'patch',
                      ],
                    },
                  ],
                },
              },
            ],
            remediationAction: 'inform',
            severity: 'high',
          },
        },
      },
    ],
    remediationAction: 'inform',
  },
  status: {
    placement: [
      {
        placementBinding: 'binding-test-policy',
        placementRule: 'placement-test-policy',
      },
    ],
    status: [
      {
        clustername: 'local-cluster',
        clusternamespace: 'local-cluster',
        compliant: 'NonCompliant',
      },
      {
        clustername: 'cluster1',
        clusternamespace: 'cluster1',
        compliant: 'NonCompliant',
      },
    ],
  },
};

export const mockSingleNoPolicyResponse = {
  kind: 'Status',
  apiVersion: 'v1',
  metadata: {

  },
  status: 'Failure',
  message: 'policies.policy.open-cluster-management.io "compliance-xz" not found',
  reason: 'NotFound',
  details: {
    name: 'compliance-xz',
    group: 'policy.open-cluster-management.io',
    kind: 'policies',
  },
  code: 404,
};

export const mockCreatePolicy = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    creationTimestamp: '2018-09-06T17:12:34Z',
    generation: 1,
    name: 'test-policy',
    namespace: 'default',
    resourceVersion: '4385854',
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies/test-policy`,
    uid: '0c388331-b1f8-11e8-9a12-005056a0d11b',
  },
  spec: {
    namespaces: {
      exclude: [
        'kube*',
      ],
      include: [
        'default',
      ],
    },
    remediationAction: 'enforce',
    'role-templates': [
      {
        apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
        complianceType: 'musthave',
        kind: 'RoleTemplate',
        metadata: {
          name: 'test-role',
          namespace: 'default',
        },
        rules: [
          {
            PolicyRule: {
              apiGroups: [
                'extensions',
                'apps',
              ],
              resources: [
                'deployments',
              ],
              verbs: [
                'get',
                'list',
                'watch',
                'delete',
              ],
            },
            complianceType: 'musthave',
          },
          {
            PolicyRule: {
              apiGroups: [
                'core',
              ],
              resources: [
                'pods',
              ],
              verbs: [
                'create',
                'update',
                'patch',
              ],
            },
            complianceType: 'mustnothave',
          },
          {
            PolicyRule: {
              apiGroups: [
                'core',
              ],
              resources: [
                'secrets',
              ],
              verbs: [
                'get',
                'watch',
                'list',
                'create',
                'delete',
                'update',
                'patch',
              ],
            },
          },
        ],
        selector: {
          matchLabels: {
            cloud: 'IBM',
          },
        },
      },
    ],
  },
};

export const mockPlacementRuleResponse = {
  kind: 'PlacementRuleList',
  apiVersion: 'apps.open-cluster-management.io/v1',
  metadata: {
    selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementrules`,
    resourceVersion: '51490',
  },
  items: [
    {
      metadata: {
        name: 'placement-xz',
        namespace: 'policy-namespace',
        selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementrules/placement-xz`,
        uid: '3df1e8f5-1053-11e9-a535-e2d4c161f9ad',
        resourceVersion: '51486',
        creationTimestamp: '2019-01-04T19:02:11Z',
        annotations: {
          'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
        },
      },
      spec: {
        clusterSelector: {
          matchLabels: {
            cloud: 'IBM',
          },
        },
        resourceHint: {

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

export const mockPlacementBindingResponse = {
  kind: 'PlacementBindingList',
  apiVersion: 'policy.open-cluster-management.io/v1',
  metadata: {
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementbindings`,
    resourceVersion: '48564',
  },
  items: [
    {
      metadata: {
        name: 'binding-xz',
        namespace: 'policy-namespace',
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/placementbindings/binding-xz`,
        uid: '7fc24685-0ec6-11e9-a535-e2d4c161f9ad',
        resourceVersion: '249',
        creationTimestamp: '2019-01-02T19:42:12Z',
        annotations: {
          'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
          'seed-generation': '1',
        },
        finalizers: [
          'finalizer.mcm.ibm.com',
        ],
      },
      subjects: [
        {
          kind: 'Compliance',
          name: 'compliance-all',
        },
      ],
      placementRef: {
        name: 'placement-xz',
      },
    },
  ],
};

export const mockDeletePolicyResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    creationTimestamp: '2018-09-06T15:06:23Z',
    deletionGracePeriodSeconds: 0,
    deletionTimestamp: '2018-09-06T15:09:33Z',
    finalizers: [
      'finalizer.mcm.ibm.com',
    ],
    generation: 2,
    name: 'test-policy',
    namespace: 'default',
    resourceVersion: '4348453',
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies/test-policy`,
    uid: '6b4cc90c-b1e6-11e8-9a12-005056a0d11b',
  },
  spec: {
    complianceType: '',
    namespaces: {
      exclude: [
        'kube*',
      ],
      include: [
        'default',
      ],
    },
    remediationAction: 'enforce',
    'role-templates': [
      {
        apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
        complianceType: 'musthave',
        kind: 'RoleTemplate',
        metadata: {
          creationTimestamp: null,
          name: 'test-role',
        },
        rules: [
          {
            complianceType: 'musthave',
            policyRule: {
              apiGroups: [
                'extensions',
                'apps',
              ],
              resources: [
                'deployments',
              ],
              verbs: [
                'get',
                'list',
                'watch',
                'delete',
              ],
            },
          },
          {
            complianceType: 'mustnothave',
            policyRule: {
              apiGroups: [
                'core',
              ],
              resources: [
                'pods',
              ],
              verbs: [
                'create',
                'update',
                'patch',
              ],
            },
          },
          {
            complianceType: 'musthave',
            policyRule: {
              apiGroups: [
                'core',
              ],
              resources: [
                'secrets',
              ],
              verbs: [
                'get',
                'watch',
                'list',
                'create',
                'delete',
                'update',
                'patch',
              ],
            },
          },
        ],
        selector: {
          matchLabels: {
            cloud: 'IBM',
          },
        },
        status: {
          Compliant: 'Compliant',
          Validity: {
            valid: true,
          },
          conditions: [
            {
              lastTransitionTime: '2018-09-06T15:06:24Z',
              message: 'k8s RBAC role "test-role" was missing ',
              reason: 'K8s RBAC role created',
              status: 'True',
              type: 'completed',
            },
          ],
        },
      },
    ],
  },
  status: {
    Compliant: 'Compliant',
    Valid: true,
  },
};

export const mockNewAPISinglePolicyResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"PR.DS DataSecurity","policy.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policy.open-cluster-management.io/standards":"NIST-CSF"},"name":"case1-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case1-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system"],"include":["default"]},"remediationAction":"inform","severity":"low"}}}],"remediationAction":"inform"}}\n', 'policy.open-cluster-management.io/categories': 'PR.DS DataSecurity', 'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit', 'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-05-17T22:56:03Z',
    generation: 1,
    labels: { 'cluster-name': 'cluster1', 'cluster-namespace': 'cluster1', 'root-policy': 'default.case1-test-policy' },
    name: 'default.case1-test-policy',
    namespace: 'cluster1',
    ownerReferences: [{
      apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'case1-test-policy', uid: 'e919bf5c-df16-4b90-ae01-a39da7138623',
    }],
    resourceVersion: '27550274',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/default.case1-test-policy',
    uid: 'fcaf4465-0530-47e5-bbd6-b19c3b28699a',
  },
  spec: {
    disabled: false,
    'policy-templates': [{
      objectDefinition: {
        apiVersion: 'policies.ibm.com/v1alpha1',
        kind: 'TrustedContainerPolicy',
        metadata: { name: 'case1-test-policy-trustedcontainerpolicy' },
        spec: {
          imageRegistry: 'quay.io', namespaceSelector: { exclude: ['kube-system'], include: ['default'] }, remediationAction: 'inform', severity: 'low',
        },
      },
    }],
    remediationAction: 'inform',
  },
};

export const mockStatusHistoryResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology',
      'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality',
      'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-09-16T19:04:46Z',
    generation: 1,
    labels: {
      'policy.open-cluster-management.io/cluster-name': 'cluster1',
      'policy.open-cluster-management.io/cluster-namespace': 'cluster1',
      'policy.open-cluster-management.io/root-policy': 'default.policy-pod',
    },
    name: 'default.policy-pod',
    namespace: 'cluster1',
    ownerReferences: [
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'Policy',
        name: 'policy-pod',
        uid: 'f48b3f56-f13a-4fe3-a0bd-50bb2911b42c',
      },
    ],
    resourceVersion: '57233305',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/default.policy-pod',
    uid: 'ebde3a7a-3e0e-4e97-8f34-aa0149b8c2bc',
  },
  spec: {
    disabled: false,
    'policy-templates': [
      {
        objectDefinition: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'ConfigurationPolicy',
          metadata: {
            name: 'policy-pod-sample-nginx-pod',
          },
          spec: {
            namespaceSelector: {
              exclude: [
                'kube-*',
              ],
              include: [
                'default',
              ],
            },
            'object-templates': [
              {
                complianceType: 'musthave',
                objectDefinition: {
                  apiVersion: 'v1',
                  kind: 'Pod',
                  metadata: {
                    name: 'sample-nginx-pod',
                  },
                  spec: {
                    containers: [
                      {
                        image: 'nginx:1.7.9',
                        name: 'nginx',
                        ports: [
                          {
                            containerPort: 80,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            remediationAction: 'inform',
            severity: 'low',
          },
        },
      },
    ],
    remediationAction: 'inform',
  },
  status: {
    compliant: 'Compliant',
    details: [
      {
        compliant: 'Compliant',
        history: [
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-16T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
        ],
        templateMeta: {
          creationTimestamp: null,
          name: 'policy-pod-sample-nginx-pod',
        },
      },
    ],
  },
};

export const mockStatusHistoryResponseNoHistory = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology',
      'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality',
      'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-09-16T19:04:46Z',
    generation: 1,
    labels: {
      'policy.open-cluster-management.io/cluster-name': 'cluster1',
      'policy.open-cluster-management.io/cluster-namespace': 'cluster1',
      'policy.open-cluster-management.io/root-policy': 'default.policy-pod',
    },
    name: 'default.policy-pod',
    namespace: 'cluster1',
    ownerReferences: [
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'Policy',
        name: 'policy-pod',
        uid: 'f48b3f56-f13a-4fe3-a0bd-50bb2911b42c',
      },
    ],
    resourceVersion: '57233305',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/default.policy-pod',
    uid: 'ebde3a7a-3e0e-4e97-8f34-aa0149b8c2bc',
  },
  spec: {
    disabled: false,
    'policy-templates': [
      {
        objectDefinition: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'ConfigurationPolicy',
          metadata: {
            name: 'policy-pod-sample-nginx-pod',
          },
          spec: {
            namespaceSelector: {
              exclude: [
                'kube-*',
              ],
              include: [
                'default',
              ],
            },
            'object-templates': [
              {
                complianceType: 'musthave',
                objectDefinition: {
                  apiVersion: 'v1',
                  kind: 'Pod',
                  metadata: {
                    name: 'sample-nginx-pod',
                  },
                  spec: {
                    containers: [
                      {
                        image: 'nginx:1.7.9',
                        name: 'nginx',
                        ports: [
                          {
                            containerPort: 80,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            remediationAction: 'inform',
            severity: 'low',
          },
        },
      },
    ],
    remediationAction: 'inform',
  },
  status: {
    compliant: 'Compliant',
    details: [
      {
        compliant: 'Compliant',
        history: [
        ],
        templateMeta: {
          creationTimestamp: null,
          name: 'policy-pod-sample-nginx-pod',
        },
      },
    ],
  },
};

export const mockStatusHistoryResponseLong = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'policy.open-cluster-management.io/categories': 'PR.PT Protective Technology',
      'policy.open-cluster-management.io/controls': 'PR.PT-3 Least Functionality',
      'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-09-16T19:04:46Z',
    generation: 1,
    labels: {
      'policy.open-cluster-management.io/cluster-name': 'cluster1',
      'policy.open-cluster-management.io/cluster-namespace': 'cluster1',
      'policy.open-cluster-management.io/root-policy': 'default.policy-pod',
    },
    name: 'default.policy-pod',
    namespace: 'cluster1',
    ownerReferences: [
      {
        apiVersion: 'policy.open-cluster-management.io/v1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'Policy',
        name: 'policy-pod',
        uid: 'f48b3f56-f13a-4fe3-a0bd-50bb2911b42c',
      },
    ],
    resourceVersion: '57233305',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/cluster1/policies/default.policy-pod',
    uid: 'ebde3a7a-3e0e-4e97-8f34-aa0149b8c2bc',
  },
  spec: {
    disabled: false,
    'policy-templates': [
      {
        objectDefinition: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'ConfigurationPolicy',
          metadata: {
            name: 'policy-pod-sample-nginx-pod',
          },
          spec: {
            namespaceSelector: {
              exclude: [
                'kube-*',
              ],
              include: [
                'default',
              ],
            },
            'object-templates': [
              {
                complianceType: 'musthave',
                objectDefinition: {
                  apiVersion: 'v1',
                  kind: 'Pod',
                  metadata: {
                    name: 'sample-nginx-pod',
                  },
                  spec: {
                    containers: [
                      {
                        image: 'nginx:1.7.9',
                        name: 'nginx',
                        ports: [
                          {
                            containerPort: 80,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            remediationAction: 'inform',
            severity: 'low',
          },
        },
      },
    ],
    remediationAction: 'inform',
  },
  status: {
    compliant: 'Compliant',
    details: [
      {
        compliant: 'Compliant',
        history: [
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-16T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-15T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-14T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-13T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-12T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-11T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-10T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-09T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-08T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-07T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
          {
            eventName: 'default.policy-pod.16355900f2b0bb54',
            lastTimestamp: '2020-09-06T19:05:03Z',
            message: 'Compliant; notification - pods [sample-nginx-pod] in namespace default exist as specified, therefore this Object template is compliant',
          },
        ],
        templateMeta: {
          creationTimestamp: null,
          name: 'policy-pod-sample-nginx-pod',
        },
      },
    ],
  },
};
