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

export const mockAPIResourceList = {
  kind: 'APIResourceList',
  apiVersion: 'v1',
  groupVersion: 'policy.mcm.ibm.com/v1alpha1',
  resources:
  [
    {
      name: 'policies',
      singularName: 'policy',
      namespaced: true,
      kind: 'Policy',
      verbs: [Array],
      shortNames: [Array],
    },
  ],
};

export const kubeGetMock = {
  paths: [
    '/api',
    '/api/v1',
    '/apis',
    '/apis/',
    '/apis/admissionregistration.k8s.io',
    '/apis/admissionregistration.k8s.io/v1alpha1',
    '/apis/admissionregistration.k8s.io/v1beta1',
    '/apis/apiextensions.k8s.io',
    '/apis/apiextensions.k8s.io/v1beta1',
    '/apis/apiregistration.k8s.io',
    '/apis/apiregistration.k8s.io/v1',
    '/apis/apiregistration.k8s.io/v1beta1',
    '/apis/app.ibm.com',
    '/apis/app.ibm.com/v1alpha1',
    '/apis/app.k8s.io',
    '/apis/app.k8s.io/v1beta1',
    '/apis/apps',
    '/apis/apps/v1',
    '/apis/apps/v1beta1',
    '/apis/apps/v1beta2',
    '/apis/authentication.k8s.io',
    '/apis/authentication.k8s.io/v1',
    '/apis/authentication.k8s.io/v1beta1',
    '/apis/authorization.k8s.io',
    '/apis/authorization.k8s.io/v1',
    '/apis/authorization.k8s.io/v1beta1',
    '/apis/autoscaling',
    '/apis/autoscaling/v1',
    '/apis/autoscaling/v2beta1',
    '/apis/autoscaling/v2beta2',
    '/apis/batch',
    '/apis/batch/v1',
    '/apis/batch/v1beta1',
    '/apis/batch/v2alpha1',
    '/apis/certificates.k8s.io',
    '/apis/certificates.k8s.io/v1beta1',
    '/apis/certmanager.k8s.io',
    '/apis/certmanager.k8s.io/v1alpha1',
    '/apis/clusterregistry.k8s.io',
    '/apis/clusterregistry.k8s.io/v1alpha1',
    '/apis/coordination.k8s.io',
    '/apis/coordination.k8s.io/v1beta1',
    '/apis/events.k8s.io',
    '/apis/events.k8s.io/v1beta1',
    '/apis/extensions',
    '/apis/extensions/v1beta1',
    '/apis/icp.ibm.com',
    '/apis/icp.ibm.com/v1',
    '/apis/mcm.ibm.com',
    '/apis/mcm.ibm.com/v1alpha1',
    '/apis/metrics.k8s.io',
    '/apis/metrics.k8s.io/v1beta1',
    '/apis/monitoring.coreos.com',
    '/apis/monitoring.coreos.com/v1',
    '/apis/monitoringcontroller.cloud.ibm.com',
    '/apis/monitoringcontroller.cloud.ibm.com/v1',
    '/apis/networking.k8s.io',
    '/apis/networking.k8s.io/v1',
    '/apis/policies.ibm.com',
    '/apis/policies.ibm.com/v1alpha1',
    '/apis/policy',
    '/apis/policy.mcm.ibm.com',
    '/apis/policy.mcm.ibm.com/v1alpha1',
    '/apis/policy/v1beta1',
    '/apis/rbac.authorization.k8s.io',
    '/apis/rbac.authorization.k8s.io/v1',
    '/apis/rbac.authorization.k8s.io/v1beta1',
    '/apis/scheduling.k8s.io',
    '/apis/scheduling.k8s.io/v1beta1',
    '/apis/securityenforcement.admission.cloud.ibm.com',
    '/apis/securityenforcement.admission.cloud.ibm.com/v1beta1',
    '/apis/servicecatalog.k8s.io',
    '/apis/servicecatalog.k8s.io/v1beta1',
    '/apis/storage.k8s.io',
    '/apis/storage.k8s.io/v1',
    '/apis/storage.k8s.io/v1beta1',
    '/healthz',
    '/healthz/autoregister-completion',
    '/healthz/etcd',
    '/healthz/log',
    '/healthz/ping',
    '/healthz/poststarthook/apiservice-openapi-controller',
    '/healthz/poststarthook/apiservice-registration-controller',
    '/healthz/poststarthook/apiservice-status-available-controller',
    '/healthz/poststarthook/bootstrap-controller',
    '/healthz/poststarthook/ca-registration',
    '/healthz/poststarthook/generic-apiserver-start-informers',
    '/healthz/poststarthook/kube-apiserver-autoregistration',
    '/healthz/poststarthook/rbac/bootstrap-roles',
    '/healthz/poststarthook/scheduling/bootstrap-system-priority-classes',
    '/healthz/poststarthook/start-apiextensions-controllers',
    '/healthz/poststarthook/start-apiextensions-informers',
    '/healthz/poststarthook/start-kube-aggregator-informers',
    '/healthz/poststarthook/start-kube-apiserver-admission-initializer',
    '/logs',
    '/metrics',
    '/openapi/v2',
    '/swagger-2.0.0.json',
    '/swagger-2.0.0.pb-v1',
    '/swagger-2.0.0.pb-v1.gz',
    '/swagger.json',
    '/swaggerapi',
    '/version',
  ],
};

export const mockCreateResourcesResponse = {
  data: {
    createResources: {
      errors: [],
      result: [
        {
          apiVersion: 'policy.mcm.ibm.com/v1alpha1',
          kind: 'Policy',
          metadata: {
            creationTimestamp: '2019-07-24T16:13:38Z',
            generation: 1,
            name: 'test-policy',
            namespace: 'mcm',
            resourceVersion: '1688805',
            selfLink: `${ApiURL.mcmPolicyApiURL}mcm/policies/test-policy`,
            uid: 'fec7f06c-ae2d-11e9-8a41-005056a061f1',
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
            remediationAction: 'inform',
          },
        },
      ],
    },
  },
};

export const mockUpdateResourcesResponse = {
  data: {
    updateResource: {
      apiVersion: 'policy.mcm.ibm.com/v1alpha1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.mcm.ibm.com/categories': 'hello',
          'policy.mcm.ibm.com/controls': '',
          'policy.mcm.ibm.com/standards': '',
          'seed-generation': '1',
        },
        creationTimestamp: '2019-07-24T13:27:59Z',
        finalizers: [
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 6,
        name: 'test-policy',
        namespace: 'mcm',
        resourceVersion: '1673886',
        selfLink: `${ApiURL.mcmPolicyApiURL}mcm/policies/test-policy`,
        uid: 'da8f9553-ae16-11e9-8a41-005056a061f1',
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
          },
        ],
        remediationAction: 'inform',
      },
    },
  },
};
