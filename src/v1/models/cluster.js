/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import _ from 'lodash';
import KubeModel from './kube';
import ApiGroup from '../lib/ApiGroup';

const clusterAPIPrefix = `/apis/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces`;
function getStatus(cluster) {
  const status = _.get(cluster, 'status.conditions[0].type', 'offline');
  return status === '' ? 'offline' : status.toLowerCase();
}

function formatClusterInfo(clustersInfos) {
  const resultArray = [];
  if (Array.isArray(clustersInfos) && clustersInfos.length > 0) {
    clustersInfos.forEach((info) => {
      const data = {
        metadata: info.metadata,
        status: getStatus(info),
        consoleURL: _.get(info, 'status.consoleURL'),
      };
      resultArray.push(data);
    });
  }
  return resultArray;
}

export default class ClusterModel extends KubeModel {
  async getAllClusters(args = {}) {
    const [clustersInfos] = await Promise.all([
      this.kubeConnector.getResources(ns => `${clusterAPIPrefix}/${ns}/managedclusterinfos`),
    ]);
    const results = formatClusterInfo(clustersInfos);
    if (args.name) {
      return results.filter(cluster => cluster.metadata.name === args.name)[0];
    }
    return results;
  }
}
