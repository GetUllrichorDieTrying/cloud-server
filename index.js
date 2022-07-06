'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;

// const server = require('./api-server/src/server');

const { db } = require('./src/models');

db.sync().then(() => {
  require('./src/server').start(PORT);
});
