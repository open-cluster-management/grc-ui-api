const request = require('request').defaults({ rejectUnauthorized: false });
const config = require('../config/config.js');
// const fs = require('fs');
const util = require('util');

module.exports.list = (req, res, next) => {
  const usertoken = req.token;
  // eslint-disable-next-line no-console
  console.log('user token: ', usertoken);

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
    console.log('Projects Response Code', response.statusCode);
    if (err) {
      return res.status(500).send(err.details);
    } else if (response.statusCode === 404) {
      options.url = `${config.ocp.apiserver_url}/api/v1/namespaces`;
      request.get(options, (nmerr, nmresponse, nmbody) => {
        // eslint-disable-next-line no-console
        console.log('Namespaces Response Code', nmresponse.statusCode);
        if (nmerr) {
          return res.status(500).send(nmerr.details);
        } else if (nmresponse.statusCode === 200 && nmbody && nmbody.items) {
          // console.log("Namespaces Response body", nmbody)
          for (let i = 0, l = nmbody.items.length; i < l; i += 1) {
            const nmobj = nmbody.items[i];
            // eslint-disable-next-line no-console
            console.log(util.inspect(nmobj, { showHidden: false, depth: null }));
          }
          // eslint-disable-next-line no-param-reassign
          res.itemslist = nmbody.items;
          return next();
        }
        return res.status(500).send('Something happenned');
      });
    } else if (response.statusCode === 200 && body && body.items) {
      for (let i = 0, l = body.items.length; i < l; i += 1) {
        const obj = body.items[i];
        // eslint-disable-next-line no-console
        console.log(util.inspect(obj, { showHidden: false, depth: null }));
      }
      // eslint-disable-next-line no-param-reassign
      res.itemslist = body.items;
      return next();
    }
    return res.status(500).send('Something happenned');
  });
};
