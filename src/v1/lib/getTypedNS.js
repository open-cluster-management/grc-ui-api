/* Copyright (c) 2020 Red Hat, Inc. */
import _ from 'lodash';

// if nsType === 'allNonClusteNS', get the list of all non-clusters namespaces
// if nsType === 'allClusterNS', get the list of all clusters namespaces
// here passed kubeConnector as a parameter so this function can be reused anywhere
export default async function getTypedNS(kubeConnectorPara, nsType) {
  const clusterNSTemp = {};
  const clusterConsoleURLTemp = {};
  // all possible namespaces
  const allNameSpace = kubeConnectorPara.namespaces;
  const nsPromises = allNameSpace.map(async (ns) => {
    const checkClustersInfoURL = `/apis/internal.open-cluster-management.io/v1beta1/namespaces/${ns}/managedclusterinfos`;
    const [clustersInfo] = await Promise.all([kubeConnectorPara.get(checkClustersInfoURL)]);
    const clusterItems = _.get(clustersInfo, 'items');
    if (Array.isArray(clusterItems) && clusterItems.length > 0) {
      clusterItems.forEach((item) => {
        if (item.metadata && item.metadata.name
            && !Object.prototype.hasOwnProperty.call(clusterNSTemp, item.metadata.name)
            && item.metadata.namespace) {
          // current each cluster only have one namespace
          clusterNSTemp[item.metadata.name] = item.metadata.namespace;
          if (item.status && item.status.consoleURL) {
            clusterConsoleURLTemp[item.metadata.name] = item.spec.consoleURL;
          }
        }
      });// if nsType === 'allClusterNS', put cluster namespaces into final result
      return (nsType === 'allNonClusterNS') ? null : ns;
    }// if nsType === 'allNonClusteNS', put non cluster namespaces into final result
    return (nsType === 'allNonClusterNS') ? ns : null;
  });

  let nsResults = await Promise.all(nsPromises);
  nsResults = nsResults.filter(ns => ns !== null);

  const finalTypedResult = (nsType === 'allNonClusterNS') ?
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

  return finalTypedResult;
}
