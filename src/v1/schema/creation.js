/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Discoveries {
  clusterLabels: JSON
  policyNames: JSON
  annotations: JSON
  templates: [Templates]
  namespaces: JSON
}

type Templates {
  name: String
  spec: JSON
}
`;


export const resolver = {
  Query: {
    discoveries: async (root, args, {
      clusterModel, complianceModel,
    }) => {
      // existing cluster labels
      const labelMap = {};
      const clusters = await clusterModel.getAllClusters();
      clusters.forEach(({
        metadata,
      }) => {
        const { labels } = metadata;
        Object.entries(labels).forEach(([key, value]) => {
          labelMap[`${key}=${value}`] = { key, value };
        });
      });
      const clusterLabels = Object.values(labelMap);

      // existing policies
      const policyNames = [];
      const collection = { standards: new Set(), categories: new Set(), controls: new Set() };
      const compliances = await complianceModel.getCompliances();
      compliances.forEach(({
        name, metadata = {},
      }) => {
        const { annotations } = metadata;
        policyNames.push(name);
        Object.keys(collection).forEach((key) => {
          const types = annotations[`policy.mcm.ibm.com/${key}`] || '';
          types.split(',').forEach((type) => {
            const ttype = type.trim();
            if (ttype) {
              collection[key].add(ttype);
            }
          });
        });
      });

      // PolicyTemplates
      const templates = [];

      // Namespaces
      const allNameSpace = complianceModel.kubeConnector.namespaces;
      const nsPromises = allNameSpace.map(async (ns) => {
        const URL = `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters/`;
        const checkClusterNameSpace = await complianceModel.kubeConnector.get(URL);
        if (Array.isArray(checkClusterNameSpace.items) && checkClusterNameSpace.items.length > 0) {
          return null; // cluster namespaces
        }
        return ns; // non cluster namespaces
      });
      let allNonClusterNameSpace = await Promise.all(nsPromises);
      allNonClusterNameSpace = allNonClusterNameSpace.filter(ns => ns !== null);

      return {
        clusterLabels,
        policyNames,
        annotations: collection,
        templates,
        namespaces: allNonClusterNameSpace,
      };
    },
  },
};
