/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
# define ansible job template
type AnsibleAutomation {
  kind: String
  apiVersion: String
  metadata: {
    name: String
    namespace: String
  }
  sepc: {
    policyRef: String
    eventHook: String
    mode: String
    automation: 
      type: String
      name: String
      secret: String
      extra_vars: JSON
  }
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
`;

export const resolver = {
  Query: {
    ansibleAutomations: (parent, args, { ansibleModel }) => ansibleModel.getAnsibleAutomations(args),
    ansibleJobTemplates: (parent, args, { ansibleModel }) => ansibleModel.getAnsibleJobTemplates(args),
    ansibleCredentials: (parent, args, { ansibleModel }) => ansibleModel.getAnsibleCredentials(args),
    copyAnsibleSecret: (parent, args, { ansibleModel }) => ansibleModel.copyAnsibleSecret(args),
  },
};
