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
import logger from '../lib/logger';

const asyncReturn = (
  value,
  waitTime = 500,
) => new Promise((res) => setTimeout(res, waitTime, value));

const mockManagedClusterView = {
  body: {
    metadata: {
      selfLink: '/apis/view.open-cluster-management.io/v1beta1/namespaces/cluster-test/managedclusterviews/spoke-test',
    },
  },
};

const mockManagedClusterViewPollIncomplete = {
  body: {
    items: [
      {
        status: {
          status: 'Not Finished',
        },
      },
    ],
  },
};

const mockManagedClusterViewPollComplete = {
  body: {
    items: [
      {
        status: {
          conditions: [
            { type: 'Processing', lastUpdateTime: '2018-08-15T18:44:41Z' },
          ],
        },
      },
    ],
  },
};

const mockManagedClusterViewResults = {
  body: {
    status: {
      conditions: [
        { type: 'Processing', lastUpdateTime: '2018-08-15T18:44:41Z' },
      ],
      result: {
        apiVersion: 'v1',
        kind: 'Pod',
        metadata: {
          creationTimestamp: '2020-05-13T20:24:01Z',
          generateName: 'search-prod-28a0e-search-api-66cf776db5-',
          labels: {
            app: 'search',
            chart: 'search-prod-3.5.0',
            component: 'search-api',
            heritage: 'Helm',
            'pod-template-hash': '66cf776db5',
            release: 'search-prod-28a0e',
          },
          name: 'search-prod-28a0e-search-api-66cf776db5-7bzfh',
          namespace: 'open-cluster-management',
          resourceVersion: '45078202',
          selfLink: '/api/v1/namespaces/open-cluster-management/pods/search-prod-28a0e-search-api-66cf776db5-7bzfh',
          uid: '7ecc7859-5ce4-4e34-8834-bd687c0fe43d',
        },
        status: {
          conditions: [
            {
              lastProbeTime: null,
              lastTransitionTime: '2020-05-13T20:24:02Z',
              status: 'True',
              type: 'Initialized',
            },
            {
              lastProbeTime: null,
              lastTransitionTime: '2020-05-13T20:24:33Z',
              status: 'True',
              type: 'Ready',
            },
            {
              lastProbeTime: null,
              lastTransitionTime: '2020-05-13T20:24:33Z',
              status: 'True',
              type: 'ContainersReady',
            },
            {
              lastProbeTime: null,
              lastTransitionTime: '2020-05-13T20:24:02Z',
              status: 'True',
              type: 'PodScheduled',
            },
          ],
          phase: 'Running',
          qosClass: 'Burstable',
          startTime: '2020-05-13T20:24:02Z',
        },
      },
    },
  },
};

describe('KubeConnector', () => {
  describe('Constructor', () => {
    test('KubeConnector constructor throws error with no namespaces', async () => {
      expect(() => {
        KubeConnector({});
      }).toThrow(new Error('namespaces is required'));
    });
  });
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
      const mockHttp = jest.fn(() => new Promise((res) => setTimeout(res, 200, { body: { test: 'value' } })));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      await connector.get('/api/test', { headers: { 'x-custom-header': 'test-value' } });

      expect(mockHttp.mock.calls[0]).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });

    test('handles malicious url', async () => {
      const mockHttp = jest.fn(() => new Promise((res) => setTimeout(res, 200, { body: { test: 'value' } })));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      return expect(() => connector.get('/api/test', { url: 'bad-site' })).toThrow('ACM ERROR: invalid url: bad-site');
    });
  });

  describe('getResources', () => {
    test('logs error on request error', async () => {
      const mockHttp = jest.fn(() => {
        throw new Error('HTTP request error.');
      });
      // Mock the log so we can check the output
      const consoleOutput = [];
      const errorLogSpy = jest.fn().mockImplementation((input) => consoleOutput.push(input));
      logger.error = errorLogSpy;

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      const result = connector.getResources(() => ['/api/test']);
      // A promise is returned, so we need to get the data out of it
      return result.then((data) => {
        expect(consoleOutput[0]).toEqual('ACM REQUEST ERROR - HTTP request error.');
        expect(data).toEqual([]);
      });
    });

    test('logs info on 404', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { code: 404, message: 'Was not found.' } }, 404));
      // Mock the log so we can check the output
      const consoleOutput = [];
      const infoLogSpy = jest.fn().mockImplementation((input) => consoleOutput.push(input));
      logger.info = infoLogSpy;

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      const result = connector.getResources(() => ['/api/test']);
      // A promise is returned, so we need to get the data out of it
      return result.then((data) => {
        expect(consoleOutput[0]).toEqual('ACM INFO 404 - Was not found.');
        expect(data).toEqual([]);
      });
    });

    test('logs error on non-404', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { code: 403, message: 'There was an error.' } }, 403));
      // Mock the log so we can check the output
      const consoleOutput = [];
      const errorLogSpy = jest.fn().mockImplementation((input) => consoleOutput.push(input));
      logger.error = errorLogSpy;

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      const result = connector.getResources(() => ['/api/test']);
      // A promise is returned, so we need to get the data out of it
      return result.then((data) => {
        expect(consoleOutput[0]).toEqual('ACM ERROR 403 - There was an error.');
        expect(data).toEqual([]);
      });
    });

    test('logs error if strings are returned', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { items: ['This is a string.'] } }, 200));
      // Mock the log so we can check the output
      const consoleOutput = [];
      const errorLogSpy = jest.fn().mockImplementation((input) => consoleOutput.push(input));
      logger.error = errorLogSpy;

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      const result = connector.getResources(() => ['/api/test']);
      // A promise is returned, so we need to get the data out of it
      return result.then((data) => {
        expect(consoleOutput[0]).toEqual('ACM RESPONSE ERROR, Expected Objects but Returned this: This is a string.');
        expect(data).toEqual([]);
      });
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

    test('handles malicious url', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { test: 'value' } }, 200));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      return expect(() => connector.post('/api/test', { body: 'test-value' }, { url: 'bad-site' })).toThrow('ACM ERROR: invalid url: bad-site');
    });
  });

  describe('CreateManagedClusterView', () => {
    test('creates and polls ManagedClusterView api', async () => {
      const mockCache = { get: jest.fn().mockReturnValue(null), set: jest.fn() };
      const mockHttp = jest.fn()
        .mockImplementationOnce(() => asyncReturn(mockManagedClusterView))
        .mockImplementationOnce(() => asyncReturn(mockManagedClusterViewPollIncomplete))
        .mockImplementationOnce(() => asyncReturn(mockManagedClusterViewPollIncomplete))
        .mockImplementationOnce(() => asyncReturn(mockManagedClusterViewPollIncomplete))
        .mockImplementationOnce(() => asyncReturn(mockManagedClusterViewPollComplete))
        .mockImplementation(() => asyncReturn(mockManagedClusterViewResults));

      const connector = new KubeConnector({
        cache: mockCache,
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        uid: () => '1234',
        namespaces: ['open-cluster-management'],
      });

      const result = await connector.managedClusterViewQuery(
        'cluster-test',
        '',
        'Pod',
        'search-prod-28a0e-search-api-66cf776db5-7bzfh',
        'open-cluster-management',
        30,
        true,
      );

      expect(result).toMatchSnapshot();
    });
  });
});
