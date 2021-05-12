/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

export const mockAnsibleSecretsResponse = (ns) => ({
  metadata: {
    name: 'toweraccess',
    namespace: ns,
    selfLink: `/api/v1/namespaces/${ns}/secrets/toweraccess`,
    uid: 'e4488d2b-cc28-4b81-bbd5-71472966dbcd',
    resourceVersion: '157909',
    creationTimestamp: '2021-04-30T14:41:02Z',
    labels: {
      'cluster.open-cluster-management.io/cloudconnection': '',
      'cluster.open-cluster-management.io/provider': 'ans',
    },
  },
  data: {
    'credential-hash': 'QI9XaZW68D77JSvtKGlucILe71JH+SPK3JWNyu3cE3g=',
    host: 'aHR0cHM6Ly9hbnNpYmxlLXRvd2VyLXdlYi1zdmMtdG93ZXIuYXBwcy5wb2xpY3ktZ3JjLWNwLWRldi16NGJnMi5kZXYwOC5yZWQtY2hlc3RlcmZpZWxkLmNvbQ==',
    token: 'cjRqWnl5eWh1M2pYMzNuUFNrY25oQ2VKQ1ZNQlNN',
  },
  type: 'Opaque',
});

export const mockAnsibleAutomationsResponse = (ns) => ({
  kind: 'PolicyAutomation',
  apiVersion: 'policy.open-cluster-management.io/v1alpha1',
  metadata: {
    name: `policy-grc-${ns}-AnsibleJob`,
    namespace: ns,
  },
  spec: {
    policyRef: 'policy-grc-111',
    eventHook: 'non-compliance',
    mode: 'once',
    automationDef: {
      type: 'AnsibleJob',
      name: 'Demo Job Template',
      secret: 'grc-testing',
      extra_vars: {
        selector: 'target-cluster',
      },
    },
  },
});

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

export const mockSecretExistsInTargetNamespaceResponse = {
  items: [
    {
      kind: 'Secret',
      apiVersion: 'v1',
      metadata: {
        name: 'existing_toweraccess',
        namespace: 'kube-system',
        selfLink: '/api/v1/namespaces/kube-system/secrets/existing_toweraccess',
        uid: 'e573a6c0-d15d-4774-a65e-0c04afaf8e34',
        resourceVersion: '352981',
        creationTimestamp: '2021-04-30T17:57:44Z',
        labels: {
          'cluster.open-cluster-management.io/copiedFromNamespace': 'default',
          'cluster.open-cluster-management.io/copiedFromSecretName': 'toweraccess',
        },
      },
      data: {
        'credential-hash': 'QI9XaZW68D77JSvtKGlucILe71JH+SPK3JWNyu3cE3g=',
        host: 'aHR0cHM6Ly9hbnNpYmxlLXRvd2VyLXdlYi1zdmMtdG93ZXIuYXBwcy5wb2xpY3ktZ3JjLWNwLWRldi16NGJnMi5kZXYwOC5yZWQtY2hlc3RlcmZpZWxkLmNvbQ==',
        token: 'cjRqWnl5eWh1M2pYMzNuUFNrY25oQ2VKQ1ZNQlNN',
      },
      type: 'Opaque',
    },
  ],
};

export const mockSecretNotExistsInTargetNamespaceResponse = {
  items: [],
};

export const mockRootAnsibleSecetResponse = {
  kind: 'Secret',
  apiVersion: 'v1',
  metadata: {
    name: 'toweraccess',
    namespace: 'default',
    selfLink: '/api/v1/namespaces/default/secrets/toweraccess',
    uid: 'e573a6c0-d15d-4774-a65e-0c04afaf8e34',
    resourceVersion: '352981',
    creationTimestamp: '2021-04-30T17:57:44Z',
    labels: {
      'cluster.open-cluster-management.io/cloudconnection': '',
      'cluster.open-cluster-management.io/provider': 'ans',
    },
  },
  data: {
    'credential-hash': 'QI9XaZW68D77JSvtKGlucILe71JH+SPK3JWNyu3cE3g=',
    host: 'aHR0cHM6Ly9hbnNpYmxlLXRvd2VyLXdlYi1zdmMtdG93ZXIuYXBwcy5wb2xpY3ktZ3JjLWNwLWRldi16NGJnMi5kZXYwOC5yZWQtY2hlc3RlcmZpZWxkLmNvbQ==',
    token: 'cjRqWnl5eWh1M2pYMzNuUFNrY25oQ2VKQ1ZNQlNN',
  },
  type: 'Opaque',
};

export const mockCopiedSecetResponse = {
  kind: 'Secret',
  apiVersion: 'v1',
  metadata: {
    name: 'default.toweraccess',
    namespace: 'default',
    selfLink: '/api/v1/namespaces/kube-system/secrets/default.toweraccess',
    uid: 'e573a6c0-d15d-4774-a65e-0c04afaf8e34',
    resourceVersion: '352981',
    creationTimestamp: '2021-04-30T17:57:44Z',
    labels: {
      'cluster.open-cluster-management.io/cloudconnection': '',
      'cluster.open-cluster-management.io/provider': 'ans',
    },
  },
  data: {
    'credential-hash': 'QI9XaZW68D77JSvtKGlucILe71JH+SPK3JWNyu3cE3g=',
    host: 'aHR0cHM6Ly9hbnNpYmxlLXRvd2VyLXdlYi1zdmMtdG93ZXIuYXBwcy5wb2xpY3ktZ3JjLWNwLWRldi16NGJnMi5kZXYwOC5yZWQtY2hlc3RlcmZpZWxkLmNvbQ==',
    token: 'cjRqWnl5eWh1M2pYMzNuUFNrY25oQ2VKQ1ZNQlNN',
  },
  type: 'Opaque',
};

export const mockAnsibleJobListResponse = {
  apiVersion: 'tower.ansible.com/v1alpha1',
  items: [
    {
      apiVersion: 'tower.ansible.com/v1alpha1',
      kind: 'AnsibleJob',
      metadata: {
        creationTimestamp: '2021-05-03T17:18:10Z',
        generateName: 'create-service-now-ticket-once-',
        generation: 1,
        labels: {
          tower_job_id: '20',
        },
        name: 'create-service-now-ticket-once-g6xsr',
        namespace: 'default',
        ownerReferences: [
          {
            apiVersion: 'policy.open-cluster-management.io/v1beta1',
            blockOwnerDeletion: true,
            controller: true,
            kind: 'PolicyAutomation',
            name: 'create-service-now-ticket',
            uid: '0ecb4de8-7b59-492f-a88f-71e9b1e38dbc',
          },
        ],
        resourceVersion: '358239',
        selfLink: '/apis/tower.ansible.com/v1alpha1/namespaces/default/ansiblejobs/create-service-now-ticket-once-g6xsr',
        uid: '95352d3e-b5ec-4404-969f-64329ee5727e',
      },
      spec: {
        extra_vars: {
          sn_priority: 1,
          sn_severity: 1,
          target_clusters: [
            'local-cluster',
          ],
        },
        job_template_name: 'Demo Job Template',
        tower_auth_secret: 'toweraccess',
      },
      status: {
        ansibleJobResult: {
          changed: true,
          elapsed: '6.384',
          failed: false,
          finished: '2021-05-03T17:18:43.332157Z',
          started: '2021-05-03T17:18:36.948508Z',
          status: 'successful',
          url: 'https://ansible-tower-web-svc-tower.apps.policy-grc-cp-dev-z4bg2.dev08.red-chesterfield.com/#/jobs/playbook/20',
        },
        conditions: [
          {
            ansibleResult: {
              changed: 0,
              completion: '2021-05-03T17:18:55.54961',
              failures: 0,
              ok: 3,
              skipped: 0,
            },
            lastTransitionTime: '2021-05-03T17:18:10Z',
            message: 'Awaiting next reconciliation',
            reason: 'Successful',
            status: 'True',
            type: 'Running',
          },
        ],
        k8sJob: {
          created: true,
          env: {
            secretNamespacedName: 'default/toweraccess',
            templateName: 'Demo Job Template',
            verifySSL: false,
          },
          message: "Monitor the job.batch status for more details with the following commands:\n'kubectl -n default get job.batch/create-service-now-ticket-once-g6xsr'\n'kubectl -n default describe job.batch/create-service-now-ticket-once-g6xsr'\n'kubectl -n default logs -f job.batch/create-service-now-ticket-once-g6xsr'",
          namespacedName: 'default/create-service-now-ticket-once-g6xsr',
        },
        message: 'This job instance is already running or has reached its end state.',
      },
    },
    {
      apiVersion: 'tower.ansible.com/v1alpha1',
      kind: 'AnsibleJob',
      metadata: {
        creationTimestamp: '2021-05-03T17:31:32Z',
        generateName: 'policy-role-once-',
        generation: 1,
        labels: {
          tower_job_id: '22',
        },
        name: 'policy-role-once-7fg9p',
        namespace: 'default',
        ownerReferences: [
          {
            apiVersion: 'policy.open-cluster-management.io/v1beta1',
            blockOwnerDeletion: true,
            controller: true,
            kind: 'PolicyAutomation',
            name: 'policy-role',
            uid: 'bddcd0d3-341e-4480-b2ed-e62a428f4ee5',
          },
        ],
        resourceVersion: '371219',
        selfLink: '/apis/tower.ansible.com/v1alpha1/namespaces/default/ansiblejobs/policy-role-once-7fg9p',
        uid: 'c61d3d3c-a8b8-48ed-9afb-b94ab0cc447b',
      },
      spec: {
        extra_vars: {
          sn_priority: 1,
          sn_severity: 1,
          target_clusters: [
            'local-cluster',
          ],
        },
        job_template_name: 'Demo Job Template',
        tower_auth_secret: 'toweraccess',
      },
      status: {
        ansibleJobResult: {
          changed: true,
          elapsed: '6.578',
          failed: false,
          finished: '2021-05-03T17:32:06.357295Z',
          started: '2021-05-03T17:31:59.779211Z',
          status: 'successful',
          url: 'https://ansible-tower-web-svc-tower.apps.policy-grc-cp-dev-z4bg2.dev08.red-chesterfield.com/#/jobs/playbook/22',
        },
        conditions: [
          {
            ansibleResult: {
              changed: 0,
              completion: '2021-05-03T17:32:18.620627',
              failures: 0,
              ok: 3,
              skipped: 0,
            },
            lastTransitionTime: '2021-05-03T17:31:32Z',
            message: 'Awaiting next reconciliation',
            reason: 'Successful',
            status: 'True',
            type: 'Running',
          },
        ],
        k8sJob: {
          created: true,
          env: {
            secretNamespacedName: 'default/toweraccess',
            templateName: 'Demo Job Template',
            verifySSL: false,
          },
          message: "Monitor the job.batch status for more details with the following commands:\n'kubectl -n default get job.batch/policy-role-once-7fg9p'\n'kubectl -n default describe job.batch/policy-role-once-7fg9p'\n'kubectl -n default logs -f job.batch/policy-role-once-7fg9p'",
          namespacedName: 'default/policy-role-once-7fg9p',
        },
        message: 'This job instance is already running or has reached its end state.',
      },
    },
  ],
  kind: 'AnsibleJobList',
  metadata: {
    continue: '',
    resourceVersion: '376760',
    selfLink: '/apis/tower.ansible.com/v1alpha1/namespaces/default/ansiblejobs',
  },
};

export const mockCreateAnsibleJobResponse = {
  kind: 'PolicyAutomation',
  apiVersion: 'policy.open-cluster-management.io/v1alpha1',
  metadata: {
    name: 'policy-grc-default-AnsibleJob',
    namespace: 'default',
  },
  spec: {
    policyRef: 'policy-grc-111',
    eventHook: 'non-compliance',
    mode: 'once',
    automationDef: {
      type: 'AnsibleJob',
      name: 'Demo Job Template',
      secret: 'grc-testing',
      extra_vars: {
        selector: 'target-cluster',
      },
    },
  },
};

export const mockUpdateAnsibleJobResponse = {
  kind: 'PolicyAutomation',
  apiVersion: 'policy.open-cluster-management.io/v1alpha1',
  metadata: {
    name: 'policy-grc-default-AnsibleJob',
    namespace: 'default',
  },
  spec: {
    policyRef: 'policy-grc-111',
    eventHook: 'non-compliance',
    mode: 'manually',
    automationDef: {
      type: 'AnsibleJob',
      name: 'New job Template',
      secret: 'grc-testing',
      extra_vars: {
        selector: 'new-cluster',
      },
    },
  },
};
