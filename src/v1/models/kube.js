/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import { isRequired } from '../lib/utils';

// Abstract class for models that communicate with the kubernetes api
export default class Kube {
  constructor({ kubeConnector = isRequired('kubeConnector') }) {
    this.kubeConnector = kubeConnector;
  }
}
