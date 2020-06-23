/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export function isRequired(paramName) {
  throw new Error(`${paramName} is required`);
}

export function getType(item) {
  if (item.spec.hostPath) {
    return 'Hostpath';
  }
  if (item.spec.gcePersistentDisk) {
    return 'GCEPersistentDisk';
  }
  if (item.spec.awsElasticBlockStore) {
    return 'AWSElasticBlockStore';
  }
  if (item.spec.nfs) {
    return 'NFS';
  }
  if (item.spec.iscsi) {
    return 'iSCSI';
  }
  if (item.spec.glusterfs) {
    return 'Glusterfs';
  }
  if (item.spec.rbd) {
    return 'RBD';
  }
  if (item.spec.secret) {
    return 'Secret';
  }
  if (item.spec.local) {
    return 'LocalVolume';
  }
  if (item.spec.vsphereVolume) {
    return 'vSphere';
  }

  return '-';
}

export default {};
