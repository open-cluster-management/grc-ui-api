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


import _ from 'lodash';
import LRU from 'lru-cache';
import createMockIAMHTTP from '../mocks/iam-http';
import request from './request';

// Async middleware error handler
const asyncMiddleware = (fn) => (req, res, next) => {
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
    // use SERVICEACCT_TOKEN to get idtoken
    if (process.env.SERVICEACCT_TOKEN) {
      idToken = `Bearer ${process.env.SERVICEACCT_TOKEN}`;
    } else {
      idToken = 'localdev';
    }
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
    url: `${process.env.API_SERVER_URL || 'https://kubernetes.default.svc'}/apis/project.openshift.io/v1/projects`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: usertoken,
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

export default function createAuthMiddleWare({
  cache = new LRU({
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

    let nsPromise = cache.get(`namespaces_${idToken}`);
    if (!nsPromise) {
      nsPromise = getNamespaces(idToken);
      cache.set(`namespaces_${idToken}`, nsPromise);
    }

    req.user = {
      namespaces: await nsPromise,
    };

    next();
  });
}
