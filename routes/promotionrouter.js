const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());
var authenticate = require('../authenticate');



promotionRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promo) => {
                console.log(promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));

        //console.log("get accepted");
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.create(req.body)
            .then((promo) => {
                console.log("dish created :" + promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);

            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.remove({})
            .then((response) => {
                console.log("All deleted bruh");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// i have made another route  bruh;

promotionRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
            .then((promo) => {
                console.log(promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, { $set: req.body }, { new: true })
            .then((promo) => {
                console.log("promotion created :" + promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);

            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((response) => {
                console.log(" deleted bruh");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));

    });


module.exports = promotionRouter;