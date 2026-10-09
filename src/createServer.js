'use strict';

const express = require('express');
const cors = require('cors');
const { createExpensesRouter } = require('./models/routers/expreseRouter');
const { createUserRouter } = require('./models/routers/userRouter');
const { resetUser } = require('./models/services/user.service');
const { resetExpenses } = require('./models/services/expense.service');

function createServer() {
  const app = express();

  resetUser();
  resetExpenses();

  app.use(express.json());
  app.use(cors());
  app.use('/expenses', createExpensesRouter());
  app.use('/users', createUserRouter());

  return app;
}

module.exports = {
  createServer,
};
