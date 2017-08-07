var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var users = require('./routes/users');
var todos = require('./routes/todos');
var mongoose = require('mongoose');


var log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/todos.log' }
  ]
});

var logger = log4js.getLogger();

var app = express();

mongoose.connect('mongodb://localhost/teste', {server: { poolSize: 10 }});

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
