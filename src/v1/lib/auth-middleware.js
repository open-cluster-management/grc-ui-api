/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import lru from 'lru-cache';
import jws from 'jws';
import config from '../../../config';
import IDConnector from '../connectors/idmgmt';
import createMockIAMHTTP from '../mocks/iam-http';
import request from './request';

// Async middleware error handler
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

async function getKubeToken({
  authorization,
  shouldLocalAuth,
}) {
  let idToken;
  if ((_.isEmpty(authorization) && shouldLocalAuth) || process.env.MOCK === 'true') {
    // special case for graphiql to work locally
    // do not exchange for idtoken since authorization header is empty
    idToken = config.get('localKubeToken') || 'localdev';
  } else {
    idToken = authorization;
    if (!idToken) {
      throw new Error('Authentication error: invalid token parsed from cookie');
    }
  }

  return idToken;
}

async function getNamespaces({ iamToken, user }) {
  const options = { iamToken };
  if (process.env.NODE_ENV === 'test') {
    options.httpLib = createMockIAMHTTP();
  }

  const idConnector = new IDConnector(options);

  return idConnector.get(`/identity/api/v1/users/${user}/getTeamResources?resourceType=namespace`);
}

async function getAccountData({ iamToken, user }) {
  const options = { iamToken };
  if (process.env.NODE_ENV === 'test') {
    options.httpLib = createMockIAMHTTP();
  }

  const idConnector = new IDConnector(options);

  return idConnector.get(`/identity/api/v1/users/${user}`);
}

export default function createAuthMiddleWare({
  cache = lru({
    max: 1000,
    maxAge: 2 * 60 * 1000, // 2 mins. Must keep low because user's permissions can change.
  }),
  shouldLocalAuth,
} = {}) {
  return asyncMiddleware(async (req, res, next) => {
    const iamToken = await getKubeToken({
      authorization: req.headers.authorization || req.headers.Authorization,
      shouldLocalAuth,
    });

    req.kubeToken = iamToken;

    let userName = _.get(jws.decode(iamToken), 'payload.uniqueSecurityName');
    if (process.env.NODE_ENV === 'test' || process.env.MOCK === 'true') {
      userName = 'admin_test';
    }

    // Get the namespaces for the user.
    // We cache the promise to prevent starting the same request multiple times.
    let nsPromise = cache.get(`namespaces_${iamToken}`);
    if (!nsPromise) {
      nsPromise = getNamespaces({
        // cookies field doesn't exist on test case requests
        iamToken,
        user: userName,
      });
      cache.set(`namespaces_${iamToken}`, nsPromise);
    }

    // Get user's account data.
    // We cache the promise to prevent starting the same request multiple times.
    let accountPromise = cache.get(`account_${iamToken}`);
    if (!accountPromise) {
      accountPromise = getAccountData({
        iamToken,
        user: userName,
      });
      cache.set(`account_${iamToken}`, accountPromise);
    }

    req.user = {
      name: userName,
      namespaces: await nsPromise,
      userAccount: await accountPromise,
      iamToken,
    };

    next();
  });
}
