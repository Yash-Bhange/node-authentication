const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');
const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

leaderRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Leaders.find({})
            .then((lea) => {
                console.log(lea);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lea);
            }, (err) => next(err))
            .catch((err) => next(err));

        //console.log("get accepted");
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.create(req.body)
            .then((lea) => {
                console.log("dish created :" + lea);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lea);

            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.remove({})
            .then((response) => {
                console.log("All deleted bruh");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// i have made another route  bruh;

leaderRouter.route('/:leaId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Leaders.findById(req.params.leaId)
            .then((lea) => {
                console.log(lea);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lea);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Leaders/' + req.params.leaId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaId, { $set: req.body }, { new: true })
            .then((lea) => {
                console.log("promotion created :" + lea);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(lea);

            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaId)
            .then((response) => {
                console.log(" deleted bruh");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));

    });


module.exports = leaderRouter;