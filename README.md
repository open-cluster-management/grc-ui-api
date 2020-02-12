# grc-ui-api
[![Build Status](https://travis-ci.com/open-cluster-management/grc-ui-api.svg?token=1xoYGv8XzWhB2heDk2My&branch=master)](https://travis-ci.com/open-cluster-management/grc-ui-api)

## Running
1. The folloing environment variables need to be set. [shared dev env](https://ibm.ent.box.com/notes/291748731101)
```
cfcRouterUrl
ARTIFACTORY_USER - mcmdev@us.ibm.com
ARTIFACTORY_PWD - Artifactory API KEY, base64 encoded. You can get this value for functional id mcmdev@us.ibm.com from: https://ibm.ent.box.com/notes/287638278960
localKubeToken - the token that you can get from the top right corner of mcm-ui page - configure client - the value of kubectl config set-credentials admin --token, it's a long string, starts with "ey...". Please note that this value is updated every 24 hrs.
```
2. Start the dev server
```
npm i
npm start
```
3. Start the production server
```
npm i
npm run build
npm run start:production
```
