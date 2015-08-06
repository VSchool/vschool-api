var router = require('express').Router();
var error = require('./error');
var Todo = require('./model').Todo;
var Pony = require('./model').Pony;

router.get('/todo/:sessionId', function (req, res) {
    Todo.find({
        sessionId: req.params.sessionId
    }, function (err, objs) {
        if (err)
            error.databaseError(req, res);

        res.send(objs);
    });
});

router.put('/todo/:sessionId', function (req, res) {
    Todo.findOneAndUpdate({
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

router.delete('/todo/:sessionId', function (req, res) {
    Todo.remove({_id: req.body._id}, function (err) {
        if (err)
            error.databaseError(req, res, err);

        res.send({
            msg: "Successfully deleted record"
        });
    });
});

router.post('/todo/:sessionId', function (req, res) {
    var model = new Todo(req.body);
    model.sessionId = req.params.sessionId;
    model.save(function (err, obj) {
        if (err)
            error.databaseError(req, res, err);

        res.send(obj);
    });
});

router.get('/pony/:sessionId', function (req, res) {
    Pony.find({
        sessionId: req.params.sessionId
    }, function (err, objs) {
        if (err)
            error.databaseError(req, res);

        res.send(objs);
    });
});

router.put('/pony/:sessionId', function (req, res) {
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

router.delete('/pony/:sessionId', function (req, res) {
    Pony.remove({_id: req.body._id}, function (err) {
        if (err)
            error.databaseError(req, res, err);

        res.send({
            msg: "Successfully deleted record"
        });
    });
});

router.post('/pony/:sessionId', function (req, res) {
    var model = new Pony(req.body);
    model.sessionId = req.params.sessionId;
    model.save(function (err, obj) {
        if (err)
            error.databaseError(req, res, err);

        res.send(obj);
    });
});

module.exports = router;