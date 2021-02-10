/* Copyright (c) 2021 Red Hat, Inc. */
import _ from 'lodash';
import logger from './logger';

export default function buildSelfLinK(data) {
  // logger.info(`data : ${JSON.stringify(data)}`);
  const apiGroupVersion = _.get(data, 'raw.apiVersion')
    ? _.get(data, 'raw.apiVersion')
    : _.get(data, 'apiVersion');
  const resourceKind = _.get(data, 'kind', 'policy');
  const namespace = _.get(data, 'metadata.namespace');
  const name = _.get(data, 'metadata.name');
  let kind;
  let selfLink = '';
  if (apiGroupVersion && namespace && name) {
    switch (resourceKind.trim().toLowerCase()) {
      case 'placementrule':
        kind = 'placementrules';
        break;
      case 'placementbinding':
        kind = 'placementbindings';
        break;
      case 'policy':
      default:
        kind = 'policies';
        break;
    }
    selfLink = `/apis/${apiGroupVersion}/namespaces/${namespace}/${kind}/${name}`;
  } else if (_.get(data, 'metadata.selfLink')) {
    selfLink = _.get(data, 'metadata.selfLink');
  }
  logger.info(`buildSelfLinK : ${selfLink}`);
  return selfLink;
}
