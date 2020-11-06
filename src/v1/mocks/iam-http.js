/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export default function createMockHttp() {
  const state = {
    namespaces: {
      items: [
        { // non cluster namespace
          metadata: {
            name: 'default',
          },
        },
        { // non cluster namespace
          metadata: {
            name: 'kube-system',
          },
        },
        { // non cluster namespace
          metadata: {
            name: 'policy-namespace',
          },
        },
        { // cluster namespace
          metadata: {
            name: 'cluster1',
          },
        },
        { // cluster namespace
          metadata: {
            name: 'local-cluster',
          },
        },
      ],
    },
  };

  return async function MockLib(params) {
    switch (true) {
      case params.url.includes('resourceType=namespace'):
      default:
        return state.namespaces;
    }
  };
}
