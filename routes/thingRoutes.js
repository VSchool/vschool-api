const thingRouter = require("express").Router({ mergeParams: true });
const Thing = require("../model").Thing;

// GET /:sessionId/thing
thingRouter.get("/", (req, res, next) => {
  Thing.find({ sessionId: req.params.sessionId })
    .then((docs) => res.send(docs))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// POST /:sessionId/thing
thingRouter.post("/", (req, res, next) => {
  const model = new Thing(req.body);
  model.sessionId = req.params.sessionId;
  model
    .save()
    .then((doc) => res.send(doc))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// GET /:sessionId/thing/:thingId
thingRouter.get("/:thingId", (req, res, next) => {
  Thing.findOne({ sessionId: req.params.sessionId, _id: req.params.thingId })
    .then((docs) => res.send(docs))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// PUT /:sessionId/thing/:thingId
thingRouter.put("/:thingId", (req, res, next) => {
  Thing.findOneAndUpdate(
    { sessionId: req.params.sessionId, _id: req.params.thingId },
    req.body,
    { upsert: true, new: true }
  )
    .then((doc) => res.send(doc))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

// DELETE /:sessionId/thing/:thingId
thingRouter.delete("/:thingId", (req, res, next) => {
  Thing.deleteOne({ sessionId: req.params.sessionId, _id: req.params.thingId })
    .then((doc) => res.send({ msg: "Successfully deleted record" }))
    .catch((err) => {
      res.status(500);
      return next(err);
    });
});

module.exports = thingRouter;
