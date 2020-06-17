/* Copyright (c) 2020 Red Hat, Inc. */
import _ from 'lodash';
import ApiGroup from '../lib/ApiGroup';

const clusterAPIPrefix = `/apis/${ApiGroup.clusterInfoGroup}/${ApiGroup.clusterAPIVersion}/namespaces`;
// nsType === 'allNonClusteNS' then get the list of all non-clusters namespaces
// nsType === 'allClusterNS' then get the list of all clusters namespaces
// here kubeConnector is passed as parameter so getTypedNS function can be reused anywhere
export default async function getTypedNS(kubeConnector, nsType) {
  const clusterNSTemp = {};
  const clusterConsoleURLTemp = {};
  const typeFlag = (nsType === 'allNonClusterNS');
  // all possible namespaces
  const allNameSpace = kubeConnector.namespaces;
  const nsPromises = allNameSpace.map(async (ns) => {
    const checkClustersInfoURL = `${clusterAPIPrefix}/${ns}/managedclusterinfos`;
    const [clustersInfos] = await Promise.all([kubeConnector.get(checkClustersInfoURL)]);
    const clustersItems = _.get(clustersInfos, 'items');
    if (Array.isArray(clustersItems) && clustersItems.length > 0) {
      clustersItems.forEach((item) => {
        if (item.metadata && item.metadata.name
            && !Object.prototype.hasOwnProperty.call(clusterNSTemp, item.metadata.name)
            && item.metadata.namespace) {
          // current each cluster only have one namespace
          clusterNSTemp[item.metadata.name] = item.metadata.namespace;
          if (item.status && item.status.consoleURL) {
            clusterConsoleURLTemp[item.metadata.name] = item.status.consoleURL;
          }
        }
      });// if nsType === 'allClusterNS', put cluster namespaces into final result
      return typeFlag ? null : ns;
    }// if nsType === 'allNonClusteNS', put non cluster namespaces into final result
    return typeFlag ? ns : null;
  });

  let nsResults = await Promise.all(nsPromises);
  nsResults = nsResults.filter(ns => ns !== null);

  return typeFlag ?
    {
      clusterNSTemp,
      clusterConsoleURLTemp,
      allNonClusterNS: nsResults,
    } :
    {
      clusterNSTemp,
      clusterConsoleURLTemp,
      allClusterNS: nsResults,
    };
}
