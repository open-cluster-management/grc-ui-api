const config = {};

config.ocp = {};

config.ocp.apiserver_url = 'https://kubernetes.default';
config.ocp.serviceaccount_tokenpath = '/var/run/secrets/kubernetes.io/serviceaccount/token';

module.exports = config;
