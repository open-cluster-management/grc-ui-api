/* Copyright (c) 201 Red Hat, Inc. */
import _ from 'lodash';
import logger from './logger';

export default function buildSelfLinK(json) {
  // logger.info(`json : ${JSON.stringify(json)}`);
  const apiGroupVersion = _.get(json, 'apiVersion', 'raw.apiVersion');
  const resourceKind = _.get(json, 'kind');
  const namespace = _.get(json, 'metadata.namespace');
  const name = _.get(json, 'metadata.name');
  let kind;
  let selfLink = '';
  if (apiGroupVersion && namespace && resourceKind && name) {
    switch (resourceKind.trim().toLowerCase()) {
      case 'placementrule':
        kind = 'placementrules';
        break;
      case 'placementbinding':
        kind = 'placementbindings';
        break;
      default:
        kind = 'policies';
        break;
    }
    selfLink = `/apis/${apiGroupVersion}/namespaces/${namespace}/${kind}/${name}`;
  } else if (_.get(json, 'metadata.selfLink')) {
    selfLink = _.get(json, 'metadata.selfLink');
  }
  logger.info(`buildSelfLinK : ${selfLink}`);
  return selfLink;
}
