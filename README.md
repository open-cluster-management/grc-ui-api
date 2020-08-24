# grc-ui-api
[![Build Status](https://travis-ci.com/open-cluster-management/grc-ui-api.svg?token=1xoYGv8XzWhB2heDk2My&branch=master)](https://travis-ci.com/open-cluster-management/grc-ui-api)

## Running
1. The folloing environment variables need to be set.
```
API_SERVER_URL
SERVICEACCT_TOKEN - the token that you can get from the top right corner of RHACM page - configure client - the value of oc config set-credentials admin --token, it's a long string, starts with "ey...". Please note that this is a temporary token and it expires.
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

