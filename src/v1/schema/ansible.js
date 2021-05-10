/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
# define ansible job template
type AnsibleAutomation {
  kind: String
  apiVersion: String
  metadata: JSON
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
  started: String
  finished: String
  job: String
}
`;

export const resolver = {
  Query: {
    ansibleAutomations: (parent, args, { ansibleModel }) => ansibleModel.getAnsibleAutomations(args),
    ansibleJobTemplates: (parent, args, { ansibleModel }) => ansibleModel.getAnsibleJobTemplates(args),
    ansibleCredentials: (parent, args, { ansibleModel }) => ansibleModel.getAnsibleCredentials(args),
    copyAnsibleSecret: (parent, args, { ansibleModel }) => ansibleModel.copyAnsibleSecret(args),
    ansibleAutomationHistories: (parent, args, { ansibleModel }) => ansibleModel.ansibleAutomationHistories(args),
  },
};
