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
          crn: 'crn:v1:icp:private:k8:mycluster:n/default:::',
          serviceName: 'k8',
          region: 'mycluster',
          scope: 'namespace',
          metadata: {
            name: 'default',
          },
          actions: 'CRUD',
        },
        { // non cluster namespace
          crn: 'crn:v1:icp:private:k8:mycluster:n/kube-system:::',
          serviceName: 'k8',
          region: 'mycluster',
          scope: 'namespace',
          metadata: {
            name: 'kube-system',
          },
          actions: 'CRUD',
        },
        { // non cluster namespace
          crn: 'crn:v1:icp:private:k8:mycluster:n/kube-system:::',
          serviceName: 'k8',
          region: 'mycluster',
          scope: 'namespace',
          metadata: {
            name: 'mcm',
          },
          actions: 'CRUD',
        },
        { // cluster namespace
          crn: 'crn:v1:icp:private:k8:mycluster:n/kube-system:::',
          serviceName: 'k8',
          region: 'mycluster',
          scope: 'namespace',
          metadata: {
            name: 'cluster1',
          },
          actions: 'CRUD',
        },
        { // cluster namespace
          crn: 'crn:v1:icp:private:k8:mycluster:n/kube-system:::',
          serviceName: 'k8',
          region: 'mycluster',
          scope: 'namespace',
          metadata: {
            name: 'clusterhub',
          },
          actions: 'CRUD',
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
