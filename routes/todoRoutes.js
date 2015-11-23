var todoRouter = require('express').Router({mergeParams: true});
var Todo = require('../model').Todo;
var error = require('../error');

// /:sessionId/todo
todoRouter.get('/', function (req, res) {
        Todo.find({
            sessionId: req.params.sessionId
        }, function (err, objs) {
            if (err)
                error.databaseError(req, res);

            res.send(objs);
        });
    })
    .post('/', function (req, res) {
        var model = new Todo(req.body);
        model.sessionId = req.params.sessionId;
        model.save(function (err, obj) {
            if (err)
                error.databaseError(req, res, err);

            res.send(obj);
        });
    });


// /:sessionId/todo/:todoId
todoRouter.get('/:todoId', function (req, res) {
        Todo.findOne(
            {sessionId: req.params.sessionId, _id: req.params.todoId}, function (err, objs) {
                if (err)
                    error.databaseError(req, res);

                res.send(objs);
            });
    })
    .put('/:todoId', function (req, res) {
        Todo.findOneAndUpdate(
            {sessionId: req.params.sessionId, _id: req.params.todoId},
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
    .delete('/:todoId', function (req, res) {
        Todo.remove({sessionId: req.params.sessionId, _id: req.params.todoId}, function (err) {
            if (err)
                error.databaseError(req, res, err);

            res.send({
                msg: "Successfully deleted record"
            });
        });
    });

module.exports = todoRouter;