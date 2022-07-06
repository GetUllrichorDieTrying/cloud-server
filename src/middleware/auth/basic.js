'use strict';

const base64 = require('base-64');
const { users } = require('../../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next('Invalid login');
  } else {
    try {
      let authStr = req.headers.authorization.split(' ')[1];
      // encode
      let decodedAuthStr = base64.decode(authStr);
      console.log(decodedAuthStr);
      let [username, password] = decodedAuthStr.split(':');

      req.user = await users.authenticateBasic(username, password);
      next();
    } catch (e) {
      console.error(e);
      res.status(403).send('Invalid Login');
    }
  }
};
