/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import KubeConnector from './kube';

const asyncReturn = (value, waitTime = 500) =>
  new Promise(res => setTimeout(res, waitTime, value));

describe('KubeConnector', () => {
  describe('Get', () => {
    test('calls httpLib with correct arguments', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { test: 'value' } }, 200));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      await connector.get('/api/test');

      expect(mockHttp.mock.calls).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });

    test('correctly merges additional arguments', async () => {
      const mockHttp = jest.fn(() =>
        new Promise(res =>
          setTimeout(res, 200, { body: { test: 'value' } })));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      await connector.get('/api/test', { headers: { 'x-custom-header': 'test-value' } });

      expect(mockHttp.mock.calls[0]).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('Post', () => {
    test('calls httpLib with correct arguments', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { test: 'value' } }, 200));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      await connector.post('/api/test', { body: 'test-value' });

      expect(mockHttp.mock.calls[0]).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });
  });
});
