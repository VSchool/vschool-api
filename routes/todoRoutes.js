const todoRouter = require('express').Router({mergeParams: true});
const Todo = require('../model').Todo;
const error = require('../error');

// /:sessionId/todo
todoRouter.get('/', (req, res) => {
    Todo.find({sessionId: req.params.sessionId}, (err, objs) => {
        if (err) return error.databaseError(req, res);
        return res.send(objs);
    });
})
todoRouter.post('/', (req, res) => {
    const model = new Todo(req.body);
    model.sessionId = req.params.sessionId;
    model.save((err, obj) => {
        if (err) return error.databaseError(req, res, err);
        return res.send(obj);
    });
});


// /:sessionId/todo/:todoId
todoRouter.get('/:todoId', (req, res) => {
    Todo.findOne({sessionId: req.params.sessionId, _id: req.params.todoId}, (err, objs) => {
        if (err) return error.databaseError(req, res);
        return res.send(objs);
    });
});
todoRouter.put('/:todoId', (req, res) => {
    Todo.findOneAndUpdate(
        {sessionId: req.params.sessionId, _id: req.params.todoId},
        req.body,
        {upsert: true, new: true },
        (err, obj) => {
            if (err) return error.databaseError(req, res, err);
            return res.send(obj);
        }
    );
})
todoRouter.delete('/:todoId', (req, res) => {
    Todo.remove({sessionId: req.params.sessionId, _id: req.params.todoId}, (err) => {
        if (err) return error.databaseError(req, res, err);
        return res.send({msg: "Successfully deleted record"});
    });
});

module.exports = todoRouter;