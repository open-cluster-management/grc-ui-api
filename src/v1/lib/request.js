/* eslint-disable no-console */
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

const myRetryStrategy = (err, response) => {
  if (process.env.NODE_ENV === 'development' || process.env.DISABLE_CANARY_TEST) {
    console.log(response);
    console.log(err);
    // console.log(body);
  }

  return !!err || response.statusCode === 502;
};

const request = requestretry.defaults({
  json: true,
  maxAttempts: 5,
  retryDelay: 500,
  strictSSL: false,
  retryStrategy: myRetryStrategy,
});

export default request;
