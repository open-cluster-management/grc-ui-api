const config = {};

config.ocp = {};

// for prod
// config.ocp.apiserver_url = 'https://kubernetes.default';
// config.ocp.serviceaccount_tokenpath = '/var/run/secrets/kubernetes.io/serviceaccount/token';

// for test
config.ocp.apiserver_url = 'https://api.straits.os.fyre.ibm.com:6443';
config.ocp.serviceaccount_token = 'rTTQjLVS84cqBgICAr7RF9fpqClp4Xs4W1PW6tu2n8M';

module.exports = config;
