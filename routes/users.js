const express = require('express');
const router = express.Router();
const userModal = require('../models/user');
const log4js = require('log4js');
const seedUsers = require('../seed/users.json');

const logger = log4js.getLogger();

/* GET seed listing. */
router.get('/seed', function(req, res) {

    logger.info(req.baseUrl + req.route.path);

    const users = seedUsers.results;
    userModal.create(users, function(err, response) {
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
    userModal.find({}, function(err, response) {
        if (err) {
            logger.error(err);
            returnErrorMessage(err, res);
        } else {
            res.json(response);
        }
    });
});

/* GET field*/
router.get('/:username', function(req, res) {
    logger.info(req.baseUrl + req.route.path);

    const username = req.params.username;

    console.log("username", username);

    userModal.find({
        "login.username": username
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
    userModal.create(todo, function(err, response) {
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
    userModal.findByIdAndUpdate(id, todo, {
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
    userModal.findByIdAndRemove(id, function(err, response) {
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