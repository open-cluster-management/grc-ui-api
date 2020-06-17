/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
export const mockOccurrences = {
  data: {
    occurrences: [
      {
        name: 'id-mycluster-account/providers/securityAdvisorNewProviderId/occurrences/securityAdvisorOccurrenceId',
        noteName: 'id-mycluster-account/providers/securityAdvisorNewProviderId/notes/securityAdvisorNoteID',
        updateTime: '2019-07-10T14:07:46.596382Z',
        createTime: '2019-07-10T14:07:46.596357Z',
        shortDescription: 'Registered services1',
        longDescription: 'ACM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'id-mycluster-account/providers/security-advisor',
        remediation: 'NonCompliant; Non-compliant certificatepolicies (expires in less than 50h0m0s) in kube-system[1]: [test-policy-cert, test-policy-cert-secret]',
        context: {
          accountId: 'id-mycluster-account',
          region: 'location',
          resourceType: 'worker',
          resourceName: 'www.myapp.com',
          resourceId: 'pluginId',
          resourceCrn: null,
          serviceName: 'application',
          serviceCrn: null,
        },
        reportedBy: {
          id: 'securityAdvisorNewProviderId',
          title: 'Title for Note',
          url: null,
        },
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'title here',
              url: 'Details URL',
            },
          ],
          dataTransferred: null,
        },
        securityClassification: {
          securityCategories: [
            'System and communications protections',
          ],
        },
      },
    ],
  },
};

export const mockDiffIdOccurrences = {
  data: {
    occurrences: [
      {
        name: 'testing-different-id/providers/securityAdvisorNewProviderId/occurrences/securityAdvisorOccurrenceId',
        noteName: 'testing-different-id/providers/securityAdvisorNewProviderId/notes/securityAdvisorNoteID',
        updateTime: '2019-07-10T14:07:46.596382Z',
        createTime: '2019-07-10T14:07:46.596357Z',
        shortDescription: 'Registered services1',
        longDescription: 'ACM Policy that is not compliant',
        providerId: 'security-advisor',
        providerName: 'testing-different-id/providers/security-advisor',
        remediation: 'NonCompliant; Non-compliant certificatepolicies (expires in less than 50h0m0s) in kube-system[1]: [test-policy-cert, test-policy-cert-secret]',
        context: {
          accountId: 'testing-different-id',
          region: 'location',
          resourceType: 'worker',
          resourceName: 'www.myapp.com',
          resourceId: 'pluginId',
          resourceCrn: null,
          serviceName: 'application',
          serviceCrn: null,
        },
        reportedBy: {
          id: 'securityAdvisorNewProviderId',
          title: 'Title for Note',
          url: null,
        },
        finding: {
          severity: 'HIGH',
          certainty: 'HIGH',
          networkConnection: null,
          nextSteps: [
            {
              title: 'title here',
              url: 'Details URL',
            },
          ],
          dataTransferred: null,
        },
        securityClassification: {
          securityCategories: [
            'System and communications protections',
          ],
        },
      },
    ],
  },
};
