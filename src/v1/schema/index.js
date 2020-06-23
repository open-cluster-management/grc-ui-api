/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
import _ from 'lodash';
import { gql } from 'apollo-server-express';
import * as creation from './creation';
import * as placements from './placement';
import * as compliance from './compliance';
import * as json from './json';
import * as namespace from './namespace';
import * as policy from './policy';
import * as genericResources from './generic-resources';
import * as query from './query';
import * as occurrence from './occurrence';

const modules = [
  creation,
  placements,
  compliance,
  json,
  namespace,
  policy,
  query,
  genericResources,
  occurrence,
];

const mainDefs = [gql`
schema {
  query: Query,
  mutation: Mutation,
}
`];

export const typeDefs = mainDefs.concat(modules.filter((m) => m.typeDef).map((m) => m.typeDef));
export const resolvers = _.merge(...modules.map((m) => m.resolver));

export default { typeDefs, resolvers };
