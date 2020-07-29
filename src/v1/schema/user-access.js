/* Copyright (c) 2020 Red Hat, Inc. */
import { gql } from 'apollo-server-express';

export const typeDef = gql`
type userAccess {
  resource: String
  action: String
}
`;

export const resolver = {
  Query: {
    userAccess: (parent, args, { genericModel }) => genericModel.userAccess(
      args.resource,
      args.action,
      args.namespace,
      args.apiGroup,
    ),
  },
};
