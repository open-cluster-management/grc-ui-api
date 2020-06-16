/* Copyright (c) 2020 Red Hat, Inc. */
import _ from 'lodash';

// nsType === 'allNonClusteNS' then get the list of all non-clusters namespaces
// nsType === 'allClusterNS' then get the list of all clusters namespaces
// here kubeConnector is passed as parameter so getTypedNS function can be reused anywhere
export default async function getTypedNS(kubeConnector, nsType) {
  const clusterNSTemp = {};
  const clusterConsoleURLTemp = {};
  // all possible namespaces
  const allNameSpace = kubeConnector.namespaces;
  const nsPromises = allNameSpace.map(async (ns) => {
    const checkClustersInfoURL = `/apis/internal.open-cluster-management.io/v1beta1/namespaces/${ns}/managedclusterinfos`;
    const [clustersInfo] = await Promise.all([kubeConnector.get(checkClustersInfoURL)]);
    const clusterItems = _.get(clustersInfo, 'items');
    if (Array.isArray(clusterItems) && clusterItems.length > 0) {
      clusterItems.forEach((item) => {
        if (item.metadata && item.metadata.name
            && !Object.prototype.hasOwnProperty.call(clusterNSTemp, item.metadata.name)
            && item.metadata.namespace) {
          // current each cluster only have one namespace
          clusterNSTemp[item.metadata.name] = item.metadata.namespace;
          if (item.status && item.status.consoleURL) {
            clusterConsoleURLTemp[item.metadata.name] = item.status.consoleUR;
          }
        }
      });// if nsType === 'allClusterNS', put cluster namespaces into final result
      return (nsType === 'allNonClusterNS') ? null : ns;
    }// if nsType === 'allNonClusteNS', put non cluster namespaces into final result
    return (nsType === 'allNonClusterNS') ? ns : null;
  });

  let nsResults = await Promise.all(nsPromises);
  nsResults = nsResults.filter(ns => ns !== null);

  const finalResult = (nsType === 'allNonClusterNS') ?
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

  return finalResult;
}
