/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

const requestretry = require('requestretry');
const log4js = require('log4js');

const logger = log4js.getLogger('server');

const myRetryStrategy = (err, response) => {
  if (process.env.NODE_ENV === 'development' && err) {
    logger.error(err);
    logger.error(response);
  }

  return !!err || requestretry.RetryStrategies.HTTPError(err, response) || requestretry.RetryStrategies.NetworkError(err, response);
};

const request = requestretry.defaults({
  json: true,
  maxAttempts: 5,
  retryDelay: 500,
  strictSSL: false,
  retryStrategy: myRetryStrategy,
});

export default request;
