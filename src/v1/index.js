/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { isInstance as isApolloErrorInstance, formatError as formatApolloError } from 'apollo-errors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { app as inspect } from './lib/inspect';
import requestLib from './lib/request';
// import listNamespaces from './lib/namespaces';

import logger from './lib/logger';

import KubeConnector from './connectors/kube';

import ClusterModel from './models/cluster';
import PlacementModel from './models/placement';
import GenericModel from './models/generic';
import QueryModel from './models/userquery';
import ComplianceModel from './models/compliance';
import ResourceViewModel from './models/resourceview';
import SAModel from './models/sa';

import schema from './schema/';
import config from '../../config';


// import authMiddleware from './lib/auth-middleware';

export const GRAPHQL_PATH = `${config.get('contextPath')}/graphql`;
export const GRAPHIQL_PATH = `${config.get('contextPath')}/graphiql`;

const isProd = config.get('NODE_ENV') === 'production';
const isTest = config.get('NODE_ENV') === 'test';
// const request = require('request').defaults({ rejectUnauthorized: false });
// const nsUtil = require('./lib/namespaces');

const apiServerUrl = 'https://api.straits.os.fyre.ibm.com:6443';

const formatError = (error) => {
  const { originalError } = error;
  if (isApolloErrorInstance(originalError)) {
    logger.error(JSON.stringify(error.originalError, null, 2));
  }
  return formatApolloError(error);
};

async function getNamespaces(username, usertoken) {
  const options = {
    url: `${apiServerUrl}/apis/project.openshift.io/v1/projects`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${usertoken}`,
    },
    json: true,
    fullResponse: false,
  };
  // let nmItems = [];
  // request.get(options, (nmerr, nmresponse, nmbody) => {
  //   logger.info('Namespaces Response Code', nmresponse.statusCode);
  //   nmItems = nmbody.items;
  // });

  // requestLib(options).then((resp) => {
  //   // logger.info(resp.items);
  //   return resp.items;
  // }).catch((error) => {
  //   logger.error(error);
  //   return null;
  // });

  return requestLib(options);
}

const graphQLServer = express();
graphQLServer.use(compression());

const requestLogger = isProd ?
  morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  })
  : morgan('dev');

graphQLServer.use('*', helmet({// These headers are dealt with in icp-management-ingress
  frameguard: false,
  noSniff: false,
  xssFilter: false,
  noCache: true,
}), requestLogger, cookieParser());

graphQLServer.get('/livenessProbe', (req, res) => {
  res.send(`Testing livenessProbe --> ${new Date().toLocaleString()}`);
});

graphQLServer.get('/readinessProbe', (req, res) => {
  res.send(`Testing readinessProbe --> ${new Date().toLocaleString()}`);
});

const auth = [];

// if (isProd) {
//   logger.info('Authentication enabled');
//   auth.push(inspect, authMiddleware());
// } else {
//   logger.info('Authentication disabled');
//   auth.push(authMiddleware({ shouldLocalAuth: true }));
//   graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({ endpointURL: GRAPHQL_PATH }));
// }

auth.push(inspect);

if (!isProd) {
  graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({ endpointURL: GRAPHQL_PATH }));
}

if (isTest) {
  logger.info('Running in mock mode');
}

graphQLServer.use(...auth);
graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress(async (req) => {
  logger.info('here~~~');
  const nsPromise = await getNamespaces(req.user.username, req.cookies['cfc-access-token-cookie']);
  logger.info(nsPromise);
  const nsMap = nsPromise.items;
  // logger.info(nsMap);
  const namespaces = nsMap.map(ns => ns.metadata.name);
  // logger.info(namespaces);

  // let namespaces = [];
  // const namespacePromise =
  // await nsUtil.listNamespaces(req.cookies['cfc-access-token-cookie'], (err, nslist) => {
  //   logger.info('inside listns callback');
  //   if (err) {
  //     res.status(500).send(err.details);
  //   }
  //   if (nslist) {
  //     logger.info('SUCCESS');
  //     namespaces = nslist.map(ns => ns.metadata.name);
  //     logger.info(namespaces);
  //   } else {
  //     res.status(500).send('Server error processing namespace list');
  //   }
  // });
  // const namespacePromise = await nsUtil.listNamespaces(req.cookies['cfc-access-token-cookie']);
  // logger.info('POST FN');
  // logger.info(namespacePromise);
  logger.info(req.cookies['cfc-access-token-cookie']);
  const kubeConnector = new KubeConnector({
    token: `Bearer ${req.cookies['cfc-access-token-cookie']}`,
    namespaces,
  });
  if (isTest) {
    kubeConnector.kubeApiEndpoint = 'http://0.0.0.0/kubernetes';
  }

  const context = {
    req,
    clusterModel: new ClusterModel({ kubeConnector }),
    PlacementModel: new PlacementModel({ kubeConnector }),
    genericModel: new GenericModel({ kubeConnector }),
    queryModel: new QueryModel({ kubeConnector, req }),
    complianceModel: new ComplianceModel({ kubeConnector }),
    resourceViewModel: new ResourceViewModel({ kubeConnector }),
    saModel: new SAModel({ kubeConnector, req }),
  };

  return { formatError, schema, context };
}));

export default graphQLServer;
