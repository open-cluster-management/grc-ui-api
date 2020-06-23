/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { isInstance as isApolloErrorInstance, formatError as formatApolloError } from 'apollo-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import inspect from 'security-middleware';
import noCache from 'nocache';
import authMiddleware from './lib/auth-middleware';
import logger from './lib/logger';
import KubeConnector from './connectors/kube';
import ClusterModel from './models/cluster';
import PlacementModel from './models/placement';
import GenericModel from './models/generic';
import ComplianceModel from './models/compliance';
import SAModel from './models/sa';
import schema from './schema';
import config from '../../config';

export const GRAPHQL_PATH = `${config.get('contextPath')}/graphql`;
export const GRAPHIQL_PATH = `${config.get('contextPath')}/graphiql`;

const isProd = config.get('NODE_ENV') === 'production';
const isTest = config.get('NODE_ENV') === 'test';

const formatError = (error) => {
  const { originalError } = error;
  if (isApolloErrorInstance(originalError)) {
    logger.error(JSON.stringify(error.originalError, null, 2));
  }
  return formatApolloError(error);
};

const apolloServer = new ApolloServer({
  ...schema,
  formatError,
  playground: {
    endpoint: GRAPHQL_PATH,
  },
  context: ({ req }) => {
    const namespaces = req.user.namespaces.items.map((ns) => ns.metadata.name);
    const kubeConnector = new KubeConnector({
      token: req.kubeToken,
      namespaces,
    });
    if (isTest) {
      kubeConnector.kubeApiEndpoint = 'http://0.0.0.0/kubernetes';
    }

    return {
      req,
      clusterModel: new ClusterModel({ kubeConnector }),
      PlacementModel: new PlacementModel({ kubeConnector }),
      genericModel: new GenericModel({ kubeConnector }),
      complianceModel: new ComplianceModel({ kubeConnector }),
      saModel: new SAModel({ kubeConnector, req }),
    };
  },
});

const graphQLServer = express();
graphQLServer.use(compression());

const requestLogger = isProd
  ? morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  })
  : morgan('dev');

// These headers are dealt with in icp-management-ingress
graphQLServer.use('*', helmet({
  frameguard: false,
  noSniff: false,
  xssFilter: false,
}), noCache(), requestLogger, cookieParser());

graphQLServer.get('/livenessProbe', (req, res) => {
  res.send(`Testing livenessProbe --> ${new Date().toLocaleString()}`);
});

graphQLServer.get('/readinessProbe', (req, res) => {
  res.send(`Testing readinessProbe --> ${new Date().toLocaleString()}`);
});

const auth = [];

if (isProd) {
  logger.info('Authentication enabled');
  auth.push(inspect.app, authMiddleware());
} else {
  auth.push(authMiddleware({ shouldLocalAuth: true }));
}

if (isTest) {
  logger.info('Running in mock mode');
}

graphQLServer.use(...auth);
apolloServer.applyMiddleware({ app: graphQLServer, path: GRAPHQL_PATH });

export default graphQLServer;
