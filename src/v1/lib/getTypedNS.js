/* Copyright (c) 2020 Red Hat, Inc. */
import _ from 'lodash';
import ApiGroup from './ApiGroup';

const clusterAPIPrefix = `/apis/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}`;
// nsType === 'allNonClusteNS' then get the list of all non-clusters namespaces
// nsType === 'allClusterNS' then get the list of all clusters namespaces
// here kubeConnector is passed as parameter so getTypedNS function can be reused anywhere
export default async function getTypedNS(kubeConnector, nsType) {
  const clusterNS = [];
  const clusterNSTemp = {};
  const clusterConsoleURLTemp = {};
  const nonClusterFlag = (nsType === 'allNonClusterNS');
  // all possible namespaces
  const allNameSpace = kubeConnector.namespaces;
  // Get all cluster information resources
  const getClustersURL = `${clusterAPIPrefix}/managedclusterinfos`;
  const allClusterInfo = await kubeConnector.get(getClustersURL);
  // Collect cluster information
  allClusterInfo.items.forEach((item) => {
    if (item.metadata && item.metadata.name
      && !Object.prototype.hasOwnProperty.call(clusterNSTemp, item.metadata.name)
      && item.metadata.namespace) {
      // currently each cluster only has one namespace
      clusterNS.push(item.metadata.namespace);
      clusterNSTemp[item.metadata.name] = item.metadata.namespace;
      if (item.status && item.status.consoleURL) {
        clusterConsoleURLTemp[item.metadata.name] = item.status.consoleURL;
      }
    }
  });

  // Return cluster information and list of requested set of namespaces
  return nonClusterFlag
    ? {
      clusterNSTemp,
      clusterConsoleURLTemp,
      allNonClusterNS: _.difference(allNameSpace, clusterNS),
    }
    : {
      clusterNSTemp,
      clusterConsoleURLTemp,
      allClusterNS: clusterNS,
    };
}
