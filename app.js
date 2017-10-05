'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = express.Router();
const users = require('./routes/users');
const mongoose = require('mongoose');
const config = require('./config/settings.json');


const log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: config.logfile }
  ]
});

const logger = log4js.getLogger();

const app = express();

mongoose.connect(config.mongo_url, {server: { poolSize: config.mongo_pullsize }});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', router);

router.use('/users', users);

app.listen(3000, function () {
	logger.info('Example app listening on port 3000!');
});

module.exports = app;
