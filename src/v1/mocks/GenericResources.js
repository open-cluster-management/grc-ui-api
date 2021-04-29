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

export const mockAPIResourceList = {
  kind: 'APIResourceList',
  apiVersion: 'v1',
  groupVersion: 'policy.open-cluster-management.io/v1',
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
    '/apis/policy.open-cluster-management.io',
    '/apis/policy.open-cluster-management.io/v1',
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

export const mockGetResourceResponse = {
  apiVersion: 'policy.open-cluster-management.io/v1',
  kind: 'Policy',
  metadata: {
    annotations: {
      'policy.open-cluster-management.io/categories': 'hello',
      'policy.open-cluster-management.io/controls': '',
      'policy.open-cluster-management.io/standards': '',
      'seed-generation': '1',
    },
    creationTimestamp: '2019-07-24T13:27:59Z',
    finalizers: [
      'propagator.finalizer.mcm.ibm.com',
    ],
    generation: 6,
    name: 'test-policy',
    namespace: 'policy-namespace',
    resourceVersion: '1673886',
    selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/test-policy`,
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
};

export const mockCreateResourcesResponse = {
  data: {
    createResources: {
      errors: [],
      result: [
        {
          apiVersion: 'policy.open-cluster-management.io/v1',
          kind: 'Policy',
          metadata: {
            creationTimestamp: '2019-07-24T16:13:38Z',
            generation: 1,
            name: 'test-policy',
            namespace: 'policy-namespace',
            resourceVersion: '1688805',
            selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/test-policy`,
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
      apiVersion: 'policy.open-cluster-management.io/v1',
      kind: 'Policy',
      metadata: {
        annotations: {
          'policy.open-cluster-management.io/categories': 'hello',
          'policy.open-cluster-management.io/controls': '',
          'policy.open-cluster-management.io/standards': '',
          'seed-generation': '1',
        },
        creationTimestamp: '2019-07-24T13:27:59Z',
        finalizers: [
          'propagator.finalizer.mcm.ibm.com',
        ],
        generation: 6,
        name: 'test-policy',
        namespace: 'policy-namespace',
        resourceVersion: '1673886',
        selfLink: `/apis/${ApiGroup.policiesGroup}/${ApiGroup.version}/namespaces/policy-namespace/policies/test-policy`,
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

export const mockGetResourceLocallyResponse = {
  apiVersion: 'v1',
  kind: 'Pod',
  metadata: {
    annotations: {
      'k8s.v1.cni.cncf.io/networks-status': '[{\n    "name": "openshift-sdn",\n    "interface": "eth0",\n    "ips": [\n        "10.128.2.73"\n    ],\n    "dns": {},\n    "default-route": [\n        "10.128.2.1"\n    ]\n}]',
      'openshift.io/scc': 'restricted',
    },
    creationTimestamp: '2020-07-23T18:13:32Z',
    generateName: 'grc-f2e12-grcui-6b756dfc76-',
    labels: {
      app: 'grc',
      'app.kubernetes.io/instance': 'grc-f2e12',
      'app.kubernetes.io/managed-by': 'Helm',
      'app.kubernetes.io/name': 'grc',
      chart: 'grc-2.0.0',
      component: 'ocm-grcui',
      'helm.sh/chart': 'grc-2.0.0',
      heritage: 'Helm',
      'pod-template-hash': '6b756dfc76',
      release: 'grc-f2e12',
    },
    name: 'grc-f2e12-grcui-6b756dfc76-4fk7c',
    namespace: 'open-cluster-management',
    ownerReferences: [
      {
        apiVersion: 'apps/v1',
        blockOwnerDeletion: true,
        controller: true,
        kind: 'ReplicaSet',
        name: 'grc-f2e12-grcui-6b756dfc76',
        uid: 'b402f0fc-a75f-4b18-8241-6def0abf3c90',
      },
    ],
    resourceVersion: '9895924',
    selfLink: '/api/v1/namespaces/open-cluster-management/pods/grc-f2e12-grcui-6b756dfc76-4fk7c',
    uid: '0a25f3bc-993b-4079-954b-e50cd5027bf5',
  },
  spec: {
    affinity: {
      nodeAffinity: {
        requiredDuringSchedulingIgnoredDuringExecution: {
          nodeSelectorTerms: [
            {
              matchExpressions: [
                {
                  key: 'beta.kubernetes.io/arch',
                  operator: 'In',
                  values: [
                    'amd64',
                    'ppc64le',
                    's390x',
                  ],
                },
              ],
            },
          ],
        },
      },
      podAntiAffinity: {
        preferredDuringSchedulingIgnoredDuringExecution: [
          {
            podAffinityTerm: {
              labelSelector: {
                matchExpressions: [
                  {
                    key: 'app',
                    operator: 'In',
                    values: [
                      'grc-ui',
                    ],
                  },
                ],
              },
              topologyKey: 'failure-domain.beta.kubernetes.io/zone',
            },
            weight: 70,
          },
          {
            podAffinityTerm: {
              labelSelector: {
                matchExpressions: [
                  {
                    key: 'app',
                    operator: 'In',
                    values: [
                      'grc-ui',
                    ],
                  },
                ],
              },
              topologyKey: 'kubernetes.io/hostname',
            },
            weight: 35,
          },
        ],
      },
    },
    containers: [
      {
        env: [
          {
            name: 'grcUiApiUrl',
            value: 'https://grc-f2e12-grcuiapi:4000/grcuiapi',
          },
          {
            name: 'searchApiUrl',
            value: 'https://search-search-api:4010/searchapi',
          },
        ],
        image: 'quay.io/open-cluster-management/grc-ui@sha256:f0db7b0409c694f92f024cd16026172071804bf33ab58f789fd0506bc4b974fb',
        imagePullPolicy: 'Always',
        livenessProbe: {
          failureThreshold: 3,
          httpGet: {
            path: '/livenessProbe',
            port: 3000,
            scheme: 'HTTP',
          },
          initialDelaySeconds: 30,
          periodSeconds: 30,
          successThreshold: 1,
          timeoutSeconds: 1,
        },
        name: 'grc-ui',
        ports: [
          {
            containerPort: 3000,
            protocol: 'TCP',
          },
        ],
        readinessProbe: {
          failureThreshold: 3,
          httpGet: {
            path: '/readinessProbe',
            port: 3000,
            scheme: 'HTTP',
          },
          initialDelaySeconds: 5,
          periodSeconds: 10,
          successThreshold: 1,
          timeoutSeconds: 1,
        },
        resources: {
          requests: {
            cpu: '200m',
            memory: '256Mi',
          },
        },
        securityContext: {
          allowPrivilegeEscalation: false,
          capabilities: {
            drop: [
              'ALL',
              'KILL',
              'MKNOD',
              'SETGID',
              'SETUID',
            ],
          },
          privileged: false,
          readOnlyRootFilesystem: true,
          runAsUser: 1000640000,
        },
        terminationMessagePath: '/dev/termination-log',
        terminationMessagePolicy: 'File',
        volumeMounts: [
          {
            mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
            name: 'grc-sa-token-588p4',
            readOnly: true,
          },
        ],
      },
    ],
    dnsPolicy: 'ClusterFirst',
    enableServiceLinks: true,
    imagePullSecrets: [
      {
        name: 'multiclusterhub-operator-pull-secret',
      },
    ],
    nodeName: 'ip-10-0-156-232.us-west-1.compute.internal',
    priority: 0,
    restartPolicy: 'Always',
    schedulerName: 'default-scheduler',
    securityContext: {
      fsGroup: 1000640000,
      runAsNonRoot: true,
      seLinuxOptions: {
        level: 's0:c25,c20',
      },
    },
    serviceAccount: 'grc-sa',
    serviceAccountName: 'grc-sa',
    terminationGracePeriodSeconds: 30,
    tolerations: [
      {
        effect: 'NoSchedule',
        key: 'dedicated',
        operator: 'Exists',
      },
      {
        effect: 'NoExecute',
        key: 'node.kubernetes.io/not-ready',
        operator: 'Exists',
        tolerationSeconds: 300,
      },
      {
        effect: 'NoExecute',
        key: 'node.kubernetes.io/unreachable',
        operator: 'Exists',
        tolerationSeconds: 300,
      },
      {
        effect: 'NoSchedule',
        key: 'node.kubernetes.io/memory-pressure',
        operator: 'Exists',
      },
    ],
    volumes: [
      {
        name: 'grc-sa-token-588p4',
        secret: {
          defaultMode: 420,
          secretName: 'grc-sa-token-588p4',
        },
      },
    ],
  },
  status: {
    conditions: [
      {
        lastProbeTime: null,
        lastTransitionTime: '2020-07-23T18:13:32Z',
        status: 'True',
        type: 'Initialized',
      },
      {
        lastProbeTime: null,
        lastTransitionTime: '2020-07-23T18:14:17Z',
        status: 'True',
        type: 'Ready',
      },
      {
        lastProbeTime: null,
        lastTransitionTime: '2020-07-23T18:14:17Z',
        status: 'True',
        type: 'ContainersReady',
      },
      {
        lastProbeTime: null,
        lastTransitionTime: '2020-07-23T18:13:32Z',
        status: 'True',
        type: 'PodScheduled',
      },
    ],
    containerStatuses: [
      {
        containerID: 'cri-o://baabe151ec104ea82dccd3613c6c9e25c008cd5998cbd77e6e63d8b887a53620',
        image: 'quay.io/open-cluster-management/grc-ui@sha256:f0db7b0409c694f92f024cd16026172071804bf33ab58f789fd0506bc4b974fb',
        imageID: 'quay.io/open-cluster-management/grc-ui@sha256:f0db7b0409c694f92f024cd16026172071804bf33ab58f789fd0506bc4b974fb',
        lastState: {},
        name: 'grc-ui',
        ready: true,
        restartCount: 0,
        started: true,
        state: {
          running: {
            startedAt: '2020-07-23T18:14:09Z',
          },
        },
      },
    ],
    hostIP: '10.0.156.232',
    phase: 'Running',
    podIP: '10.128.2.73',
    podIPs: [
      {
        ip: '10.128.2.73',
      },
    ],
    qosClass: 'Burstable',
    startTime: '2020-07-23T18:13:32Z',
  },
};

export const mockSSRRResponse = {
  kind: 'SelfSubjectRulesReview',
  apiVersion: 'authorization.k8s.io/v1',
  metadata: {
    creationTimestamp: null,
  },
  spec: {},
  status: {
    resourceRules: [
      {
        verbs: [
          'create',
        ],
        apiGroups: [
          'authorization.k8s.io',
        ],
        resources: [
          'selfsubjectaccessreviews',
          'selfsubjectrulesreviews',
        ],
      },
      {
        verbs: [
          'create',
        ],
        apiGroups: [
          '',
          'build.openshift.io',
        ],
        resources: [
          'builds/jenkinspipeline',
        ],
      },
      {
        verbs: [
          'get',
          'list',
          'watch',
        ],
        apiGroups: [
          'hive.openshift.io',
        ],
        resources: [
          'clusterimagesets',
        ],
      },
      {
        verbs: [
          'create',
        ],
        apiGroups: [
          '',
          'build.openshift.io',
        ],
        resources: [
          'builds/source',
        ],
      },
      {
        verbs: [
          'impersonate',
        ],
        apiGroups: [
          'authentication.k8s.io',
        ],
        resources: [
          'userextras/scopes.authorization.openshift.io',
        ],
      },
      {
        verbs: [
          'get',
          'list',
          'watch',
        ],
        apiGroups: [
          'console.openshift.io',
        ],
        resources: [
          'consolelinks',
          'consolenotifications',
          'consoleexternalloglinks',
          'consoleclidownloads',
          'consoleyamlsamples',
        ],
      },
      {
        verbs: [
          'get',
          'list',
        ],
        apiGroups: [
          'helm.openshift.io',
        ],
        resources: [
          'helmchartrepositories',
        ],
      },
      {
        verbs: [
          'create',
        ],
        apiGroups: [
          '',
          'authorization.openshift.io',
        ],
        resources: [
          'selfsubjectrulesreviews',
        ],
      },
      {
        verbs: [
          'create',
        ],
        apiGroups: [
          'authorization.k8s.io',
        ],
        resources: [
          'selfsubjectaccessreviews',
        ],
      },
      {
        verbs: [
          '*',
        ],
        apiGroups: [
          '*',
        ],
        resources: [
          '*',
        ],
      },
      {
        verbs: [
          'create',
        ],
        apiGroups: [
          '',
          'build.openshift.io',
        ],
        resources: [
          'builds/docker',
          'builds/optimizeddocker',
        ],
      },
      {
        verbs: [
          'get',
          'list',
          'watch',
        ],
        apiGroups: [
          'snapshot.storage.k8s.io',
        ],
        resources: [
          'volumesnapshotclasses',
        ],
      },
      {
        verbs: [
          'get',
        ],
        apiGroups: [
          '',
          'user.openshift.io',
        ],
        resources: [
          'users',
        ],
        resourceNames: [
          '~',
        ],
      },
      {
        verbs: [
          'list',
        ],
        apiGroups: [
          '',
          'project.openshift.io',
        ],
        resources: [
          'projectrequests',
        ],
      },
      {
        verbs: [
          'get',
          'list',
        ],
        apiGroups: [
          '',
          'authorization.openshift.io',
        ],
        resources: [
          'clusterroles',
        ],
      },
      {
        verbs: [
          'get',
          'list',
          'watch',
        ],
        apiGroups: [
          'rbac.authorization.k8s.io',
        ],
        resources: [
          'clusterroles',
        ],
      },
      {
        verbs: [
          'get',
          'list',
        ],
        apiGroups: [
          'storage.k8s.io',
        ],
        resources: [
          'storageclasses',
        ],
      },
      {
        verbs: [
          'list',
          'watch',
        ],
        apiGroups: [
          '',
          'project.openshift.io',
        ],
        resources: [
          'projects',
        ],
      },
      {
        verbs: [
          'create',
        ],
        apiGroups: [
          '',
          'authorization.openshift.io',
        ],
        resources: [
          'selfsubjectrulesreviews',
        ],
      },
      {
        verbs: [
          'create',
        ],
        apiGroups: [
          'authorization.k8s.io',
        ],
        resources: [
          'selfsubjectaccessreviews',
        ],
      },
      {
        verbs: [
          'delete',
        ],
        apiGroups: [
          '',
          'oauth.openshift.io',
        ],
        resources: [
          'oauthaccesstokens',
          'oauthauthorizetokens',
        ],
      },
      {
        verbs: [
          'get',
          'list',
          'watch',
        ],
        apiGroups: [
          'addon.open-cluster-management.io',
        ],
        resources: [
          'clustermanagementaddons',
        ],
      },
      {
        verbs: [
          'create',
          'get',
        ],
        apiGroups: [
          '',
          'build.openshift.io',
        ],
        resources: [
          'buildconfigs/webhooks',
        ],
      },
    ],
    nonResourceRules: [
      {
        verbs: [
          'get',
        ],
        nonResourceURLs: [
          '/healthz',
          '/livez',
          '/readyz',
          '/version',
          '/version/',
        ],
      },
      {
        verbs: [
          'get',
        ],
        nonResourceURLs: [
          '/api',
          '/api/*',
          '/apis',
          '/apis/*',
          '/healthz',
          '/livez',
          '/openapi',
          '/openapi/*',
          '/readyz',
          '/version',
          '/version/',
        ],
      },
      {
        verbs: [
          'get',
        ],
        nonResourceURLs: [
          '/version',
          '/version/*',
          '/api',
          '/api/*',
          '/apis',
          '/apis/*',
          '/oapi',
          '/oapi/*',
          '/openapi/v2',
          '/swaggerapi',
          '/swaggerapi/*',
          '/swagger.json',
          '/swagger-2.0.0.pb-v1',
          '/osapi',
          '/osapi/',
          '/.well-known',
          '/.well-known/*',
          '/',
        ],
      },
      {
        verbs: [
          '*',
        ],
        nonResourceURLs: [
          '*',
        ],
      },
      {
        verbs: [
          'get',
        ],
        nonResourceURLs: [
          '/healthz',
          '/healthz/',
        ],
      },
      {
        verbs: [
          'get',
        ],
        nonResourceURLs: [
          '/version',
          '/version/*',
          '/api',
          '/api/*',
          '/apis',
          '/apis/*',
          '/oapi',
          '/oapi/*',
          '/openapi/v2',
          '/swaggerapi',
          '/swaggerapi/*',
          '/swagger.json',
          '/swagger-2.0.0.pb-v1',
          '/osapi',
          '/osapi/',
          '/.well-known',
          '/.well-known/*',
          '/',
        ],
      },
      {
        verbs: [
          'get',
        ],
        nonResourceURLs: [
          '/.well-known',
          '/.well-known/*',
        ],
      },
    ],
    incomplete: false,
  },
};

export const mockAnsibleJobTemplatesResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 7,
      type: 'job_template',
      url: '/api/v2/job_templates/7/',
      related: {
        created_by: '/api/v2/users/1/',
        modified_by: '/api/v2/users/1/',
        labels: '/api/v2/job_templates/7/labels/',
        inventory: '/api/v2/inventories/1/',
        project: '/api/v2/projects/6/',
        organization: '/api/v2/organizations/1/',
        credentials: '/api/v2/job_templates/7/credentials/',
        jobs: '/api/v2/job_templates/7/jobs/',
        schedules: '/api/v2/job_templates/7/schedules/',
        activity_stream: '/api/v2/job_templates/7/activity_stream/',
        launch: '/api/v2/job_templates/7/launch/',
        webhook_key: '/api/v2/job_templates/7/webhook_key/',
        webhook_receiver: '',
        notification_templates_started: '/api/v2/job_templates/7/notification_templates_started/',
        notification_templates_success: '/api/v2/job_templates/7/notification_templates_success/',
        notification_templates_error: '/api/v2/job_templates/7/notification_templates_error/',
        access_list: '/api/v2/job_templates/7/access_list/',
        survey_spec: '/api/v2/job_templates/7/survey_spec/',
        object_roles: '/api/v2/job_templates/7/object_roles/',
        instance_groups: '/api/v2/job_templates/7/instance_groups/',
        slice_workflow_jobs: '/api/v2/job_templates/7/slice_workflow_jobs/',
        copy: '/api/v2/job_templates/7/copy/',
      },
      summary_fields: {
        organization: {
          id: 1,
          name: 'Default',
          description: '',
        },
        inventory: {
          id: 1,
          name: 'Demo Inventory',
          description: '',
          has_active_failures: false,
          total_hosts: 0,
          hosts_with_active_failures: 0,
          total_groups: 0,
          has_inventory_sources: false,
          total_inventory_sources: 0,
          inventory_sources_with_failures: 0,
          organization_id: 1,
          kind: '',
        },
        project: {
          id: 6,
          name: 'Demo Project',
          description: '',
          status: 'never updated',
          scm_type: 'git',
        },
        created_by: {
          id: 1,
          username: 'admin',
          first_name: '',
          last_name: '',
        },
        modified_by: {
          id: 1,
          username: 'admin',
          first_name: '',
          last_name: '',
        },
        object_roles: {
          admin_role: {
            description: 'Can manage all aspects of the job template',
            name: 'Admin',
            id: 30,
          },
          execute_role: {
            description: 'May run the job template',
            name: 'Execute',
            id: 31,
          },
          read_role: {
            description: 'May view settings for the job template',
            name: 'Read',
            id: 32,
          },
        },
        user_capabilities: {
          edit: true,
          delete: true,
          start: true,
          schedule: true,
          copy: true,
        },
        labels: {
          count: 0,
          results: [
          ],
        },
        recent_jobs: [
        ],
        credentials: [
          {
            id: 1,
            name: 'Demo Credential',
            description: '',
            kind: 'ssh',
            cloud: false,
          },
        ],
      },
      created: '2021-04-27T22:10:35.914847Z',
      modified: '2021-04-27T22:10:35.914878Z',
      name: 'Demo Job Template',
      description: '',
      job_type: 'run',
      inventory: 1,
      project: 6,
      playbook: 'hello_world.yml',
      scm_branch: '',
      forks: 0,
      limit: '',
      verbosity: 0,
      extra_vars: '',
      job_tags: '',
      force_handlers: false,
      skip_tags: '',
      start_at_task: '',
      timeout: 0,
      use_fact_cache: false,
      organization: 1,
      last_job_run: null,
      last_job_failed: false,
      next_job_run: null,
      status: 'never updated',
      host_config_key: '',
      ask_scm_branch_on_launch: false,
      ask_diff_mode_on_launch: false,
      ask_variables_on_launch: false,
      ask_limit_on_launch: false,
      ask_tags_on_launch: false,
      ask_skip_tags_on_launch: false,
      ask_job_type_on_launch: false,
      ask_verbosity_on_launch: false,
      ask_inventory_on_launch: false,
      ask_credential_on_launch: false,
      survey_enabled: false,
      become_enabled: false,
      diff_mode: false,
      allow_simultaneous: false,
      custom_virtualenv: null,
      job_slice_count: 1,
      webhook_service: '',
      webhook_credential: null,
    },
  ],
};
