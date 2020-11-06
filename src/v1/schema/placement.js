/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ********************************************************************************
/* Copyright (c) 2020 Red Hat, Inc. */
import { gql } from 'apollo-server-express';

export const typeDef = gql`
# ACM Placement
type PlacementPolicy implements K8sObject {
  clusterLabels: JSON
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
  status: JSON
}

type PlacementBinding implements K8sObject {
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
  placementRef: Subject
  subjects: [Subject]
}

type Subject {
  apiGroup: String
  kind: String
  name: String
}
`;

export const resolver = {};
