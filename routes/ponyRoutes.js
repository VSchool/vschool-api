var ponyRouter = require('express').Router();
var Pony = require('../model').Pony;

ponyRouter.get('/:sessionId', function (req, res) {
    Pony.find({
        sessionId: req.params.sessionId
    }, function (err, objs) {
        if (err)
            error.databaseError(req, res);

        res.send(objs);
    });
});

ponyRouter.put('/:sessionId', function (req, res) {
    Pony.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        upsert: true,
        new: true
    }, function (err, obj) {

        if (err)
            error.databaseError(req, res, err);
        res.send(obj);
    });
});

ponyRouter.delete('/:sessionId', function (req, res) {
    Pony.remove({_id: req.body._id}, function (err) {
        if (err)
            error.databaseError(req, res, err);

        res.send({
            msg: "Successfully deleted record"
        });
    });
});

ponyRouter.post('/:sessionId', function (req, res) {
    var model = new Pony(req.body);
    model.sessionId = req.params.sessionId;
    model.save(function (err, obj) {
        if (err)
            error.databaseError(req, res, err);

        res.send(obj);
    });
});

module.exports = ponyRouter;