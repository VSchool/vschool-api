var ponyRouter = require('express').Router({mergeParams: true});
var Pony = require('../model').Pony;
var error = require('../error');

ponyRouter.get('/', function (req, res) {
        Pony.find({
            sessionId: req.params.sessionId
        }, function (err, objs) {
            if (err)
                error.databaseError(req, res);

            res.send(objs);
        });
    })
    .post('/', function (req, res) {
        var model = new Pony(req.body);
        model.sessionId = req.params.sessionId;
        model.save(function (err, obj) {
            if (err)
                error.databaseError(req, res, err);

            res.send(obj);
        });
    });

ponyRouter.put('/:ponyId', function (req, res) {
        Pony.findOneAndUpdate({sessionId: req.params.sessionId, _id: req.params.ponyId},
            req.body,
            {
                upsert: true,
                new: true
            }, function (err, obj) {

                if (err)
                    error.databaseError(req, res, err);
                res.send(obj);
            });
    })
    .delete('/:ponyId', function (req, res) {
        Pony.remove({sessionId: req.params.sessionId, _id: req.params.ponyId}, function (err) {
            if (err)
                error.databaseError(req, res, err);

            res.send({
                msg: "Successfully deleted record"
            });
        });
    });

module.exports = ponyRouter;