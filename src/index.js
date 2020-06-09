/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import https from 'https';
import fs from 'fs';
import logger from './v1/lib/logger';
import config from '../config';

const GRAPHQL_PORT = process.env.PORT || config.get('httpPort') || 4000;
const CONTEXT_PATH = config.get('contextPath');

const graphQLServer = require('./v1').default;

const privateKey = fs.readFileSync(process.env.serverKey || './sslcert/grcuiapi.key', 'utf8');
const certificate = fs.readFileSync(process.env.serverCert || './sslcert/grcuiapi.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, graphQLServer);

server.listen(GRAPHQL_PORT, () => {
  logger.info(`[pid ${process.pid}] [env ${process.env.NODE_ENV}] [version V1] started.`);
  logger.info(`GRC UI API is now running on https://localhost:${GRAPHQL_PORT}${CONTEXT_PATH}/graphql`);
  if (process.env.NODE_ENV !== 'production') {
    logger.info(`GraphiQL is now running on https://localhost:${GRAPHQL_PORT}${CONTEXT_PATH}/graphiql`);
  }
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received.  Shutting down express server.');
  server.close((err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info('Server shutdown successfully.');
    process.exit(0);
  });
});
