[comment]: # ( Copyright Contributors to the Open Cluster Management project )

# grc-ui-api
[![Build Status](https://travis-ci.com/open-cluster-management/grc-ui-api.svg?token=2jHocNax82kqKsGV1uTE&branch=main)](https://travis-ci.com/open-cluster-management/grc-ui-api)

The UI API microservice, `grc-ui-api`, is the API server for the governance and risk dashboard UI for Open Cluster Management. (See [`grc-ui`](https://github.com/open-cluster-management/grc-ui) for the UI microservice that uses it)

## Build

- Install the modules

   ```bash
   npm ci
   ```
- Build the project

   ```bash
      npm run build
   or npm run build:watch
   or npm run build:production
   ```

## Running

**SECURITY WARNING:** The GRC UI API provides an SSL certificate in `/sslcert` that is open to the public. In order to run this in production, you'll need to replace these certificates. For our production builds, we replace these certificates using its Helm chart.

1. The following environment variables need to be set.
    ```
    API_SERVER_URL
    SERVICEACCT_TOKEN - the token that you can get from the top right corner of RHACM page - configure client - the value of oc config set-credentials admin --token, it's a long string, starts with "ey...". Please note that this is a temporary token and it expires.
    ```
2. Start the server
  - Development:
    ```
    npm start
    ```
  - Production:
    ```
    npm run start:production
    ```

<!---
Date: July/22/2021
-->
