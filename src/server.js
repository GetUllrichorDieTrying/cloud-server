'use strict';

const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/auth/logger');

const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');
const authRouter = require('./routes/auth');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());a
// app.use(morgan('dev'));

app.use(logger);

app.get('/', (req, res, next) => {
  try {
    res.status(200).send();
  } catch (e) {
    next('Error', e.message);
    return e;
  }
});
app.use(authRouter);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
