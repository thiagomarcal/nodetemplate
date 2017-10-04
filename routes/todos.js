const express = require('express');
const router = express.Router();
const todoModel = require('../models/todo');
const log4js = require('log4js');

const logger = log4js.getLogger();

/* GET seed listing. */
router.get('/seed', function(req, res) {

	logger.info(req.baseUrl + req.route.path);

	const todos = [{
		message: "teste1",
		createdAt: new Date(),
		updatedAt: new Date()
	}, {
		message: "teste2",
		createdAt: new Date(),
		updatedAt: new Date()
	}, {
		message: "teste3",
		createdAt: new Date(),
		updatedAt: new Date()
	}];

	todoModel.create(todos, function(err, response) {
		if (err) {
			logger.error(err);
			returnErrorMessage(err, res);
		} else {
			res.json(response);
		}
	});

});

/* GET listing. */
router.get('/', function(req, res) {

	logger.info(req.baseUrl + req.route.path);

	todoModel.find({}, function(err, response) {
		if (err) {
			logger.error(err);
			returnErrorMessage(err, res);
		} else {
			res.json(response);
		}
	});
});

/* GET field*/
router.get('/:message', function(req, res) {

	logger.info(req.baseUrl + req.route.path);

	const msg = req.params.message;
	todoModel.find({
		message: msg
	}, function(err, response) {
		if (err) {
			logger.error(err);
			returnErrorMessage(err, res);
		} else {
			res.json(response);
		}
	});
});


/* POST */
router.post('/', function(req, res) {

	logger.info(req.baseUrl + req.route.path);

	const todo = req.body;
	todoModel.create(todo, function(err, response) {
		if (err) {
			logger.error(err);
			returnErrorMessage(err, res);
		} else {
			res.json(response);
		}
	});
});


/* PUT */
router.put('/:id', function(req, res) {

	logger.info(req.baseUrl + req.route.path);

	const id = req.params.id;
	const todo = req.body;
	todoModel.findByIdAndUpdate(id, todo, {
		new: true
	}, function(err, response) {
		if (err) {
			logger.error(err);
			returnErrorMessage(err, res);
		} else {
			res.json(response);
		}
	});
});

/* DELETE */
router.delete('/', function(req, res) {

	logger.info(req.baseUrl + req.route.path);

	const id = req.body.id;
	todoModel.findByIdAndRemove(id, function(err, response) {
		if (err) {
			logger.error(err);
			returnErrorMessage(err, res);
		} else {
			res.json(response);
		}
	});
});


function returnErrorMessage(err, res) {
	res.status(500);
	res.json({
		code: 500,
		message: err.message
	});
}


module.exports = router;