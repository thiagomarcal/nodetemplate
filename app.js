const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = express.Router();
const users = require('./routes/users');
const todos = require('./routes/todos');
const mongoose = require('mongoose');


const log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/todos.log' }
  ]
});

const logger = log4js.getLogger();

const app = express();

mongoose.connect('mongodb://localhost/thiago', {server: { poolSize: 10 }});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', router);

router.use('/users', users);
router.use('/todos', todos);

app.listen(3000, function () {
	logger.info('Example app listening on port 3000!');
});

module.exports = app;
