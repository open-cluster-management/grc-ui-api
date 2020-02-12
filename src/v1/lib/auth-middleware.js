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
import createMockIAMHTTP from '../mocks/iam-http';
import request from './request';

const authConfig = require('../config/config');

// Async middleware error handler
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

// async function getKubeToken({
//   authorization,
//   cache,
//   httpLib,
//   shouldLocalAuth,
// }) {
//   let idToken;
//   if ((_.isEmpty(authorization) && shouldLocalAuth) || process.env.MOCK === 'true') {
//     // special case for graphiql to work locally
//     // do not exchange for idtoken since authorization header is empty
//     idToken = config.get('localKubeToken') || 'localdev';
//   } else {
//     const accessToken = authorization.substring(7);
//     // We cache the promise to prevent starting the same request multiple times.
//     let kubeTokenPromise = cache.get(`kubeToken_${accessToken}`);
//     if (!kubeTokenPromise) {
//       const options = {
//         url: `${config.get('cfcRouterUrl')}/idprovider/v1/auth/exchangetoken`,
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         method: 'POST',
//         json: true,
//         form: {
//           access_token: accessToken,
//         },
//       };
//       kubeTokenPromise = httpLib(options);
//       cache.set(`kubeToken_${accessToken}`, kubeTokenPromise);
//     }

//     const response = await kubeTokenPromise;
//     idToken = _.get(response, 'body.id_token');
//     if (!idToken) {
//       throw new Error(`Authentication error: ${JSON.stringify(response.body)}`);
//     }
//   }

//   return idToken;
// }
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

async function getNamespaces(usertoken) {
  const options = {
    url: `${authConfig.ocp.apiserver_url}/apis/project.openshift.io/v1/projects`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${usertoken}`,
    },
    json: true,
    fullResponse: false,
  };
  if (process.env.NODE_ENV === 'test') {
    const mockReq = createMockIAMHTTP();
    return mockReq(options);
  }
  return request(options);
}

// async function getAccountData({ iamToken, user }) {
//   const options = { iamToken };
//   if (process.env.NODE_ENV === 'test') {
//     options.httpLib = createMockIAMHTTP();
//   }

//   const idConnector = new IDConnector(options);

//   return idConnector.get(`/identity/api/v1/users/${user}`);
// }

export default function createAuthMiddleWare({
  cache = lru({
    max: 1000,
    maxAge: 2 * 60 * 1000, // 2 mins. Must keep low because user's permissions can change.
  }),
  shouldLocalAuth,
} = {}) {
  return asyncMiddleware(async (req, res, next) => {
    const idToken = await getKubeToken({
      authorization: req.headers.authorization || req.headers.Authorization,
      shouldLocalAuth,
    });

    req.kubeToken = idToken;

    const iamToken = _.get(req, "cookies['acm-access-token-cookie']") || config.get('acm-access-token-cookie');
    let userName = _.get(jws.decode(idToken), 'payload.uniqueSecurityName');
    if (process.env.NODE_ENV === 'test' || process.env.MOCK === 'true') {
      userName = 'admin_test';
    }
    // special case for redhat openshift, can't get user from idtoken
    // if (!userName) {
    //   // We cache the promise to prevent starting the same request multiple times.
    //   let userInfoPromise = cache.get(`userInfo_${iamToken}`);
    //   if (!userInfoPromise) {
    //     const options = {
    //       url: `${config.get('cfcRouterUrl')}/idprovider/v1/auth/userinfo`,
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       method: 'POST',
    //       json: true,
    //       form: {
    //         access_token: iamToken,
    //       },
    //     };
    //     userInfoPromise = httpLib(options);
    //     cache.set(`userInfo_${iamToken}`, userInfoPromise);
    //   }

    //   const response = await userInfoPromise;
    //   userName = _.get(response, 'body.sub') || _.get(response, 'body.name');
    //   if (!userName) {
    //     throw new Error(`Authentication error: ${response.body}`);
    //   }
    // }

    // Get the namespaces for the user.
    // We cache the promise to prevent starting the same request multiple times.
    let nsPromise = cache.get(`namespaces_${iamToken}`);
    if (!nsPromise) {
      nsPromise = getNamespaces(iamToken);
      cache.set(`namespaces_${iamToken}`, nsPromise);
    }

    // Get user's account data.
    // We cache the promise to prevent starting the same request multiple times.
    // let accountPromise = cache.get(`account_${iamToken}`);
    // if (!accountPromise) {
    //   accountPromise = getAccountData({
    //     iamToken,
    //     user: userName,
    //   });
    //   cache.set(`account_${iamToken}`, accountPromise);
    // }

    req.user = {
      name: userName,
      namespaces: await nsPromise,
      // userAccount: await accountPromise,
      iamToken,
    };

    next();
  });
}
