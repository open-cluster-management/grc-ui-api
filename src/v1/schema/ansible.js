/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
# define ansible job template
type AnsibleJobTemplate {
  name: String
  description: String
  extra_vars: String
}
`;

export const resolver = {
  Query: {
    ansibleJobTemplates: (parent, args, { genericModel }) => genericModel.getAnsibleJobTemplates(args),
  },
};
