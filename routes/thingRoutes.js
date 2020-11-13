const thingRouter = require("express").Router({ mergeParams: true })
const Thing = require("../model").Thing

// /:sessionId/thing
thingRouter.get("/", (req, res, next) => {
    Thing.find({ sessionId: req.params.sessionId }, (err, objs) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.send(objs)
    })
})
thingRouter.post("/", (req, res, next) => {
    const model = new Thing(req.body)
    model.sessionId = req.params.sessionId
    model.save((err, obj) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.send(obj)
    })
})

// /:sessionId/thing/:thingId
thingRouter.get("/:thingId", (req, res, next) => {
    Thing.findOne(
        { sessionId: req.params.sessionId, _id: req.params.thingId },
        (err, objs) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(objs)
        }
    )
})

thingRouter.put("/:thingId", (req, res, next) => {
    Thing.findOneAndUpdate(
        { sessionId: req.params.sessionId, _id: req.params.thingId },
        req.body,
        { upsert: true, new: true },
        (err, obj) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send(obj)
        }
    )
})
thingRouter.delete("/:thingId", (req, res, next) => {
    Thing.remove(
        { sessionId: req.params.sessionId, _id: req.params.thingId },
        err => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.send({ msg: "Successfully deleted record" })
        }
    )
})

module.exports = thingRouter
