'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models');
const basicAuth = require('../middleware/auth/basic');
const bearerAuth = require('../middleware/auth/bearer');
const permissions = require('../middleware/auth/acl');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    console.log(output);
    res.status(200).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    next(e.message);
  }
});

authRouter.get(
  '/users',
  bearerAuth,
  permissions('delete'),
  async (req, res, next) => {
    try {
      const userRecords = await users.findAll({});
      const list = userRecords.map((user) => user.username);
      res.status(200).json(list);
    } catch (e) {
      next(e.message);
    }
  },
);

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  try {
    res.status(200).send('Welcome to the secret area');
  } catch (e) {
    next(e.message);
  }
});

module.exports = authRouter;