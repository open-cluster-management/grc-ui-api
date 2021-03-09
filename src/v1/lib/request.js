/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import logger from './logger';

const requestretry = require('requestretry');

const myRetryStrategy = (err, response) => {
  if (err) {
    logger.error(err);
    logger.error(response);
  }

  return !!err || requestretry.RetryStrategies.HTTPError(err, response) || requestretry.RetryStrategies.NetworkError(err, response);
};

const request = requestretry.defaults({
  json: true,
  maxAttempts: 5,
  retryDelay: 500,
  timeout: 15 * 1000,
  strictSSL: false,
  retryStrategy: myRetryStrategy,
});

export default request;
