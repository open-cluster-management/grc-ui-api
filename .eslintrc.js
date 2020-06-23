/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* Copyright (c) 2020 Red Hat, Inc. */
module.exports = {
  plugins: ['jest'],
  extends: ['plugin:jest/recommended', 'airbnb-base'],
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['accum', 'req'] }],
    // turn off here for airbnb-base v14, which set limit to 100, sonar stil check this at limit 180
    'max-len': 'off',
    'no-underscore-dangle': 'off',
  },
};
