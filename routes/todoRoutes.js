const todoRouter = require("express").Router({ mergeParams: true });
const Todo = require("../model").Todo;

// GET /:sessionId/todo
todoRouter.get("/", (req, res, next) => {
  Todo.find({ sessionId: req.params.sessionId })
    .then((docs) => res.send(docs))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// POST /:sessionId/todo
todoRouter.post("/", (req, res, next) => {
  const model = new Todo(req.body);
  model.sessionId = req.params.sessionId;
  model
    .save()
    .then((doc) => res.send(doc))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// GET /:sessionId/todo/:todoId
todoRouter.get("/:todoId", (req, res, next) => {
  Todo.findOne({ sessionId: req.params.sessionId, _id: req.params.todoId })
    .then((docs) => res.send(docs))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// PUT /:sessionId/todo/:todoId
todoRouter.put("/:todoId", (req, res, next) => {
  Todo.findOneAndUpdate(
    { sessionId: req.params.sessionId, _id: req.params.todoId },
    req.body,
    { upsert: true, new: true }
  )
    .then((doc) => res.send(doc))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// DELETE /:sessionId/todo/:todoId
todoRouter.delete("/:todoId", (req, res, next) => {
  Todo.deleteOne({ sessionId: req.params.sessionId, _id: req.params.todoId })
    .then((doc) => res.send({ msg: "Successfully deleted record" }))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

module.exports = todoRouter;
