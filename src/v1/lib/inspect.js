const inspectClient = require('./inspect-client.js');

const log4js = require('log4js');

const logger = log4js.getLogger('server');

module.exports.app = (req, res, next) => {
  let token;
  logger.info('entered app fn');
  if (req.headers.authorization || req.headers.Authorization) {
    logger.info('req headers found');
    token = req.headers.authorization ? req.headers.authorization : req.headers.Authorization;
    const words = token.trim().split(/[\s,]+/);
    if (!(words[0].toLowerCase().match('bearer'))) {
      res.status(403).send('No bearer in value');
    }
    if (words[1] && words[1].length > 1) {
      [, token] = words;
    }
  } else if (req.get('Authorization')) {
    logger.info('getting req headers');
    token = req.get('Authorization');
  }

  if (!token) {
    return res.status(401).send('The request is unauthorized, no token provided.');
  }

  inspectClient.inspect(req, token, (err, response, body) => {
    if (err) {
      return res.status(500).send(err.details);
    } else if (body && body.status && body.status.error) {
      return res.status(401).send(body.status.error);
    } else if (body && body.status && body.status.user) {
      req.user = body.status.user;
      req.token = token;
      // eslint-disable-next-line no-console
      logger.info('security middleware check passed');
      return next();
    }
    // eslint-disable-next-line no-console
    logger.info('HERE');
    return res.status(401).send('The token provided is not valid');
  });
};
