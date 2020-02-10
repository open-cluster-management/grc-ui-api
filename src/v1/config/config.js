const config = {};

config.ocp = {};

// for prod
// config.ocp.apiserver_url = 'https://kubernetes.default';
// config.ocp.serviceaccount_tokenpath = '/var/run/secrets/kubernetes.io/serviceaccount/token';

// for test
config.ocp.apiserver_url = 'https://api.straits.os.fyre.ibm.com:6443';
config.ocp.serviceaccount_token = '3DdNt9wE_NLkVwqU1-bxtp3_e-8FXd5mnj_qZ0mGTnA';

module.exports = config;
