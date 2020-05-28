/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Namespace implements K8sObject {
  cluster: String
  metadata: Metadata
  status: String
}
`;

// to-do how to deal with this after removing all resource view
export const resolver = {
  Query: {
    namespaces: (root, args, { resourceViewModel }) =>
      resourceViewModel.fetchResources({ type: 'namespaces' }),
  },
};
