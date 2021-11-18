/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
# define ansible job template
type PolicyAutomation {
  kind: String
  apiVersion: String
  metadata: Metadata
  spec: JSON
}
type AnsibleJobTemplate {
  name: String
  description: String
  extra_vars: String
}
type AnsibleCredential {
  name: String
  namespace: String
  host: String
  token: String
}
type AnsibleSecretName {
  name: String
}

type AnsibleAutomationHistory {
  name: String
  namespace: String
  status: String
  message: String
  started: String
  finished: String
  job: String
}

type AnsibleOperatorInstalled {
  installed: Boolean
}
`;

export const resolver = {
  Query: {
    policyAutomations: (parent, args, { ansibleModel }) => ansibleModel.getPolicyAutomations(args),
    ansibleJobTemplates: (parent, args, { ansibleModel }) => ansibleModel.getAnsibleJobTemplates(args),
    ansibleCredentials: (parent, args, { ansibleModel }) => ansibleModel.getAnsibleCredentials(args),
    copyAnsibleSecret: (parent, args, { ansibleModel }) => ansibleModel.copyAnsibleSecret(args),
    cleanAnsibleSecret: (parent, args, { ansibleModel }) => ansibleModel.cleanAnsibleSecret(args),
    ansibleAutomationHistories: (parent, args, { ansibleModel }) => ansibleModel.ansibleAutomationHistories(args),
    ansibleOperatorInstalled: (parent, args, { ansibleModel }) => ansibleModel.ansibleOperatorInstalled(args),
  },
  Mutation: {
    modifyPolicyAutomation: (parent, args, { ansibleModel }) => ansibleModel.modifyPolicyAutomation(args),
  },
};
