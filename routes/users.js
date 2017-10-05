'use strict';

const express = require('express');
const router = express.Router();
const userModal = require('../models/user');
const log4js = require('log4js');
const seedUsers = require('../seed/users.json');
const axios = require('axios');

const logger = log4js.getLogger();

/* GET seed listing. */
router.get('/seed', (req, res) => {
    logger.info(req.baseUrl + req.route.path);
    const users = seedUsers.results;
    userModal.create(users, function (err, response) {
        if (err) {
            returnErrorMessage(err, res);
        } else {
            res.json(response);
        }
    });
});


/* GET auto seed listing. */
router.get('/autoseed/:usersnumber', (req, res) => {
    logger.info(req.baseUrl + req.route.path);
    const usersnumber = req.params.usersnumber;
    axios.get(`https://randomuser.me/api/?results=${usersnumber}`)
        .then((body) => {
            const users = body.data.results;

            userModal.create(users, (err, response) => {
                if (err) {
                    returnErrorMessage(err, res);
                } else {
                    res.json(response);
                }
            });
        })
        .catch((err)=>{
            returnErrorMessage(err, res);
    });
});

/* GET listing. */
router.get('/', (req, res) => {
    logger.info(req.baseUrl + req.route.path);
    userModal.find({}, function (err, response) {
        if (err) {
            returnErrorMessage(err, res);
        } else {
            res.json(response);
        }
    });
});

/* GET field*/
router.get('/:username', (req, res) => {
    logger.info(req.baseUrl + req.route.path);

    const username = req.params.username;

    console.log("username", username);

    userModal.findOne({
        "login.username": username
    }, (err, response) => {
        if (err) {
            returnErrorMessage(err, res);
        } else {
            res.json(response);
        }
    });
});

/* POST */
router.post('/', (req, res) => {
    logger.info(req.baseUrl + req.route.path);

    const todo = req.body;
    userModal.create(todo, (err, response) => {
        if (err) {
            returnErrorMessage(err, res);
        } else {
            res.json(response);
        }
    });
});

/* PUT */
router.put('/:id', (req, res) => {
    logger.info(req.baseUrl + req.route.path);

    const id = req.params.id;
    const todo = req.body;
    userModal.findByIdAndUpdate(id, todo, {
        new: true
    }, (err, response) => {
        if (err) {
            returnErrorMessage(err, res);
        } else {
            res.json(response);
        }
    });
});

/* DELETE */
router.delete('/', (req, res) => {
    logger.info(req.baseUrl + req.route.path);

    const id = req.body.id;
    userModal.findByIdAndRemove(id, (err, response) => {
        if (err) {
            returnErrorMessage(err, res);
        } else {
            res.json(response);
        }
    });
});

let returnErrorMessage = (err, res) => {
    console.error(err);
    res.status(500);
    res.json({
        code: 500,
        message: err.message
    });
};


module.exports = router;