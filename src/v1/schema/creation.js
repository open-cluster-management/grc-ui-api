/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
import { gql } from 'apollo-server-express';
import _ from 'lodash';
import ApiGroup from '../lib/ApiGroup';
import getTypedNS from '../lib/getTypedNS';

export const typeDef = gql`
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
        if (!_.isEmpty(metadata)) {
          const { labels } = metadata;
          if (labels) {
            Object.entries(labels).forEach(([key, value]) => {
              labelMap[`${key}=${value}`] = { key, value };
            });
          }
        }
      });
      const clusterLabels = Object.values(labelMap);

      // existing policies
      const policyNames = [];
      const collection = { standards: new Set(), categories: new Set(), controls: new Set() };
      const compliances = await complianceModel.getCompliances();
      compliances.forEach(({
        name, metadata = {},
      }) => {
        if (!_.isEmpty(metadata)) {
          const { annotations } = metadata;
          policyNames.push(name);
          Object.keys(collection).forEach((key) => {
            const types = _.get(annotations, `${ApiGroup.policiesGroup}/${key}`, '');
            types.split(',').forEach((type) => {
              const ttype = type.trim();
              if (ttype) {
                collection[key].add(ttype);
              }
            });
          });
        }
      });

      // PolicyTemplates
      const templates = [];

      // Namespaces
      const { allNonClusterNS } = await getTypedNS(complianceModel.kubeConnector, 'allNonClusterNS');

      return {
        clusterLabels,
        policyNames,
        annotations: collection,
        templates,
        namespaces: allNonClusterNS,
      };
    },
  },
};
