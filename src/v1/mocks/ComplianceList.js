/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import ApiURL from '../lib/ApiURL';

export const mockComplianceListDefaultResponse = {
  apiVersion: 'policy.mcm.ibm.com/v1alpha1',
  items: ['Just default it!'],
  kind: 'PolicyList',
  metadata: {
    continue: '',
    resourceVersion: '10793978',
    selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/default/policies`,
  },
};

export const mockComplianceListKubeSystemResponse = {
  apiVersion: 'policy.mcm.ibm.com/v1alpha1',
  items: [],
  kind: 'PolicyList',
  metadata: {
    continue: '',
    resourceVersion: '10794564',
    selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/kube-system/policies`,
  },
};

export const mockComplianceListMCMResponse = {
  apiVersion: 'policy.mcm.ibm.com/v1alpha1',
  items: [
    {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'SystemAndInformationIntegrity',
          'policy.mcm.ibm.com/controls': 'CertManager',
          'policy.mcm.ibm.com/standards': 'FISMA, PCI',
          'seed-generation': '1',
        },
        creationTimestamp: '2019-09-03T18:34:05Z',
        finalizers: [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 24,
        name: 'policy-certificatepolicy',
        namespace: 'mcm',
        resourceVersion: '3666045',
        selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies/policy-certificatepolicy`,
        uid: '68d772b1-ce79-11e9-a1ed-005056a0b88e',
      },
      spec: {
        complianceType: 'musthave',
        namespaces: {
          exclude: [
            'kube-*',
          ],
          include: [
            'default',
          ],
        },
        'policy-templates': [
          {
            objectDefinition: {
              apiVersion: 'policies.ibm.com/v1alpha1',
              kind: 'CertificatePolicy',
              metadata: {
                label: {
                  category: 'System-Integrity',
                },
                name: 'certificate-policy-example',
              },
              spec: {
                minimumDuration: '300h',
                namespaceSelector: {
                  exclude: [

                  ],
                  include: [
                    'default',
                  ],
                },
                remediationAction: 'inform',
                severity: 'low',
              },
            },
            status: {
              Validity: {

              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        placementBindings: [
          'binding-policy-certificatepolicy',
        ],
        placementPolicies: [
          'placement-policy-certificatepolicy',
        ],
        status: {
          cluster1: {
            aggregatePoliciesStatus: {
              'policy-certificatepolicy': {
                compliant: 'Compliant',
              },
            },
            clustername: 'cluster1',
            compliant: 'Compliant',
          },
          clusterhub: {
            aggregatePoliciesStatus: {
              'policy-certificatepolicy': {
                compliant: 'Compliant',
              },
            },
            clustername: 'clusterhub',
            compliant: 'Compliant',
          },
        },
      },
    },
    {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'SystemAndCommunicationsProtections',
          'policy.mcm.ibm.com/controls': 'MutationAdvisor',
          'policy.mcm.ibm.com/standards': 'FISMA',
        },
        creationTimestamp: '2019-08-30T14:58:31Z',
        finalizers: [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 22,
        name: 'policy-iampolicy',
        namespace: 'mcm',
        resourceVersion: '3664798',
        selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies/policy-iampolicy`,
        uid: 'a18d825a-cb36-11e9-a1eb-005056a0b88e',
      },
      spec: {
        complianceType: 'musthave',
        namespaces: {
          exclude: [
            'kube-*',
          ],
          include: [
            'default',
          ],
        },
        'policy-templates': [
          {
            objectDefinition: {
              apiVersion: 'iam.policies.ibm.com/v1alpha1',
              kind: 'IamPolicy',
              metadata: {
                label: {
                  category: 'System-Integrity',
                },
                name: 'iam-policy-example',
              },
              spec: {
                maxClusterRoleBindingUsers: 5,
                maxRoleBindingViolationsPerNamespace: 2,
                namespaceSelector: {
                  exclude: [
                    'kube-system',
                  ],
                  include: [
                    'default',
                    'kube-*',
                  ],
                },
                remediationAction: 'inform',
                severity: 'medium',
              },
            },
            status: {
              Validity: {

              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        placementBindings: [
          'binding-policy-iampolicy',
        ],
        placementPolicies: [
          'placement-policy-iampolicy',
        ],
        status: {
          cluster1: {
            aggregatePoliciesStatus: {
              'policy-iampolicy': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'cluster1',
            compliant: 'NonCompliant',
          },
          clusterhub: {
            aggregatePoliciesStatus: {
              'policy-iampolicy': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'clusterhub',
            compliant: 'NonCompliant',
          },
        },
      },
    },
    {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'SystemAndCommunicationsProtections',
          'policy.mcm.ibm.com/controls': 'VA',
          'policy.mcm.ibm.com/standards': 'FISMA',
          'seed-generation': '4',
        },
        creationTimestamp: '2019-08-30T13:46:19Z',
        finalizers: [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 27,
        name: 'policy-image',
        namespace: 'mcm',
        resourceVersion: '3459900',
        selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies/policy-image`,
        uid: '8be1a627-cb2c-11e9-a1eb-005056a0b88e',
      },
      spec: {
        complianceType: 'musthave',
        namespaces: {
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
              apiVersion: 'securityenforcement.admission.cloud.ibm.com/v1beta1',
              kind: 'ClusterImagePolicy',
              metadata: {
                name: 'mongo',
              },
              spec: {
                repositories: [
                  {
                    name: 'docker.io/mongo',
                  },
                ],
              },
            },
            status: {
              Validity: {

              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        placementBindings: [
          'binding-policy-image',
        ],
        placementPolicies: [
          'placement-policy-image',
        ],
        status: {
          cluster1: {
            aggregatePoliciesStatus: {
              'policy-image': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'cluster1',
            compliant: 'NonCompliant',
          },
          clusterhub: {
            aggregatePoliciesStatus: {
              'policy-image': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'clusterhub',
            compliant: 'NonCompliant',
          },
        },
      },
    },
    {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'SystemAndCommunicationsProtections',
          'policy.mcm.ibm.com/controls': 'CertManager',
          'policy.mcm.ibm.com/standards': 'HIPAA',
          'seed-generation': '1',
        },
        creationTimestamp: '2019-09-04T16:27:02Z',
        finalizers: [
          'propagator.finalizer.mcm.ibm.com',
          'finalizer.policies.ibm.com',
        ],
        generation: 7,
        name: 'policy-limitrange',
        namespace: 'mcm',
        resourceVersion: '3489357',
        selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies/policy-limitrange`,
        uid: 'd358638d-cf30-11e9-a1ed-005056a0b88e',
      },
      spec: {
        complianceType: 'musthave',
        namespaces: {
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
              kind: 'LimitRange',
              metadata: {
                name: 'mem-limit-range',
              },
              spec: {
                limits: [
                  {
                    default: {
                      memory: '512Mi',
                    },
                    defaultRequest: {
                      memory: '256Mi',
                    },
                    type: 'Container',
                  },
                ],
              },
            },
            status: {
              Validity: {

              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        placementBindings: [
          'binding-policy-limitrange',
        ],
        placementPolicies: [
          'placement-policy-limitrange',
        ],
        status: {
          cluster1: {
            aggregatePoliciesStatus: {
              'policy-limitrange': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'cluster1',
            compliant: 'NonCompliant',
          },
          clusterhub: {
            aggregatePoliciesStatus: {
              'policy-limitrange': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'clusterhub',
            compliant: 'NonCompliant',
          },
        },
      },
    },
    {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'SystemAndCommunicationsProtections',
          'policy.mcm.ibm.com/controls': 'policy',
          'policy.mcm.ibm.com/standards': 'FISMA',
          'seed-generation': '1',
        },
        creationTimestamp: '2019-09-03T18:26:11Z',
        finalizers: [
          'propagator.finalizer.mcm.ibm.com',
          'finalizer.policies.ibm.com',
        ],
        generation: 22,
        name: 'policy-namespace',
        namespace: 'mcm',
        resourceVersion: '3665885',
        selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies/policy-namespace`,
        uid: '4e21e5e7-ce78-11e9-a1ed-005056a0b88e',
      },
      spec: {
        complianceType: 'musthave',
        namespaces: {
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
              kind: 'Namespace',
              metadata: {
                name: 'prod',
              },
            },
            status: {
              Validity: {

              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        placementBindings: [
          'binding-policy-namespace',
        ],
        placementPolicies: [
          'placement-policy-namespace',
        ],
        status: {
          cluster1: {
            aggregatePoliciesStatus: {
              'policy-namespace': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'cluster1',
            compliant: 'NonCompliant',
          },
          clusterhub: {
            aggregatePoliciesStatus: {
              'policy-namespace': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'clusterhub',
            compliant: 'NonCompliant',
          },
        },
      },
    },
    {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'SystemAndCommunicationsProtections',
          'policy.mcm.ibm.com/controls': 'MutationAdvisor',
          'policy.mcm.ibm.com/standards': 'FISMA',
          'seed-generation': '1',
        },
        creationTimestamp: '2019-09-05T18:16:29Z',
        finalizers: [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 7,
        name: 'policy-pod',
        namespace: 'mcm',
        resourceVersion: '3729666',
        selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies/policy-pod`,
        uid: '48316272-d009-11e9-a1ed-005056a0b88e',
      },
      spec: {
        complianceType: 'musthave',
        namespaces: {
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
                name: 'nginx-pod',
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
            status: {
              Validity: {

              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        placementBindings: [
          'binding-policy-pod',
        ],
        placementPolicies: [
          'placement-policy-pod',
        ],
        status: {
          cluster1: {
            aggregatePoliciesStatus: {
              'policy-pod': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'cluster1',
            compliant: 'NonCompliant',
          },
          clusterhub: {
            aggregatePoliciesStatus: {
              'policy-pod': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'clusterhub',
            compliant: 'NonCompliant',
          },
        },
      },
    },
    {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'SystemAndCommunicationsProtections',
          'policy.mcm.ibm.com/controls': 'MutationAdvisor',
          'policy.mcm.ibm.com/standards': 'FISMA',
          'seed-generation': '1',
        },
        creationTimestamp: '2019-09-04T13:08:49Z',
        finalizers: [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 25,
        name: 'policy-rolebinding-1',
        namespace: 'mcm',
        resourceVersion: '3665889',
        selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies/policy-rolebinding-1`,
        uid: '22ac9660-cf15-11e9-a1ed-005056a0b88e',
      },
      spec: {
        complianceType: 'musthave',
        namespaces: {
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
              apiVersion: 'rbac.authorization.k8s.io/v1',
              kind: 'RoleBinding',
              metadata: {
                name: 'operate-pods-rolebinding',
              },
              roleRef: {
                apiGroup: 'rbac.authorization.k8s.io',
                kind: 'Role',
                name: 'operator',
              },
              subjects: [
                {
                  apiGroup: 'rbac.authorization.k8s.io',
                  kind: 'User',
                  name: 'admin',
                },
              ],
            },
            status: {
              Validity: {

              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        placementBindings: [
          'binding-policy-rolebinding-1',
        ],
        placementPolicies: [
          'placement-policy-rolebinding-1',
        ],
        status: {
          cluster1: {
            aggregatePoliciesStatus: {
              'policy-rolebinding-1': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'cluster1',
            compliant: 'NonCompliant',
          },
          clusterhub: {
            aggregatePoliciesStatus: {
              'policy-rolebinding-1': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'clusterhub',
            compliant: 'NonCompliant',
          },
        },
      },
    },
    {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'SystemAndInformationIntegrity',
          'policy.mcm.ibm.com/controls': 'VA',
          'policy.mcm.ibm.com/standards': 'PCI',
          'seed-generation': '1',
        },
        creationTimestamp: '2019-09-03T18:39:25Z',
        finalizers: [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 13,
        name: 'policy-vulnerabilitypolicy',
        namespace: 'mcm',
        resourceVersion: '3459668',
        selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies/policy-vulnerabilitypolicy`,
        uid: '2767ac02-ce7a-11e9-a1ed-005056a0b88e',
      },
      spec: {
        complianceType: 'musthave',
        namespaces: {
          exclude: [
            'kube-*',
          ],
          include: [
            'default',
          ],
        },
        'policy-templates': [
          {
            objectDefinition: {
              apiVersion: 'policies.ibm.com/v1alpha1',
              kind: 'VulnerabilityPolicy',
              metadata: {
                label: {
                  category: 'System-Integrity',
                },
                name: 'va-policy-example',
              },
              spec: {
                namespaceSelector: {
                  exclude: [
                    'kube-system',
                  ],
                  include: [
                    'default',
                    'kube-*',
                  ],
                },
                remediationAction: 'inform',
                severity: 'medium',
              },
            },
            status: {
              Validity: {

              },
            },
          },
        ],
        remediationAction: 'inform',
      },
      status: {
        placementBindings: [
          'binding-policy-vulnerabilitypolicy',
        ],
        placementPolicies: [
          'placement-policy-vulnerabilitypolicy',
        ],
        status: {
          cluster1: {
            aggregatePoliciesStatus: {
              'policy-vulnerabilitypolicy': {
                compliant: 'Compliant',
              },
            },
            clustername: 'cluster1',
            compliant: 'Compliant',
          },
          clusterhub: {
            aggregatePoliciesStatus: {
              'policy-vulnerabilitypolicy': {
                compliant: 'NonCompliant',
              },
            },
            clustername: 'clusterhub',
            compliant: 'NonCompliant',
          },
        },
      },
    },
  ],
  kind: 'PolicyList',
  metadata: {
    continue: '',
    resourceVersion: '3960466',
    selfLink: `${ApiURL.acmPoliciesApiURL}namespaces/mcm/policies`,
  },
};

export const mockCreateCompliance = {
  kind: 'Compliance',
  metadata: {
    creationTimestamp: '2018-09-06T18:19:43Z',
    generation: 1,
    name: 'test-compliance',
    namespace: 'mcm',
    resourceVersion: '4405693',
    selfLink: `${ApiURL.mcmComplianceApiURL}mcm/compliances/test-compliance`,
    uid: '6d5dbb6e-b201-11e8-9a12-005056a0d11b',
  },
  spec: {
    'runtime-rules': [
      {
        apiVersion: 'policy.mcm.ibm.com/v1alpha1',
        kind: 'Policy',
        metadata: {
          description: 'Instance descriptor for policy resource',
          name: 'test-policy-1',
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
          remediationAction: 'inform',
          'role-templates': [
            {
              apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
              complianceType: 'musthave',
              kind: 'RoleTemplate',
              metadata: {
                name: 'role-xz-1',
                namespace: '',
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
                      'create',
                      'delete',
                      'patch',
                    ],
                  },
                  complianceType: 'musthave',
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
      },
      {
        apiVersion: 'policy.mcm.ibm.com/v1alpha1',
        kind: 'Policy',
        metadata: {
          description: 'Instance descriptor for policy resource',
          name: 'test-policy-2',
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
                name: 'role-xz-2',
                namespace: '',
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
      },
    ],
  },
};

export const mockDeleteResponse = {
  body: {
    apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
    kind: 'Compliance',
    metadata: {
      annotations: {
        'seed-generation': '1',
      },
      creationTimestamp: '2019-01-02T19:42:12Z',
      finalizers: ['finalizer.mcm.ibm.com'],
      generation: 1,
      name: 'compliance-all',
      namespace: 'mcm',
      resourceVersion: '5533372',
      selfLink: `${ApiURL.mcmComplianceApiURL}mcm/compliances/compliance-all`,
      uid: '7fc1f4a2-0ec6-11e9-8fd0-0ebe277f4f9c',
    },
    spec: {
      'runtime-rules': [{
        apiVersion: 'policy.mcm.ibm.com/v1alpha1',
        kind: 'Policy',
        metadata: {
          creationTimestamp: null,
          labels: {
            hipaa: 'true',
          },
          name: 'policy-all',
        },
        spec: {
          complianceType: 'musthave',
          namespaces: {
            exclude: ['kube*'],
            include: ['default'],
          },
          'object-templates': [{
            complianceType: 'musthave',
            objectDefinition: {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                name: 'nginx',
              },
              spec: {
                containers: [{
                  image: 'nginx:1.7.9',
                  name: 'nginx',
                  ports: [{
                    containerPort: 80,
                  }],
                }],
              },
            },
            status: {
              Validity: {},
            },
          }, {
            complianceType: 'musthave',
            objectDefinition: {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                labels: {
                  name: 'production',
                },
                name: 'production',
              },
            },
            status: {
              Validity: {},
            },
          }, {
            complianceType: 'musthave',
            objectDefinition: {
              apiVersion: 'rbac.authorization.k8s.io/v1',
              kind: 'RoleBinding',
              metadata: {
                name: 'operate-pods-rolebinding',
                namespace: 'default',
              },
              roleRef: {
                apiGroup: 'rbac.authorization.k8s.io',
                kind: 'Role',
                name: 'operator',
              },
              subjects: [{
                apiGroup: 'rbac.authorization.k8s.io',
                kind: 'User',
                name: 'jane',
              }],
            },
            status: {
              Validity: {},
            },
          }, {
            complianceType: 'musthave',
            objectDefinition: {
              apiVersion: 'policy/v1beta1',
              kind: 'PodSecurityPolicy',
              metadata: {
                annotations: {
                  'seccomp.security.alpha.kubernetes.io/allowedProfileNames': '*',
                },
                name: 'privileged-mcm',
              },
              spec: {
                allowPrivilegeEscalation: true,
                allowedCapabilities: ['*'],
                fsGroup: {
                  rule: 'RunAsAny',
                },
                hostIPC: true,
                hostNetwork: true,
                hostPID: true,
                hostPorts: [{
                  max: 65535,
                  min: 0,
                }],
                privileged: true,
                runAsUser: {
                  rule: 'RunAsAny',
                },
                seLinux: {
                  rule: 'RunAsAny',
                },
                supplementalGroups: {
                  rule: 'RunAsAny',
                },
                volumes: ['*'],
              },
            },
            status: {
              Validity: {},
            },
          }, {
            complianceType: 'musthave',
            objectDefinition: {
              apiVersion: 'networking.k8s.io/v1',
              kind: 'NetworkPolicy',
              metadata: {
                name: 'allow-all-mcm',
              },
              spec: {
                ingress: [{}],
                podSelector: {},
              },
            },
            status: {
              Validity: {},
            },
          }, {
            complianceType: 'musthave',
            objectDefinition: {
              apiVersion: 'v1',
              kind: 'LimitRange',
              metadata: {
                name: 'mem-limit-range',
              },
              spec: {
                limits: [{
                  default: {
                    memory: '512Mi',
                  },
                  defaultRequest: {
                    memory: '256Mi',
                  },
                  type: 'Container',
                }],
              },
            },
            status: {
              Validity: {},
            },
          }],
          remediationAction: 'enforce',
          'role-templates': [{
            apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
            complianceType: 'musthave',
            metadata: {
              creationTimestamp: null,
              name: 'operator-role',
            },
            rules: [{
              complianceType: 'musthave',
              policyRule: {
                apiGroups: ['extensions', 'apps'],
                resources: ['deployments'],
                verbs: ['get', 'list', 'watch', 'create', 'delete', 'patch'],
              },
            }],
            selector: {
              matchLabels: {
                hipaa: 'true',
              },
            },
            status: {
              Validity: {},
            },
          }],
        },
        status: {},
      }],
    },
    status: {
      placementBindings: ['binding-xz'],
      placementPolicies: ['placement-xz'],
      status: {
        cluster1: {
          aggregatePoliciesStatus: {
            'policy-all': {
              compliant: 'Compliant',
              valid: true,
            },
          },
          clustername: 'cluster1',
          compliant: 'Compliant',
        },
        cluster2: {
          aggregatePoliciesStatus: {
            'policy-all': {
              compliant: 'Compliant',
              valid: true,
            },
          },
          clustername: 'cluster2',
          compliant: 'Compliant',
        },
        cluster3: {
          aggregatePoliciesStatus: {
            'policy-all': {
              compliant: 'Compliant',
              valid: true,
            },
          },
          clustername: 'cluster3',
          compliant: 'Compliant',
        },
      },
    },
  },
};

export const mockRootPolicyResponse = {
  apiVersion: 'policies.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'kubectl.kubernetes.io/last-applied-configuration': '{\'apiVersion\':\'policies.open-cluster-management.io/v1\',\'kind\':\'Policy\',\'metadata\':{\'annotations\':{\'policies.open-cluster-management.io/categories\':\'PR.DS DataSecurity\',\'policies.open-cluster-management.io/controls\':\'PR.DS-2 Data-in-transit\',\'policies.open-cluster-management.io/standards\':\'NIST-CSF\'},\'name\':\'case1-test-policy\',\'namespace\':\'default\'},\'spec\':{\'disabled\':false,\'policy-templates\':[{\'objectDefinition\':{\'apiVersion\':\'policies.ibm.com/v1alpha1\',\'kind\':\'TrustedContainerPolicy\',\'metadata\':{\'name\':\'case1-test-policy-trustedcontainerpolicy\'},\'spec\':{\'imageRegistry\':\'quay.io\',\'namespaceSelector\':{\'exclude\':[\'kube-system\'],\'include\':[\'default\']},\'remediationAction\':\'inform\',\'severity\':\'low\'}}}],\'remediationAction\':\'inform\'}}\n', 'policies.open-cluster-management.io/categories': 'PR.DS DataSecurity', 'policies.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit', 'policies.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-05-15T08:24:33Z',
    generation: 1,
    name: 'case1-test-policy',
    namespace: 'default',
    resourceVersion: '27550277',
    selfLink: '/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case1-test-policy',
    uid: 'e919bf5c-df16-4b90-ae01-a39da7138623',
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
  status: { placement: [{ placementBinding: 'case1-test-policy-pb', placementRule: 'case1-test-policy-plr' }], status: [{ clustername: 'calamari', clusternamespace: 'calamari' }] },
};

export const mockRootPoliciesListResponse = [[{
  apiVersion: 'policies.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policies.open-cluster-management.io/categories":"PR.DS DataSecurity","policies.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policies.open-cluster-management.io/standards":"NIST-CSF"},"name":"case1-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case1-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system"],"include":["default"]},"remediationAction":"inform","severity":"low"}}}],"remediationAction":"inform"}}\n', 'policies.open-cluster-management.io/categories': 'PR.DS DataSecurity', 'policies.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit', 'policies.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-05-15T08:24:33Z',
    generation: 1,
    name: 'case1-test-policy',
    namespace: 'default',
    resourceVersion: '27550277',
    selfLink: '/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/case1-test-policy',
    uid: 'e919bf5c-df16-4b90-ae01-a39da7138623',
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
  status: { placement: [{ placementBinding: 'case1-test-policy-pb', placementRule: 'case1-test-policy-plr' }], status: [{ clustername: 'calamari', clusternamespace: 'calamari' }] },
}, {
  apiVersion: 'policies.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: { 'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policies.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{},"name":"test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system"],"include":["default"]},"remediationAction":"inform","severity":"low"}}}],"remediationAction":"inform"}}\n' }, creationTimestamp: '2020-05-13T09:07:42Z', generation: 1, name: 'test-policy', namespace: 'default', resourceVersion: '23259418', selfLink: '/apis/policies.open-cluster-management.io/v1/namespaces/default/policies/test-policy', uid: 'a10c7723-cad8-4669-b18f-931df3e28044',
  },
  spec: {
    disabled: false,
    'policy-templates': [{
      objectDefinition: {
        apiVersion: 'policies.ibm.com/v1alpha1',
        kind: 'TrustedContainerPolicy',
        metadata: { name: 'test-policy-trustedcontainerpolicy' },
        spec: {
          imageRegistry: 'quay.io', namespaceSelector: { exclude: ['kube-system'], include: ['default'] }, remediationAction: 'inform', severity: 'low',
        },
      },
    }],
    remediationAction: 'inform',
  },
  status: {},
}]];
