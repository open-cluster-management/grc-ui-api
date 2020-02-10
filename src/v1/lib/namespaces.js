import logger from './logger';

const request = require('request').defaults({ rejectUnauthorized: false });
const config = require('../config/config.js');

module.exports.listNamespaces = async (token, cb) => {
  logger.info('inside listNs');
  const usertoken = token;

  const options = {
    url: `${config.ocp.apiserver_url}/apis/project.openshift.io/v1/projects`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${usertoken}`,
    },
    json: true,
  };

  // retrieving projects , fall back to namespaces api if projects is unavailable
  request.get(options, (err, response, body) => {
    // eslint-disable-next-line no-console
    logger.info('Projects Response Code', response.statusCode);
    if (err) {
      cb(err);
    } else if (response.statusCode === 404) {
      options.url = `${config.ocp.apiserver_url}/api/v1/namespaces`;
      request.get(options, (nmerr, nmresponse, nmbody) => {
        // console.log("Namespaces Response Code", nmresponse.statusCode);
        if (nmerr) {
          return cb(nmerr);
        } else if (nmresponse.statusCode === 200 && nmbody && nmbody.items) {
          // console.log("Namespaces Response body", nmbody)
        //   for (let i = 0, l = nmbody.items.length; i < l; i += 1) {
        //     const nmobj = nmbody.items[i];
        //     console.log(util.inspect(nmobj, {showHidden: false, depth: null}));
        //   }
          return cb(null, nmbody.items);
        }
        return cb(new Error('Something happenned'));
      });
    } else if (response.statusCode === 200 && body && body.items) {
    //   for (let i = 0, l = body.items.length; i < l; i += 1) {
    //     var obj = body.items[i];
    //     console.log(util.inspect(obj, {showHidden: false, depth: null}))
    //   }
      return cb(null, body.items);
    }
    return cb(new Error('Something happened'));
  });
};
