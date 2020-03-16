/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

// import _ from 'lodash';
import KubeModel from './kube';

const filterByName = (names, items) =>
  items.filter(item => names.find(name => name === item.metadata.name));

export default class PlacementModel extends KubeModel {
  async getPlacementBindings(selector = {}) {
    const { matchNames } = selector;

    const response = await this.kubeConnector.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/placementbindings`,
      { kind: 'PlacementBinding' },
    );
    const placementBindings = matchNames ? filterByName(matchNames, response) : response;

    return placementBindings.map(pb => ({
      metadata: pb.metadata,
      raw: pb,
      placementRef: pb.placementRef,
      subjects: pb.subjects,
    }));
  }

  async getPlacementRules(selector = {}) {
    const { matchNames } = selector;

    const response = await this.kubeConnector.getResources(
      ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules`,
      { kind: 'PlacementRule' },
    );
    const placementPolicies = matchNames ? filterByName(matchNames, response) : response;

    return placementPolicies.map(pp => ({
      clusterLabels: pp.spec.clusterLabels,
      metadata: pp.metadata,
      raw: pp,
      clusterReplicas: pp.spec.clusterReplicas,
      resourceSelector: pp.spec.resourceHint,
      status: pp.status,
    }));
  }
}
