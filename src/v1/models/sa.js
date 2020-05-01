/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019, 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */

import _ from 'lodash';
import KubeModel from './kube';
import config from '../../../config';

const acmTokenCookieStr = 'acm-access-token-cookie';

export default class SAModel extends KubeModel {
  async getOccurrences(userAccountID, req) {
    const urlUserAccountID = (userAccountID && userAccountID.length > 0) ? userAccountID : config.get('defaultUserAccountID');
    const url = config.get('NODE_ENV') === 'test' ? 'http://0.0.0.0' : config.get('cfcRouterUrl');
    const iamToken = _.get(req, `cookies[${acmTokenCookieStr}]`) || config.get(acmTokenCookieStr);
    const opts = {
      url: `${url}/findings/v1/${urlUserAccountID}/graph`,
      headers: {
        AccessToken: iamToken,
      },
    };
    const body = {
      query: `
      {
        occurrences(kind: "FINDING") {
          name
          noteName
          updateTime
          createTime
          shortDescription
          longDescription
          providerId
          providerName
          remediation
          context {
            accountId
            region
            resourceType
            resourceName
            resourceId
            resourceCrn
            serviceName
            serviceCrn
            clusterName
            namespaceName
          }
          reportedBy {
            id
            title
            url
          }
          finding {
            severity
            certainty
            networkConnection {
              client {
                address
                port
              }
              server {
                address
                port
              }
              direction
              protocol
            }
            nextSteps {
              title
              url
            }
            dataTransferred {
              clientBytes
              clientPackets
              serverBytes
              serverPackets
            }
          }
          securityClassification { 
            securityStandards
            securityCategories
            securityControl
          }
        }
      }`,
    };
    const response = await this.kubeConnector.post('', body, opts);
    if (response.errors) {
      throw new Error(`HCM ERROR ${JSON.stringify(response.errors)}`);
    }
    return response.data.occurrences || [];
  }

  async deleteOccurrences(selfLink, req) {
    const url = config.get('NODE_ENV') === 'test' ? 'http://0.0.0.0' : config.get('cfcRouterUrl');
    const iamToken = _.get(req, `cookies[${acmTokenCookieStr}]`) || config.get(acmTokenCookieStr);
    const opts = {
      url: `${url}/findings/v1/${selfLink}`,
      headers: {
        AccessToken: iamToken,
      },
    };
    const response = await this.kubeConnector.delete('', '', opts);
    if (response.code || response.message) {
      throw new Error(`MCM ERROR ${response.code} - ${response.message}`);
    }
    return response || 'Scucessfully delete occurrences';
  }
}
