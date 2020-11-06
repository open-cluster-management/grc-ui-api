/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import ApiGroup from '../lib/ApiGroup';

export const mockComplianceListDefaultResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  items: ['Just default it!'],
  kind: 'PolicyList',
  metadata: {
    continue: '',
    resourceVersion: '10793978',
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/default/policies`,
  },
};

export const mockComplianceListNoResponse = {
  apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
  items: [],
  kind: 'PolicyList',
  metadata: {
    continue: '',
    resourceVersion: '10793978',
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/namespace/policies`,
  },
};

export const mockComplianceListMCMResponse = {
  apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
  items: [
    {
      apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
      kind: 'Policy',
      metadata: {
        creationTimestamp: '2019-09-03T18:34:05Z',
        finalizers: [
          'finalizer.policies.ibm.com',
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 24,
        name: 'policy-certificatepolicy',
        namespace: 'mcm',
        resourceVersion: '3666045',
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/policy-certificatepolicy`,
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
        consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
      },
    },
    {
      apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'FISMA',
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
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/policy-iampolicy`,
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
          consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
        },
      },
    },
    {
      apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'VA',
          'policy.open-cluster-management.io/standards': 'FISMA, TEST',
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
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/policy-image`,
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
          consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
        },
      },
    },
    {
      apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'CertManager',
          'policy.open-cluster-management.io/standards': 'HIPAA',
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
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/policy-limitrange`,
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
        consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
      },
    },
    {
      apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'policy',
          'policy.open-cluster-management.io/standards': 'FISMA',
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
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/policy-namespace`,
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
        consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
      },
    },
    {
      apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'FISMA',
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
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/policy-pod`,
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
      apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections',
          'policy.open-cluster-management.io/controls': 'MutationAdvisor',
          'policy.open-cluster-management.io/standards': 'FISMA',
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
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/policy-rolebinding-1`,
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
        consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
      },
    },
    {
      apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity',
          'policy.open-cluster-management.io/controls': 'VA',
          'policy.open-cluster-management.io/standards': 'PCI',
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
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/policy-vulnerabilitypolicy`,
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
        consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
      },
    },
  ],
  kind: 'PolicyList',
  metadata: {
    continue: '',
    resourceVersion: '3960466',
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies`,
  },
};

export const mockRootPolicyResponse = {
  apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
  kind: 'Policy',
  metadata: {
    annotations: {
      'kubectl.kubernetes.io/last-applied-configuration': '{\'apiVersion\':\'policy.open-cluster-management.io/v1\',\'kind\':\'Policy\',\'metadata\':{\'annotations\':{\'policy.open-cluster-management.io/categories\':\'PR.DS DataSecurity\',\'policy.open-cluster-management.io/controls\':\'PR.DS-2 Data-in-transit\',\'policy.open-cluster-management.io/standards\':\'NIST-CSF\'},\'name\':\'case1-test-policy\',\'namespace\':\'default\'},\'spec\':{\'disabled\':false,\'policy-templates\':[{\'objectDefinition\':{\'apiVersion\':\'policies.ibm.com/v1alpha1\',\'kind\':\'TrustedContainerPolicy\',\'metadata\':{\'name\':\'case1-test-policy-trustedcontainerpolicy\'},\'spec\':{\'imageRegistry\':\'quay.io\',\'namespaceSelector\':{\'exclude\':[\'kube-system\'],\'include\':[\'default\']},\'remediationAction\':\'inform\',\'severity\':\'low\'}}}],\'remediationAction\':\'inform\'}}\n', 'policy.open-cluster-management.io/categories': 'PR.DS DataSecurity', 'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit', 'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-05-15T08:24:33Z',
    generation: 1,
    name: 'case1-test-policy',
    namespace: 'default',
    resourceVersion: '27550277',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/case1-test-policy',
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
  status: {
    placement: [{
      placementBinding: 'case1-test-policy-pb',
      placementRule: 'case1-test-policy-plr',
    }],
    status: [{ clustername: 'calamari', clusternamespace: 'calamari' }],
    consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
  },
};

export const mockRootPoliciesListResponse = [[{
  apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
  kind: 'Policy',
  metadata: {
    annotations: {
      'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"PR.DS DataSecurity","policy.open-cluster-management.io/controls":"PR.DS-2 Data-in-transit","policy.open-cluster-management.io/standards":"NIST-CSF"},"name":"case1-test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"case1-test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system"],"include":["default"]},"remediationAction":"inform","severity":"low"}}}],"remediationAction":"inform"}}\n', 'policy.open-cluster-management.io/categories': 'PR.DS DataSecurity', 'policy.open-cluster-management.io/controls': 'PR.DS-2 Data-in-transit', 'policy.open-cluster-management.io/standards': 'NIST-CSF',
    },
    creationTimestamp: '2020-05-15T08:24:33Z',
    generation: 1,
    name: 'case1-test-policy',
    namespace: 'default',
    resourceVersion: '27550277',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/case1-test-policy',
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
  status: {
    placement: [{ placementBinding: 'case1-test-policy-pb', placementRule: 'case1-test-policy-plr' }],
    status: [{ clustername: 'calamari', clusternamespace: 'calamari' }],
    consoleURL: 'https://console-openshift-console.apps.cluster1.dev08.red-chesterfield.com',
  },
}, {
  apiVersion: `${ApiGroup.policiesGroup}/${ApiGroup.version}`,
  kind: 'Policy',
  metadata: {
    annotations: { 'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{},"name":"test-policy","namespace":"default"},"spec":{"disabled":false,"policy-templates":[{"objectDefinition":{"apiVersion":"policies.ibm.com/v1alpha1","kind":"TrustedContainerPolicy","metadata":{"name":"test-policy-trustedcontainerpolicy"},"spec":{"imageRegistry":"quay.io","namespaceSelector":{"exclude":["kube-system"],"include":["default"]},"remediationAction":"inform","severity":"low"}}}],"remediationAction":"inform"}}\n' }, creationTimestamp: '2020-05-13T09:07:42Z', generation: 1, name: 'test-policy', namespace: 'default', resourceVersion: '23259418', selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/default/policies/test-policy', uid: 'a10c7723-cad8-4669-b18f-931df3e28044',
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
