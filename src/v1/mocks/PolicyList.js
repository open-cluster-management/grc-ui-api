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

export const mockCompletedResourceView = {
  kind: 'ResourceView',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    name: 'policies-policy-mcm-ibm-com-1571321668198', namespace: 'default', selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/default/resourceviews/policies-policy-mcm-ibm-com-1571321668198`, uid: '6e2ecd59-f0e8-11e9-bf49-96bb9600cc18', resourceVersion: '100830', creationTimestamp: '2019-10-17T14:14:28Z', labels: { name: 'policies-policy-mcm-ibm-com-1571321668198' }, annotations: { 'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk', 'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=' },
  },
  spec: { scope: { resource: 'policies.policy.open-cluster-management.io' } },
  status: {
    conditions: [{ type: 'Completed', lastUpdateTime: '2019-10-17T14:14:28Z' }],
    results: {
      cluster1: {
        apiVersion: 'policy.open-cluster-management.io/v1',
        items: [{
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections', 'policy.open-cluster-management.io/controls': 'SecretEncryption', 'policy.open-cluster-management.io/standards': 'FISMA', 'seed-generation': '2',
            },
            creationTimestamp: '2019-10-14T07:08:34Z',
            finalizers: ['policy.finalizer.mcm.ibm.com', 'sync.finalizer.mcm.ibm.com'],
            generation: 2,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-namespace' },
            name: 'mcm.policy-namespace',
            namespace: 'cluster1',
            resourceVersion: '8677996',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/mcm.policy-namespace`,
            uid: '6f6dacb8-ee51-11e9-946e-005056a04901',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            'object-templates': [{
              complianceType: 'musthave',
              objectDefinition: { apiVersion: 'v1', kind: 'Namespace', metadata: { name: 'prod' } },
              status: {
                Compliant: 'NonCompliant',
                Validity: {},
                conditions: [{
                  lastTransitionTime: '2019-10-14T07:08:36Z', message: 'namespaces `prod` is missing, and should be created', reason: 'K8s missing a must have object', status: 'True', type: 'violation',
                }],
              },
            }],
            remediationAction: 'inform',
          },
          status: { compliant: 'NonCompliant' },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': '', 'policy.open-cluster-management.io/controls': '', 'policy.open-cluster-management.io/standards': '', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-16T15:30:06Z',
            finalizers: ['sync.finalizer.mcm.ibm.com', 'policy.finalizer.mcm.ibm.com'],
            generation: 1,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-namespace-1' },
            name: 'mcm.policy-namespace-1',
            namespace: 'cluster1',
            resourceVersion: '10321887',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/mcm.policy-namespace-1`,
            uid: 'd4b5c896-f029-11e9-946e-005056a04901',
          },
          spec: {
            complianceType: 'musthave', namespaces: { exclude: ['kube-*'], include: ['default'] }, 'object-templates': [{ complianceType: 'musthave', objectDefinition: { apiVersion: 'v1', kind: 'Namespacefake', metadata: { name: 'prod' } }, status: { Validity: {} } }], remediationAction: 'inform',
          },
          status: {},
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'FISMA, Test', 'seed-generation': '71770',
            },
            creationTimestamp: '2019-10-14T07:08:34Z',
            finalizers: ['sync.finalizer.mcm.ibm.com', 'policy.finalizer.mcm.ibm.com'],
            generation: 71770,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-role' },
            name: 'mcm.policy-role',
            namespace: 'cluster1',
            resourceVersion: '10560598',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/mcm.policy-role`,
            uid: '6f6eb6bc-ee51-11e9-946e-005056a04901',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            remediationAction: 'inform',
            'role-templates': [{
              apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
              complianceType: 'musthave',
              metadata: { creationTimestamp: null, name: 'operator-role-policy' },
              rules: [{ complianceType: 'musthave', policyRule: { apiGroups: ['extensions', 'apps'], resources: ['deployments'], verbs: ['get', 'list', 'watch', 'create', 'delete', 'patch'] } }, { complianceType: 'mustnothave', policyRule: { apiGroups: ['core'], resources: ['secrets'], verbs: ['get', 'list', 'watch', 'delete', 'create', 'update', 'patch'] } }],
              selector: { matchLabels: { dev: 'true' } },
              status: {
                Compliant: 'NonCompliant',
                Validity: { valid: true },
                conditions: [{
                  lastTransitionTime: '2019-10-17T07:17:52Z', message: 'k8s RBAC role is missing: operator-role-policy', reason: 'K8s RBAC role is missing', status: 'True', type: 'completed',
                }],
              },
            }],
          },
          status: { compliant: 'NonCompliant', valid: true },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'HIPAA', 'seed-generation': '4',
            },
            creationTimestamp: '2019-10-16T18:11:03Z',
            finalizers: ['policy.finalizer.mcm.ibm.com', 'sync.finalizer.mcm.ibm.com'],
            generation: 3,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-vulnerabilitypolicy' },
            name: 'mcm.policy-vulnerabilitypolicy',
            namespace: 'cluster1',
            resourceVersion: '10540114',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/mcm.policy-vulnerabilitypolicy`,
            uid: '50d98c74-f040-11e9-946e-005056a04901',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['kube-system'] },
            'policy-templates': [{
              objectDefinition: {
                apiVersion: 'policies.ibm.com/v1alpha1', kind: 'VulnerabilityPolicy', metadata: { label: { category: 'System-Integrity' }, name: 'policy-vulnerabilitypolicy-example' }, spec: { namespaceSelector: { exclude: ['kube-system'], include: ['default', 'kube-*'] }, remediationAction: 'inform', severity: 'medium' },
              },
              status: {
                Compliant: 'Compliant',
                Validity: {},
                conditions: [{
                  lastTransitionTime: '2019-10-17T05:24:23Z', message: 'Compliant; 0 Vulnerable pods detected in namespace `kube-public`; 0 Vulnerable pods detected in namespace `default`', reason: 'policy: cluster1/policy-vulnerabilitypolicy-example', status: 'True', type: 'completed',
                }],
              },
            }],
            remediationAction: 'inform',
          },
          status: { compliant: 'Compliant' },
        }],
        kind: 'PolicyList',
        metadata: { continue: '', resourceVersion: '10622027', selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/policies` },
      },
      clusterhub: {
        apiVersion: 'policy.open-cluster-management.io/v1',
        items: [{
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections', 'policy.open-cluster-management.io/controls': 'SecretEncryption', 'policy.open-cluster-management.io/standards': 'FISMA', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-14T07:08:34Z',
            finalizers: ['propagator.finalizer.mcm.ibm.com', 'finalizer.policies.ibm.com'],
            generation: 2,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-namespace' },
            name: 'mcm.policy-namespace',
            namespace: 'cluster1',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-namespace', uid: '7f62f150-e617-11e9-bf67-005056a0b88e',
            }],
            resourceVersion: '7816343',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/mcm.policy-namespace`,
            uid: '6f66d8c4-ee51-11e9-bf6a-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave', namespaces: { exclude: ['kube-*'], include: ['default'] }, 'object-templates': [{ complianceType: 'musthave', objectDefinition: { apiVersion: 'v1', kind: 'Namespace', metadata: { name: 'prod' } }, status: { Validity: {} } }], remediationAction: 'inform',
          },
          status: { compliant: 'NonCompliant' },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': '', 'policy.open-cluster-management.io/controls': '', 'policy.open-cluster-management.io/standards': '', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-16T15:30:06Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com'],
            generation: 1,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-namespace-1' },
            name: 'mcm.policy-namespace-1',
            namespace: 'cluster1',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-namespace-1', uid: 'caa40de4-f029-11e9-bf6c-005056a0b88e',
            }],
            resourceVersion: '9068427',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/mcm.policy-namespace-1`,
            uid: 'd4a28872-f029-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave', namespaces: { exclude: ['kube-*'], include: ['default'] }, 'object-templates': [{ complianceType: 'musthave', objectDefinition: { apiVersion: 'v1', kind: 'Namespacefake', metadata: { name: 'prod' } }, status: { Validity: {} } }], remediationAction: 'inform',
          },
          status: {},
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'FISMA, Test', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-14T07:08:34Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com'],
            generation: 2,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-role' },
            name: 'mcm.policy-role',
            namespace: 'cluster1',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-role', uid: 'ecc8a84e-e616-11e9-bf67-005056a0b88e',
            }],
            resourceVersion: '7816337',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/mcm.policy-role`,
            uid: '6f682b1e-ee51-11e9-bf6a-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            remediationAction: 'inform',
            'role-templates': [{
              apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1', complianceType: 'musthave', metadata: { creationTimestamp: null, name: 'operator-role-policy' }, rules: [{ complianceType: 'musthave', policyRule: { apiGroups: ['extensions', 'apps'], resources: ['deployments'], verbs: ['get', 'list', 'watch', 'create', 'delete', 'patch'] } }, { complianceType: 'mustnothave', policyRule: { apiGroups: ['core'], resources: ['secrets'], verbs: ['get', 'list', 'watch', 'delete', 'create', 'update', 'patch'] } }], selector: { matchLabels: { dev: 'true' } }, status: { Validity: {} },
            }],
          },
          status: { compliant: 'NonCompliant', valid: true },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'HIPAA', 'seed-generation': '2',
            },
            creationTimestamp: '2019-10-16T17:20:43Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com'],
            generation: 3,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-vulnerabilitypolicy' },
            name: 'mcm.policy-vulnerabilitypolicy',
            namespace: 'cluster1',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-vulnerabilitypolicy', uid: '3f0b8a31-f039-11e9-bf6c-005056a0b88e',
            }],
            resourceVersion: '9096697',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/mcm.policy-vulnerabilitypolicy`,
            uid: '488670bf-f039-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['kube-system'] },
            'policy-templates': [{
              objectDefinition: {
                apiVersion: 'policies.ibm.com/v1alpha1', kind: 'VulnerabilityPolicy', metadata: { label: { category: 'System-Integrity' }, name: 'policy-vulnerabilitypolicy-example' }, spec: { namespaceSelector: { exclude: ['kube-system'], include: ['default', 'kube-*'] }, remediationAction: 'inform', severity: 'medium' },
              },
              status: { Validity: {} },
            }],
            remediationAction: 'inform',
          },
          status: { compliant: 'Compliant' },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections', 'policy.open-cluster-management.io/controls': 'SecretEncryption', 'policy.open-cluster-management.io/standards': 'FISMA', 'seed-generation': '2',
            },
            creationTimestamp: '2019-10-14T07:10:34Z',
            finalizers: ['propagator.finalizer.mcm.ibm.com', 'finalizer.policies.ibm.com', 'policy.finalizer.mcm.ibm.com'],
            generation: 2,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-namespace' },
            name: 'mcm.policy-namespace',
            namespace: 'clusterhub',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-namespace', uid: '7f62f150-e617-11e9-bf67-005056a0b88e',
            }],
            resourceVersion: '7886410',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/clusterhub/policies/mcm.policy-namespace`,
            uid: 'b70b74e8-ee51-11e9-bf6a-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            'object-templates': [{
              complianceType: 'musthave',
              objectDefinition: { apiVersion: 'v1', kind: 'Namespace', metadata: { name: 'prod' } },
              status: {
                Compliant: 'NonCompliant',
                Validity: {},
                conditions: [{
                  lastTransitionTime: '2019-10-14T10:33:59Z', message: 'namespaces `prod` is missing, and should be created', reason: 'K8s missing a must have object', status: 'True', type: 'violation',
                }],
              },
            }],
            remediationAction: 'inform',
          },
          status: { compliant: 'NonCompliant' },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': '', 'policy.open-cluster-management.io/controls': '', 'policy.open-cluster-management.io/standards': '', 'seed-generation': '2',
            },
            creationTimestamp: '2019-10-16T15:30:06Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com', 'policy.finalizer.mcm.ibm.com'],
            generation: 2,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-namespace-1' },
            name: 'mcm.policy-namespace-1',
            namespace: 'clusterhub',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-namespace-1', uid: 'caa40de4-f029-11e9-bf6c-005056a0b88e',
            }],
            resourceVersion: '9104393',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/clusterhub/policies/mcm.policy-namespace-1`,
            uid: 'd4a3e36c-f029-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            'object-templates': [{
              complianceType: 'musthave',
              objectDefinition: { apiVersion: 'v1', kind: 'Namespacefake', metadata: { name: 'prod' } },
              status: {
                Compliant: 'NonCompliant',
                Validity: {},
                conditions: [{
                  lastTransitionTime: '2019-10-16T18:58:07Z', message: "couldn't find mapping resource with kind Namespacefake, please check if you have CRD deployed", reason: 'K8s creation error', status: 'False', type: 'violation',
                }],
              },
            }],
            remediationAction: 'inform',
          },
          status: { compliant: 'NonCompliant' },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': 'VulnerbilityAdvisor', 'policy.open-cluster-management.io/standards': 'Test', 'seed-generation': '2',
            },
            creationTimestamp: '2019-10-16T18:33:45Z',
            finalizers: ['propagator.finalizer.mcm.ibm.com', 'finalizer.policies.ibm.com', 'policy.finalizer.mcm.ibm.com'],
            generation: 2,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-namespace-undef-test' },
            name: 'mcm.policy-namespace-undef-test',
            namespace: 'clusterhub',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-namespace-undef-test', uid: '7bbb8eb4-f043-11e9-bf6c-005056a0b88e',
            }],
            resourceVersion: '9104388',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/clusterhub/policies/mcm.policy-namespace-undef-test`,
            uid: '7c55404a-f043-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            'object-templates': [{
              complianceType: 'musthave',
              objectDefinition: { apiVersion: 'v1', kind: 'Namespacatatatatatatatatatatatatatatatatatat', metadata: { name: 'prod' } },
              status: {
                Compliant: 'NonCompliant',
                Validity: {},
                conditions: [{
                  lastTransitionTime: '2019-10-16T18:58:07Z', message: "couldn't find mapping resource with kind Namespacatatatatatatatatatatatatatatatatatat, please check if you have CRD deployed", reason: 'K8s creation error', status: 'False', type: 'violation',
                }],
              },
            }],
            remediationAction: 'inform',
          },
          status: { compliant: 'NonCompliant' },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': '', 'policy.open-cluster-management.io/standards': 'Test', 'seed-generation': '2',
            },
            creationTimestamp: '2019-10-16T19:02:49Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com', 'policy.finalizer.mcm.ibm.com'],
            generation: 2,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-namespace-undefined' },
            name: 'mcm.policy-namespace-undefined',
            namespace: 'clusterhub',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-namespace-undefined', uid: '8842b32a-f047-11e9-bf6c-005056a0b88e',
            }],
            resourceVersion: '9105249',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/clusterhub/policies/mcm.policy-namespace-undefined`,
            uid: '8c0678f0-f047-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            'object-templates': [{
              complianceType: 'musthave',
              objectDefinition: { apiVersion: 'v1', kind: 'Namespaceundefined', metadata: { name: 'prod' } },
              status: {
                Compliant: 'NonCompliant',
                Validity: {},
                conditions: [{
                  lastTransitionTime: '2019-10-16T19:02:53Z', message: "couldn't find mapping resource with kind Namespaceundefined, please check if you have CRD deployed", reason: 'K8s creation error', status: 'False', type: 'violation',
                }],
              },
            }],
            remediationAction: 'inform',
          },
          status: { compliant: 'NonCompliant' },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'FISMA, Test', 'seed-generation': '74258',
            },
            creationTimestamp: '2019-10-14T07:10:34Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com', 'policy.finalizer.mcm.ibm.com'],
            generation: 74264,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-role' },
            name: 'mcm.policy-role',
            namespace: 'clusterhub',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-role', uid: 'ecc8a84e-e616-11e9-bf67-005056a0b88e',
            }],
            resourceVersion: '9302938',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/clusterhub/policies/mcm.policy-role`,
            uid: 'b7287261-ee51-11e9-bf6a-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            remediationAction: 'inform',
            'role-templates': [{
              apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
              complianceType: 'musthave',
              metadata: { creationTimestamp: null, name: 'operator-role-policy' },
              rules: [{ complianceType: 'musthave', policyRule: { apiGroups: ['extensions', 'apps'], resources: ['deployments'], verbs: ['get', 'list', 'watch', 'create', 'delete', 'patch'] } }, { complianceType: 'mustnothave', policyRule: { apiGroups: ['core'], resources: ['secrets'], verbs: ['get', 'list', 'watch', 'delete', 'create', 'update', 'patch'] } }],
              selector: { matchLabels: { dev: 'true' } },
              status: {
                Compliant: 'NonCompliant',
                Validity: { valid: true },
                conditions: [{
                  lastTransitionTime: '2019-10-17T14:14:26Z', message: 'k8s RBAC role is missing: operator-role-policy', reason: 'K8s RBAC role is missing', status: 'True', type: 'completed',
                }],
              },
            }],
          },
          status: { compliant: 'NonCompliant', valid: true },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'HIPAA', 'seed-generation': '4',
            },
            creationTimestamp: '2019-10-16T17:20:43Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com', 'policy.finalizer.mcm.ibm.com'],
            generation: 4,
            labels: { 'parent-namespace': 'mcm', 'parent-policy': 'policy-vulnerabilitypolicy' },
            name: 'mcm.policy-vulnerabilitypolicy',
            namespace: 'clusterhub',
            ownerReferences: [{
              apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'mcm.policy-vulnerabilitypolicy', uid: '3f0b8a31-f039-11e9-bf6c-005056a0b88e',
            }],
            resourceVersion: '9096716',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/clusterhub/policies/mcm.policy-vulnerabilitypolicy`,
            uid: '48876af1-f039-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['kube-system'] },
            'policy-templates': [{
              objectDefinition: {
                apiVersion: 'policies.ibm.com/v1alpha1', kind: 'VulnerabilityPolicy', metadata: { label: { category: 'System-Integrity' }, name: 'policy-vulnerabilitypolicy-example' }, spec: { namespaceSelector: { exclude: ['kube-system'], include: ['default', 'kube-*'] }, remediationAction: 'inform', severity: 'medium' },
              },
              status: {
                Compliant: 'NonCompliant',
                Validity: {},
                conditions: [{
                  lastTransitionTime: '2019-10-16T18:10:47Z', message: "couldn't find mapping resource with kind VulnerabilityPolicy, please check if you have corresponding policy controller deployed", reason: 'K8s creation error', status: 'False', type: 'violation',
                }],
              },
            }],
            remediationAction: 'inform',
          },
          status: { compliant: 'NonCompliant' },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections', 'policy.open-cluster-management.io/controls': 'SecretEncryption', 'policy.open-cluster-management.io/standards': 'FISMA', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-03T19:53:40Z',
            finalizers: ['propagator.finalizer.mcm.ibm.com', 'finalizer.policies.ibm.com'],
            generation: 54,
            name: 'policy-namespace',
            namespace: 'mcm',
            resourceVersion: '7886411',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies/policy-namespace`,
            uid: '7f62f150-e617-11e9-bf67-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave', namespaces: { exclude: ['kube-*'], include: ['default'] }, 'object-templates': [{ complianceType: 'musthave', objectDefinition: { apiVersion: 'v1', kind: 'Namespace', metadata: { name: 'prod' } }, status: { Validity: {} } }], remediationAction: 'inform',
          },
          status: { placementBindings: ['binding-policy-namespace'], placementPolicies: ['placement-policy-namespace'], status: { cluster1: { aggregatePoliciesStatus: { 'mcm.policy-namespace': { compliant: 'NonCompliant' } }, clustername: 'cluster1', compliant: 'NonCompliant' }, clusterhub: { aggregatePoliciesStatus: { 'mcm.policy-namespace': { compliant: 'NonCompliant' } }, clustername: 'clusterhub', compliant: 'NonCompliant' } } },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': '', 'policy.open-cluster-management.io/controls': '', 'policy.open-cluster-management.io/standards': '', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-16T15:29:49Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com'],
            generation: 6,
            name: 'policy-namespace-1',
            namespace: 'mcm',
            resourceVersion: '9104395',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies/policy-namespace-1`,
            uid: 'caa40de4-f029-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave', namespaces: { exclude: ['kube-*'], include: ['default'] }, 'object-templates': [{ complianceType: 'musthave', objectDefinition: { apiVersion: 'v1', kind: 'Namespacefake', metadata: { name: 'prod' } }, status: { Validity: {} } }], remediationAction: 'inform',
          },
          status: { placementBindings: ['binding-policy-namespace-1'], placementPolicies: ['placement-policy-namespace-1'], status: { cluster1: { aggregatePoliciesStatus: { 'mcm.policy-namespace-1': {} }, clustername: 'cluster1' }, clusterhub: { aggregatePoliciesStatus: { 'mcm.policy-namespace-1': { compliant: 'NonCompliant' } }, clustername: 'clusterhub', compliant: 'NonCompliant' } } },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': 'VulnerbilityAdvisor', 'policy.open-cluster-management.io/standards': 'Test', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-16T18:33:44Z',
            finalizers: ['propagator.finalizer.mcm.ibm.com', 'finalizer.policies.ibm.com'],
            generation: 5,
            name: 'policy-namespace-undef-test',
            namespace: 'mcm',
            resourceVersion: '9104389',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies/policy-namespace-undef-test`,
            uid: '7bbb8eb4-f043-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave', namespaces: { exclude: ['kube-*'], include: ['default'] }, 'object-templates': [{ complianceType: 'musthave', objectDefinition: { apiVersion: 'v1', kind: 'Namespacatatatatatatatatatatatatatatatatatat', metadata: { name: 'prod' } }, status: { Validity: {} } }], remediationAction: 'inform',
          },
          status: { placementBindings: ['binding-policy-namespace-undef-test'], placementPolicies: ['placement-policy-namespace-undef-test'], status: { clusterhub: { aggregatePoliciesStatus: { 'mcm.policy-namespace-undef-test': { compliant: 'NonCompliant' } }, clustername: 'clusterhub', compliant: 'NonCompliant' } } },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': '', 'policy.open-cluster-management.io/standards': 'Test', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-16T19:02:43Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com'],
            generation: 5,
            name: 'policy-namespace-undefined',
            namespace: 'mcm',
            resourceVersion: '9105250',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies/policy-namespace-undefined`,
            uid: '8842b32a-f047-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave', namespaces: { exclude: ['kube-*'], include: ['default'] }, 'object-templates': [{ complianceType: 'musthave', objectDefinition: { apiVersion: 'v1', kind: 'Namespaceundefined', metadata: { name: 'prod' } }, status: { Validity: {} } }], remediationAction: 'inform',
          },
          status: { placementBindings: ['binding-policy-namespace-undefined'], placementPolicies: ['placement-policy-namespace-undefined'], status: { clusterhub: { aggregatePoliciesStatus: { 'mcm.policy-namespace-undefined': { compliant: 'NonCompliant' } }, clustername: 'clusterhub', compliant: 'NonCompliant' } } },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'FISMA, Test', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-03T19:49:34Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com'],
            generation: 70,
            name: 'policy-role',
            namespace: 'mcm',
            resourceVersion: '7817063',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies/policy-role`,
            uid: 'ecc8a84e-e616-11e9-bf67-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            remediationAction: 'inform',
            'role-templates': [{
              apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1', complianceType: 'musthave', metadata: { creationTimestamp: null, name: 'operator-role-policy' }, rules: [{ complianceType: 'musthave', policyRule: { apiGroups: ['extensions', 'apps'], resources: ['deployments'], verbs: ['get', 'list', 'watch', 'create', 'delete', 'patch'] } }, { complianceType: 'mustnothave', policyRule: { apiGroups: ['core'], resources: ['secrets'], verbs: ['get', 'list', 'watch', 'delete', 'create', 'update', 'patch'] } }], selector: { matchLabels: { dev: 'true' } }, status: { Validity: {} },
            }],
          },
          status: { placementBindings: ['binding-policy-role'], placementPolicies: ['placement-policy-role'], status: { cluster1: { aggregatePoliciesStatus: { 'mcm.policy-role': { compliant: 'NonCompliant' } }, clustername: 'cluster1', compliant: 'NonCompliant' }, clusterhub: { aggregatePoliciesStatus: { 'mcm.policy-role': { compliant: 'NonCompliant' } }, clustername: 'clusterhub', compliant: 'NonCompliant' } } },
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'Test', 'seed-generation': '1',
            },
            creationTimestamp: '2019-10-16T17:56:09Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com'],
            generation: 2,
            name: 'policy-undef-test',
            namespace: 'mcm',
            resourceVersion: '9094409',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies/policy-undef-test`,
            uid: '3bf6a043-f03e-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['default'] },
            'policy-templates': [{
              objectDefinition: {
                apiVersion: 'policies.ibm.com/v1alpha1',
                kind: 'MutationPolicyNODEF',
                metadata: { label: { category: 'System-Integrity' }, name: 'policy-undef-test-example' },
                spec: {
                  conditions: { ownership: ['ReplicaSet', 'Deployment', 'DeamonSet', 'ReplicationController', 'none'] }, namespaceSelector: { exclude: ['kube-system'], include: ['default', 'kube-*'] }, remediationAction: 'inform', severity: 'medium',
                },
              },
              status: { Validity: {} },
            }],
            remediationAction: 'inform',
          },
          status: {},
        }, {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'policy.open-cluster-management.io/categories': 'SystemAndInformationIntegrity', 'policy.open-cluster-management.io/controls': 'MutationAdvisor', 'policy.open-cluster-management.io/standards': 'HIPAA', 'seed-generation': '2',
            },
            creationTimestamp: '2019-10-16T17:20:27Z',
            finalizers: ['finalizer.policies.ibm.com', 'propagator.finalizer.mcm.ibm.com'],
            generation: 12,
            name: 'policy-vulnerabilitypolicy',
            namespace: 'mcm',
            resourceVersion: '9096693',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/policies/policy-vulnerabilitypolicy`,
            uid: '3f0b8a31-f039-11e9-bf6c-005056a0b88e',
          },
          spec: {
            complianceType: 'musthave',
            namespaces: { exclude: ['kube-*'], include: ['kube-system'] },
            'policy-templates': [{
              objectDefinition: {
                apiVersion: 'policies.ibm.com/v1alpha1', kind: 'VulnerabilityPolicy', metadata: { label: { category: 'System-Integrity' }, name: 'policy-vulnerabilitypolicy-example' }, spec: { namespaceSelector: { exclude: ['kube-system'], include: ['default', 'kube-*'] }, remediationAction: 'inform', severity: 'medium' },
              },
              status: { Validity: {} },
            }],
            remediationAction: 'inform',
          },
          status: { placementBindings: ['binding-policy-vulnerabilitypolicy'], placementPolicies: ['placement-policy-vulnerabilitypolicy'], status: { cluster1: { aggregatePoliciesStatus: { 'mcm.policy-vulnerabilitypolicy': { compliant: 'Compliant' } }, clustername: 'cluster1', compliant: 'Compliant' }, clusterhub: { aggregatePoliciesStatus: { 'mcm.policy-vulnerabilitypolicy': { compliant: 'NonCompliant' } }, clustername: 'clusterhub', compliant: 'NonCompliant' } } },
        }],
        kind: 'PolicyList',
        metadata: { continue: '', resourceVersion: '9302940', selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/policies` },
      },
    },
  },
};

export const mockCreateResourceGet = {
  kind: 'ResourceViewList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/default/resourceviews`,
    resourceVersion: '144656',
  },
  items: [
    {
      metadata: {
        name: 'policies-policy-mcm-ibm-com-1563995392802',
        namespace: 'default',
        selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/default/resourceviews/policies-policy-mcm-ibm-com-1563995392802`,
        uid: 'e8aad049-b222-11e9-92a6-42a4786221be',
        resourceVersion: '144656',
        creationTimestamp: '2019-07-29T17:04:21Z',
        labels: {
          name: 'policies-policy-mcm-ibm-com-1563995392802',
        },
        annotations: {
          'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
        },
      },
      spec: {
        scope: {
          resource: 'policies.policy.open-cluster-management.io',
        },
      },
      status: {
        conditions: [
          {
            type: 'Completed',
            lastUpdateTime: '2019-07-29T17:04:21Z',
          },
        ],
      },
    },
  ],
};

export const mockCreateResourcePost = {
  kind: 'ResourceView',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    name: 'policies-policy-mcm-ibm-com-1563995392802',
    namespace: 'default',
    selfLink:
      `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/default/resourceviews/policies-policy-mcm-ibm-com-1563995392802`,
    uid: '9db12327-ae46-11e9-aefd-d6c200451d50',
    resourceVersion: '146053',
    creationTimestamp: '2019-07-24T19:09:52Z',
    labels: {
      name: 'policies-policy-mcm-ibm-com-1563995392802',
    },
    annotations: {
      'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
      'mcm.ibm.com/user-identity': 'aHR0cHM6Ly8xMjcuMC4wLjE6OTQ0My9vaWRjL2VuZHBvaW50L09QI2FkbWlu',
    },
  },
  spec: {
    scope: {
      resource: 'policies.policy.open-cluster-management.io',
    },
  },
  status: {},
};

export const mockClusterListResponse = {
  data: {
    clustersInPolicy: [
      {
        name: 'cluster1',
        metadata: {
          labels: {
            cloud: 'IBM',
            datacenter: 'toronto',
            environment: 'Dev',
            name: 'cluster1',
            owner: 'marketing',
            region: 'US',
            vendor: 'ICP',
          },
          name: 'cluster1',
          namespace: 'cluster1',
          annotations: {
            'mcm.ibm.com/deployer-prefix': 'md',
            'mcm.ibm.com/secretRef': 'cluster1-federation-secret',
            'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNsdXN0ZXIxOmNsdXN0ZXIx',
          },
          uid: '16870299-a7ca-11e9-aefd-d6c200451d50',
          selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/cluster1/clusterstatuses/cluster1`,
        },
        kind: 'Cluster',
        apiVersion: 'clusterregistry.k8s.io/v1alpha1',
        spec: {
          consoleURL: 'https://9.42.78.148:8443',
        },
        status: {
          conditions: [
            {
              type: 'OK',
              status: '',
              lastHeartbeatTime: '2019-07-22T16:44:32Z',
              lastTransitionTime: null,
            },
          ],
        },
        total: '1',
        violated: '0',
        policy: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndCommunicationsProtections,SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor,VA","policy.open-cluster-management.io/standards":"NIST,HIPAA"},"name":"policy-role","namespace":"mcm"},"spec":{"namespaces":{"exclude":["kube*"],"include":["default"]},"remediationAction":"inform","role-templates":[{"apiVersion":"roletemplate.mcm.ibm.com/v1alpha1","complianceType":"musthave","metadata":{"name":"operator-role-policy","namespace":""},"rules":[{"complianceType":"musthave","policyRule":{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","create","delete","patch"]}}],"selector":{"matchLabels":{"dev":"true"}}}]}}',
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
              'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
              'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
              'seed-generation': '2',
            },
            creationTimestamp: '2019-07-22T13:45:06Z',
            finalizers: [
              'policy.finalizer.mcm.ibm.com',
              'sync.finalizer.mcm.ibm.com',
            ],
            generation: 2,
            name: 'policy-role',
            namespace: 'cluster1',
            resourceVersion: '12597689',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/cluster1/policies/policy-role`,
            uid: 'ea2dde00-ac86-11e9-af27-005056a0e992',
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
                metadata: {
                  creationTimestamp: null,
                  name: 'operator-role-policy',
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
                        'create',
                        'delete',
                        'patch',
                      ],
                    },
                  },
                ],
                selector: {
                  matchLabels: {
                    dev: 'true',
                  },
                },
                status: {
                  Compliant: 'Compliant',
                  Validity: {
                    valid: true,
                  },
                  conditions: [
                    {
                      lastTransitionTime: '2019-07-22T13:45:11Z',
                      message: 'k8s RBAC role "operator-role-policy" exists and matches',
                      reason: 'K8s RBAC role matches',
                      status: 'True',
                      type: 'completed',
                    },
                  ],
                },
              },
            ],
          },
          status: {
            compliant: 'Compliant',
            valid: true,
          },
        },
      },
      {
        name: 'clusterhub',
        metadata: {
          labels: {
            cloud: 'IBM',
            datacenter: 'toronto',
            environment: 'Dev',
            name: 'clusterhub',
            owner: 'marketing',
            region: 'US',
            vendor: 'ICP',
          },
          name: 'clusterhub',
          namespace: 'clusterhub',
          annotations: {
            'mcm.ibm.com/deployer-prefix': 'md',
            'mcm.ibm.com/secretRef': 'clusterhub-federation-secret',
            'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
            'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNsdXN0ZXJodWI6Y2x1c3Rlcmh1Yg==',
          },
          uid: '3976ec4a-a7c9-11e9-aefd-d6c200451d50',
          selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/clusterhub/clusterstatuses/clusterhub`,
        },
        kind: 'Cluster',
        apiVersion: 'clusterregistry.k8s.io/v1alpha1',
        spec: {
          consoleURL: 'https://9.42.81.137:8443',
        },
        status: {
          conditions: [
            {
              type: 'OK',
              status: '',
              lastHeartbeatTime: '2019-07-22T16:44:43Z',
              lastTransitionTime: null,
            },
          ],
        },
        total: '1',
        violated: '1',
        policy: {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            annotations: {
              'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"policy.open-cluster-management.io/v1","kind":"Policy","metadata":{"annotations":{"policy.open-cluster-management.io/categories":"SystemAndCommunicationsProtections,SystemAndInformationIntegrity","policy.open-cluster-management.io/controls":"MutationAdvisor,VA","policy.open-cluster-management.io/standards":"NIST,HIPAA"},"name":"policy-role","namespace":"mcm"},"spec":{"namespaces":{"exclude":["kube*"],"include":["default"]},"remediationAction":"inform","role-templates":[{"apiVersion":"roletemplate.mcm.ibm.com/v1alpha1","complianceType":"musthave","metadata":{"name":"operator-role-policy","namespace":""},"rules":[{"complianceType":"musthave","policyRule":{"apiGroups":["extensions","apps"],"resources":["deployments"],"verbs":["get","list","watch","create","delete","patch"]}}],"selector":{"matchLabels":{"dev":"true"}}}]}}',
              'policy.open-cluster-management.io/categories': 'SystemAndCommunicationsProtections,SystemAndInformationIntegrity',
              'policy.open-cluster-management.io/controls': 'MutationAdvisor,VA',
              'policy.open-cluster-management.io/standards': 'NIST,HIPAA',
              'seed-generation': '3004',
            },
            creationTimestamp: '2019-07-22T13:45:06Z',
            finalizers: [
              'propagator.finalizer.mcm.ibm.com',
              'policy.finalizer.mcm.ibm.com',
            ],
            generation: 3004,
            name: 'policy-role',
            namespace: 'clusterhub',
            ownerReferences: [
              {
                apiVersion: 'policy.open-cluster-management.io/v1',
                blockOwnerDeletion: true,
                controller: true,
                kind: 'Policy',
                name: 'policy-role',
                uid: '47dbc091-a7cc-11e9-8a41-005056a061f1',
              },
            ],
            resourceVersion: '1229059',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/clusterhub/policies/policy-role`,
            uid: 'ea2cc1bd-ac86-11e9-8a41-005056a061f1',
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
                metadata: {
                  creationTimestamp: null,
                  name: 'operator-role-policy',
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
                        'create',
                        'delete',
                        'patch',
                      ],
                    },
                  },
                ],
                selector: {
                  matchLabels: {
                    dev: 'true',
                  },
                },
                status: {
                  Compliant: 'NonCompliant',
                  Validity: {
                    valid: true,
                  },
                  conditions: [
                    {
                      lastTransitionTime: '2019-07-22T16:44:58Z',
                      message: 'k8s RBAC role is missing: operator-role-policy',
                      reason: 'K8s RBAC role is missing',
                      status: 'True',
                      type: 'completed',
                    },
                  ],
                },
              },
            ],
          },
          status: {
            compliant: 'NonCompliant',
            valid: true,
          },
        },
      },
    ],
  },
};

export const mockCluster1ListResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/cluster1/clusterstatuses`,
    resourceVersion: '161225',
  },
  items: [
    {
      metadata: {
        name: 'cluster1',
        namespace: 'cluster1',
        selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/cluster1/clusterstatuses/cluster1`,
        uid: 'c0eb1c8b-e482-11e9-aa00-96bb9600cc18',
        resourceVersion: '161218',
        creationTimestamp: '2019-10-01T19:36:24Z',
        labels: {
          cluster1: 'cluster1',
          environment: 'Dev',
          name: 'cluster1',
          region: 'US',
        },
        annotations: {
          'mcm.ibm.com/deployer-prefix': 'md',
          'mcm.ibm.com/secretRef': 'cluster1-federation-secret',
          'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNsdXN0ZXIxOmNsdXN0ZXIx',
        },
        ownerReferences: [
          {
            apiVersion: 'mcm.ibm.com/__internal',
            kind: 'Cluster',
            name: 'cluster1',
            uid: '6120d6bb-e482-11e9-aa00-96bb9600cc18',
            controller: true,
            blockOwnerDeletion: true,
          },
        ],
      },
      spec: {
        masterAddresses: [
          {
            ip: '9.42.82.160',
          },
        ],
        consoleURL: 'https://9.42.82.160:8443',
        capacity: {
          cpu: '32',
          memory: '64186Mi',
          nodes: '4',
          storage: '90Gi',
        },
        usage: {
          cpu: '14313m',
          memory: '39772Mi',
          pods: '160',
          storage: '90Gi',
        },
        klusterletEndpoint: {
          ip: '9.42.82.160',
          hostname: 'cluster1.klusterlet.mcm',
        },
        klusterletPort: {
          name: 'https',
          port: 443,
          protocol: 'TCP',
        },
        monitoringScrapeTarget: 'kubernetes-cadvisor',
        klusterletVersion: '3.2.1',
        version: 'v1.13.9+icp-ee',
        klusterletCA: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZwekNDQTQrZ0F3SUJBZ0lVSEIrQWdjaGZUS1RBeU1FR2x4TkdHcEhDVnowd0RRWUpLb1pJaHZjTkFRRUwKQlFBd1l6RUxNQWtHQTFVRUJoTUNWVk14RVRBUEJnTlZCQWdNQ0U1bGR5QlpiM0pyTVE4d0RRWURWUVFIREFaQgpjbTF2Ym1zeEdqQVlCZ05WQkFvTUVVbENUU0JEYkc5MVpDQlFjbWwyWVhSbE1SUXdFZ1lEVlFRRERBdDNkM2N1CmFXSnRMbU52YlRBZUZ3MHhPVEV3TURFeE9ERTVNemRhRncweU9UQTVNamd4T0RFNU16ZGFNR014Q3pBSkJnTlYKQkFZVEFsVlRNUkV3RHdZRFZRUUlEQWhPWlhjZ1dXOXlhekVQTUEwR0ExVUVCd3dHUVhKdGIyNXJNUm93R0FZRApWUVFLREJGSlFrMGdRMnh2ZFdRZ1VISnBkbUYwWlRFVU1CSUdBMVVFQXd3TGQzZDNMbWxpYlM1amIyMHdnZ0lpCk1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQ0R3QXdnZ0lLQW9JQ0FRRGNZZFRSY2NDM1VPY2p0ejBac0Q1dkZHWW0KQlpUa09UR0dsclNrWnB1d2pQREl1TzhLbkJxZXJmQnhNUFFxeGsvM3ErNUtVM0QzSkFNUUtqekZWM2xaMW9SZApySi9qQ1FPMFZFV3lVVVVnTm5oTzhPUGJ3bFRkRTUzenlQWmhJSGdPYkhmbW02RUh1NnRNNm1QQnJjaGxzRFNjCjByMTZ2OGhGaVZ5Mmg4K1FIc2hZREhoaHl1N3RleFpnREZLWG9DcHl4MmcweTJqc2FDTVNQRzFTNSt5aGMvRW8KendGWHhTN0Nvd0xrRzRoV3RuYnk2K3QwU2JLMGN5NGd2amtpWVVybXpZT0VLWU8xR3FMUEozTzNhOWJuSXNNSApqQTMrNVl1UWRseThiNkxndE1IVW8zMmc4NWtxVk9GZkNKbDY5UnppTElMaXJuczRlakloT1BWK2tTOU0zM3dkCndPR2l3WmhUVnFsbzV4a0hmNHhDNUxkdlRSSng1bW94bzROMmRmWlNSSmRFcTZ3bGs3enR5ZERneTRtaFQxK2YKVXEzcXhqTmh3VVo4MFRhUmlpNlBCRXFEbUZSQ0QvKzJ2R1Nobm9xbXpwb0lPd2p4N05wZTBSNlpTYkxKdU5hWgpNSGMzUGVOVENqR0JPREdOS3ZHcUQ1bVRNclF3bU5XREhaZzhhV3hldGdhUXNKNmgzUnFQdTY0N1dGM25DZkVQCkVrejBwN1MxTjdiSWV3UmFvOUdDRlJ5aW9oNE5YS0R3ZzFtMzZObFdpeXl4L1Y0UmJsNFA1SEZMR1JNSzRBMUEKS2VSQUdkY1lLaFE5eThSTFdheU1lZmQ2clBQSjZ2UWprdmU0Z0ZkbkNoalhURmV2QkxiTmplZHZsUkxZQXBoUQpZS1JXWURZS1hCYURYM1VONHdJREFRQUJvMU13VVRBZEJnTlZIUTRFRmdRVUdSQ1AvVXN1SVp0VEQ1a3RmUkNCCmk3YkRocFF3SHdZRFZSMGpCQmd3Rm9BVUdSQ1AvVXN1SVp0VEQ1a3RmUkNCaTdiRGhwUXdEd1lEVlIwVEFRSC8KQkFVd0F3RUIvekFOQmdrcWhraUc5dzBCQVFzRkFBT0NBZ0VBamJla0xQNUFsazBOeHJyaFI1aVdzdVd4ZGVHSgpqcHdzUWdTVnVFbFdSZFJ2ZURQOEk1a0o2YW54ekM2ZlpXbWZvOUQzeXBlVDZQV250c1VNMDhhWGoxZXJ5azhJCjd4SFYrZnc2cmZmSG43VTlZRlNsaXpXRU5DNUtTY2dhZDFMZHdZanZKWkdpSnEvd0piMXZXN0VSNHJuVkp1cHcKQ1F4WjM0c2pMMEtvR3ZKeUIwTjVQV3c4VXh5SkFQTG5IQlp3Rncxdk0zbVhaeUlOYlFVanFRaFkxb2tEaXdYSAo5elVZSGNNdjYwWktBUWNHZkJkaklKTUozWWRMREVzd1hWa1VoL2YvVHJxOTBmazJNUXd1Y29qN25uNmsxV2E5ClprUEsxQjVrWmFVVllEQ1hBd1VPekp2L2dvdmplSzlWK2NuL29oaWc3QUYrQ3UxbXMwaWlzM01OTTUzU2h2b1MKUFAyNXhqREdXdTRyc2N2bGh6ejBRZlJoY1hjdW55eFNKOXdDdVpmR2ZINUlWMUtNUVlpSGtOMkpkdG82Q1VwbApLeU5jK0dSbVB5dFdpUGxudk1kZUQvc1pBRHoybENmVWplTTN6VWJ6T2pVdG1yR202Wm9BUGRjNXRhMWg1ZDA5CmVSclJtbm1UejdjUGJMM3NncDZXN3NGL2s5QkFsdkRLa0N3K2gxdW14bjVRc3ZpSW41Q1V3QlJ2N2c0dzAzbEkKRjFYOHM0bSt4TTgxMFJQK2ZwdklOYyt3TXBCZ2Z5V1IrSWU0OWR3RlRrVERFZ0NUQlRFNUlXMjdHQ3JKQ3V3aAo2OC9tN1gwbUl1UVlTLzlqODFidnd2SzF6WEdKelhOYjZ2TWRuQXNVNE9WQWpkVTVSSXlXNkowU2NqL0l4Vys4CkVmcmV3a3V1TC9jSEpyMD0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        monitoringEndpoint: {
          ip: '',
        },
        monitoringPort: {
          port: 0,
        },
        monitoringSecretRef: {

        },
      },
    },
  ],
};

export const mockClusterHubListResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/clusterhub/clusterstatuses`,
    resourceVersion: '161241',
  },
  items: [
    {
      metadata: {
        name: 'clusterhub',
        namespace: 'clusterhub',
        selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/clusterhub/clusterstatuses/clusterhub`,
        uid: '96c98100-e482-11e9-aa00-96bb9600cc18',
        resourceVersion: '160705',
        creationTimestamp: '2019-10-01T19:35:13Z',
        labels: {
          environment: 'Dev',
          name: 'clusterhub',
          region: 'US',
        },
        annotations: {
          'mcm.ibm.com/deployer-prefix': 'md',
          'mcm.ibm.com/secretRef': 'clusterhub-federation-secret',
          'mcm.ibm.com/user-group': 'aGNtOmNsdXN0ZXJzLHN5c3RlbTphdXRoZW50aWNhdGVk',
          'mcm.ibm.com/user-identity': 'aGNtOmNsdXN0ZXJzOmNsdXN0ZXJodWI6Y2x1c3Rlcmh1Yg==',
        },
        ownerReferences: [
          {
            apiVersion: 'mcm.ibm.com/__internal',
            kind: 'Cluster',
            name: 'clusterhub',
            uid: '24466f0f-e482-11e9-aa00-96bb9600cc18',
            controller: true,
            blockOwnerDeletion: true,
          },
        ],
      },
      spec: {
        masterAddresses: [
          {
            ip: '9.42.82.240',
          },
        ],
        consoleURL: 'https://9.42.82.240:8443',
        capacity: {
          cpu: '32',
          memory: '64186Mi',
          nodes: '4',
          storage: '60Gi',
        },
        usage: {
          cpu: '12443m',
          memory: '30806Mi',
          pods: '130',
          storage: '60Gi',
        },
        klusterletEndpoint: {
          ip: '9.42.82.240',
          hostname: 'clusterhub.klusterlet.mcm',
        },
        klusterletPort: {
          name: 'https',
          port: 443,
          protocol: 'TCP',
        },
        monitoringScrapeTarget: 'kubernetes-cadvisor',
        klusterletVersion: '3.2.1',
        version: 'v1.13.9+icp-ee',
        klusterletCA: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUZwekNDQTQrZ0F3SUJBZ0lVSEIrQWdjaGZUS1RBeU1FR2x4TkdHcEhDVnowd0RRWUpLb1pJaHZjTkFRRUwKQlFBd1l6RUxNQWtHQTFVRUJoTUNWVk14RVRBUEJnTlZCQWdNQ0U1bGR5QlpiM0pyTVE4d0RRWURWUVFIREFaQgpjbTF2Ym1zeEdqQVlCZ05WQkFvTUVVbENUU0JEYkc5MVpDQlFjbWwyWVhSbE1SUXdFZ1lEVlFRRERBdDNkM2N1CmFXSnRMbU52YlRBZUZ3MHhPVEV3TURFeE9ERTVNemRhRncweU9UQTVNamd4T0RFNU16ZGFNR014Q3pBSkJnTlYKQkFZVEFsVlRNUkV3RHdZRFZRUUlEQWhPWlhjZ1dXOXlhekVQTUEwR0ExVUVCd3dHUVhKdGIyNXJNUm93R0FZRApWUVFLREJGSlFrMGdRMnh2ZFdRZ1VISnBkbUYwWlRFVU1CSUdBMVVFQXd3TGQzZDNMbWxpYlM1amIyMHdnZ0lpCk1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQ0R3QXdnZ0lLQW9JQ0FRRGNZZFRSY2NDM1VPY2p0ejBac0Q1dkZHWW0KQlpUa09UR0dsclNrWnB1d2pQREl1TzhLbkJxZXJmQnhNUFFxeGsvM3ErNUtVM0QzSkFNUUtqekZWM2xaMW9SZApySi9qQ1FPMFZFV3lVVVVnTm5oTzhPUGJ3bFRkRTUzenlQWmhJSGdPYkhmbW02RUh1NnRNNm1QQnJjaGxzRFNjCjByMTZ2OGhGaVZ5Mmg4K1FIc2hZREhoaHl1N3RleFpnREZLWG9DcHl4MmcweTJqc2FDTVNQRzFTNSt5aGMvRW8KendGWHhTN0Nvd0xrRzRoV3RuYnk2K3QwU2JLMGN5NGd2amtpWVVybXpZT0VLWU8xR3FMUEozTzNhOWJuSXNNSApqQTMrNVl1UWRseThiNkxndE1IVW8zMmc4NWtxVk9GZkNKbDY5UnppTElMaXJuczRlakloT1BWK2tTOU0zM3dkCndPR2l3WmhUVnFsbzV4a0hmNHhDNUxkdlRSSng1bW94bzROMmRmWlNSSmRFcTZ3bGs3enR5ZERneTRtaFQxK2YKVXEzcXhqTmh3VVo4MFRhUmlpNlBCRXFEbUZSQ0QvKzJ2R1Nobm9xbXpwb0lPd2p4N05wZTBSNlpTYkxKdU5hWgpNSGMzUGVOVENqR0JPREdOS3ZHcUQ1bVRNclF3bU5XREhaZzhhV3hldGdhUXNKNmgzUnFQdTY0N1dGM25DZkVQCkVrejBwN1MxTjdiSWV3UmFvOUdDRlJ5aW9oNE5YS0R3ZzFtMzZObFdpeXl4L1Y0UmJsNFA1SEZMR1JNSzRBMUEKS2VSQUdkY1lLaFE5eThSTFdheU1lZmQ2clBQSjZ2UWprdmU0Z0ZkbkNoalhURmV2QkxiTmplZHZsUkxZQXBoUQpZS1JXWURZS1hCYURYM1VONHdJREFRQUJvMU13VVRBZEJnTlZIUTRFRmdRVUdSQ1AvVXN1SVp0VEQ1a3RmUkNCCmk3YkRocFF3SHdZRFZSMGpCQmd3Rm9BVUdSQ1AvVXN1SVp0VEQ1a3RmUkNCaTdiRGhwUXdEd1lEVlIwVEFRSC8KQkFVd0F3RUIvekFOQmdrcWhraUc5dzBCQVFzRkFBT0NBZ0VBamJla0xQNUFsazBOeHJyaFI1aVdzdVd4ZGVHSgpqcHdzUWdTVnVFbFdSZFJ2ZURQOEk1a0o2YW54ekM2ZlpXbWZvOUQzeXBlVDZQV250c1VNMDhhWGoxZXJ5azhJCjd4SFYrZnc2cmZmSG43VTlZRlNsaXpXRU5DNUtTY2dhZDFMZHdZanZKWkdpSnEvd0piMXZXN0VSNHJuVkp1cHcKQ1F4WjM0c2pMMEtvR3ZKeUIwTjVQV3c4VXh5SkFQTG5IQlp3Rncxdk0zbVhaeUlOYlFVanFRaFkxb2tEaXdYSAo5elVZSGNNdjYwWktBUWNHZkJkaklKTUozWWRMREVzd1hWa1VoL2YvVHJxOTBmazJNUXd1Y29qN25uNmsxV2E5ClprUEsxQjVrWmFVVllEQ1hBd1VPekp2L2dvdmplSzlWK2NuL29oaWc3QUYrQ3UxbXMwaWlzM01OTTUzU2h2b1MKUFAyNXhqREdXdTRyc2N2bGh6ejBRZlJoY1hjdW55eFNKOXdDdVpmR2ZINUlWMUtNUVlpSGtOMkpkdG82Q1VwbApLeU5jK0dSbVB5dFdpUGxudk1kZUQvc1pBRHoybENmVWplTTN6VWJ6T2pVdG1yR202Wm9BUGRjNXRhMWg1ZDA5CmVSclJtbm1UejdjUGJMM3NncDZXN3NGL2s5QkFsdkRLa0N3K2gxdW14bjVRc3ZpSW41Q1V3QlJ2N2c0dzAzbEkKRjFYOHM0bSt4TTgxMFJQK2ZwdklOYyt3TXBCZ2Z5V1IrSWU0OWR3RlRrVERFZ0NUQlRFNUlXMjdHQ3JKQ3V3aAo2OC9tN1gwbUl1UVlTLzlqODFidnd2SzF6WEdKelhOYjZ2TWRuQXNVNE9WQWpkVTVSSXlXNkowU2NqL0l4Vys4CkVmcmV3a3V1TC9jSEpyMD0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=',
        monitoringEndpoint: {
          ip: '',
        },
        monitoringPort: {
          port: 0,
        },
        monitoringSecretRef: {

        },
      },
    },
  ],
};

export const mockDefaultListResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/default/clusterstatuses`,
    resourceVersion: '161250',
  },
  items: [],
};

export const mockKubeSystemListResponse = {
  kind: 'ClusterStatusList',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/kube-system/clusterstatuses`,
    resourceVersion: '161284',
  },
  items: [],
};

export const mockViolationListResponse = {
  data: {
    violations: {
      cluster: 'clusterhub',
      message: 'k8s RBAC role is missing: operator-role-policy',
      name: 'operator-role-policy',
      reason: 'K8s RBAC role is missing',
      selector: {
        matchLabels: {
          dev: 'true',
        },
      },
      status: 'NonCompliant',
      __typename: 'Violations',
    },
  },
};

export const mockPolicyListResponse = {
  kind: 'ResourceView',
  apiVersion: 'mcm.ibm.com/v1alpha1',
  metadata: {
    name: 'policy-1546551175122',
    namespace: 'default',
    selfLink: `/apis/${ApiGroup.mcmGroup}/${ApiGroup.mcmVersion}/namespaces/default/resourceviews/policy-1546551175122`,
    uid: '21c50bb6-0f9f-11e9-a535-e2d4c161f9ad',
    resourceVersion: '30574',
    creationTimestamp: '2019-01-03T21:32:55Z',
    labels: {
      name: 'policy-1546551175122',
    },
    annotations: {
      'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
      'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
    },
  },
  spec: {
    clusterSelector: {
      matchLabels: {
        name: 'cluster2',
      },
    },
    scope: {
      resource: 'policy',
      resourceName: 'policy-all',
      namespace: 'mcm-cluster2',
    },
  },
  status: {
    conditions: [{
      type: 'Completed',
      lastUpdateTime: '2019-01-03T21:32:55Z',
    }],
    results: {
      cluster2: {
        apiVersion: 'policy.open-cluster-management.io/v1',
        kind: 'Policy',
        metadata: {
          annotations: {
            'seed-generation': '7',
          },
          creationTimestamp: '2019-01-03T16:29:46Z',
          finalizers: [
            'finalizer.mcm.ibm.com',
          ],
          generation: 1,
          labels: {
            compliance: 'compliance-all',
            ignore: 'false',
          },
          name: 'policy-all',
          namespace: 'mcm-cluster2',
          ownerReferences: [{
            apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
            blockOwnerDeletion: true,
            controller: true,
            kind: 'Compliance',
            name: 'compliance-all',
            uid: 'c8ad7adb-0f74-11e9-9723-0e8b333ab57e',
          }],
          resourceVersion: '5543743',
          selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm-cluster2/policies/policy-all`,
          uid: 'c8af7ef9-0f74-11e9-9723-0e8b333ab57e',
        },
        spec: {
          complianceType: 'musthave',
          namespaces: {
            exclude: [
              'kube*',
            ],
            include: [
              'default',
            ],
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
              Compliant: 'Compliant',
              Validity: {},
              conditions: [{
                lastTransitionTime: '2019-01-03T21:32:49Z',
                message: 'pods `nginx` exists as it should be, therefore the this Object template is compliant',
                reason: 'K8s `must have` object already exists',
                status: 'True',
                type: 'notification',
              }],
            },
          },
          {
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
              Compliant: 'Compliant',
              Validity: {},
              conditions: [{
                lastTransitionTime: '2019-01-03T21:32:49Z',
                message: 'namespaces `production` exists as it should be, therefore the this Object template is compliant',
                reason: 'K8s `must have` object already exists',
                status: 'True',
                type: 'notification',
              }],
            },
          },
          {
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
              Compliant: 'Compliant',
              Validity: {},
              conditions: [{
                lastTransitionTime: '2019-01-03T21:32:49Z',
                message: 'rolebindings `operate-pods-rolebinding` exists as it should be, therefore the this Object template is compliant',
                reason: 'K8s `must have` object already exists',
                status: 'True',
                type: 'notification',
              }],
            },
          },
          {
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
                allowedCapabilities: [
                  '*',
                ],
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
                volumes: [
                  '*',
                ],
              },
            },
            status: {
              Compliant: 'Compliant',
              Validity: {},
              conditions: [{
                lastTransitionTime: '2019-01-03T21:32:49Z',
                message: 'podsecuritypolicies `privileged-mcm` exists as it should be, therefore the this Object template is compliant',
                reason: 'K8s `must have` object already exists',
                status: 'True',
                type: 'notification',
              }],
            },
          },
          {
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
              Compliant: 'Compliant',
              Validity: {},
              conditions: [{
                lastTransitionTime: '2019-01-03T21:32:49Z',
                message: 'networkpolicies `allow-all-mcm` exists as it should be, therefore the this Object template is compliant',
                reason: 'K8s `must have` object already exists',
                status: 'True',
                type: 'notification',
              }],
            },
          },
          {
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
              Compliant: 'Compliant',
              Validity: {},
              conditions: [{
                lastTransitionTime: '2019-01-03T21:32:53Z',
                message: 'limitranges `mem-limit-range` exists as it should be, therefore the this Object template is compliant',
                reason: 'K8s `must have` object already exists',
                status: 'True',
                type: 'notification',
              }],
            },
          },
          ],
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
            }],
            selector: {
              matchLabels: {
                hipaa: 'true',
              },
            },
            status: {
              Compliant: 'Compliant',
              Validity: {
                valid: true,
              },
            },
          }],
        },
        status: {
          compliant: 'Compliant',
          valid: true,
        },
      },
    },
  },
};

export const mockSinglePolicyResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    creationTimestamp: '2018-09-04T16:13:50Z',
    finalizers: [
      'finalizer.mcm.ibm.com',
    ],
    generation: 1,
    labels: {
      compliance: 'compliance-xz',
    },
    name: 'policy-xz-1',
    namespace: 'mycluster',
    ownerReferences: [
      {
        apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'Compliance',
        name: 'compliance-xz',
        uid: '82de70e7-b05d-11e8-9a12-005056a0d11b',
      },
    ],
    resourceVersion: '4349995',
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mycluster/policies/policy-xz-1`,
    uid: '82e00acc-b05d-11e8-9a12-005056a0d11b',
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
    remediationAction: 'inform',
    'role-templates': [
      {
        apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
        complianceType: 'musthave',
        kind: 'RoleTemplate',
        metadata: {
          creationTimestamp: null,
          name: 'role-xz-1',
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
                'create',
                'delete',
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
          Compliant: 'NonCompliant',
          Validity: {
            valid: true,
          },
          conditions: [
            {
              lastTransitionTime: '2018-09-06T15:14:44Z',
              message: 'k8s RBAC role is missing: role-xz-1',
              reason: 'K8s RBAC role is missing',
              status: 'True',
              type: 'completed',
            },
          ],
        },
      },
    ],
  },
  status: {
    Compliant: 'NonCompliant',
    Valid: true,
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
};

export const mockPlacementRuleResponse = {
  kind: 'PlacementRuleList',
  apiVersion: 'apps.open-cluster-management.io/v1',
  metadata: {
    selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/mcm/placementrules`,
    resourceVersion: '51490',
  },
  items: [
    {
      metadata: {
        name: 'placement-xz',
        namespace: 'mcm',
        selfLink: `/apis/${ApiGroup.appsGroup}/${ApiGroup.version}/namespaces/mcm/placementrules/placement-xz`,
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
            clusterName: 'cluster3',
            clusterNamespace: 'cluster3',
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
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/placementbindings`,
    resourceVersion: '48564',
  },
  items: [
    {
      metadata: {
        name: 'binding-xz',
        namespace: 'mcm',
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/mcm/placementbindings/binding-xz`,
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

export const mockDeleteResponse = {
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
    labels: { 'cluster-name': 'calamari', 'cluster-namespace': 'calamari', 'root-policy': 'default.case1-test-policy' },
    name: 'default.case1-test-policy',
    namespace: 'calamari',
    ownerReferences: [{
      apiVersion: 'policy.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'Policy', name: 'case1-test-policy', uid: 'e919bf5c-df16-4b90-ae01-a39da7138623',
    }],
    resourceVersion: '27550274',
    selfLink: '/apis/policy.open-cluster-management.io/v1/namespaces/calamari/policies/default.case1-test-policy',
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
