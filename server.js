const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const rateLimit = require("express-rate-limit")
const port = process.env.PORT || 9191

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    message:
        "Too many requests in a short amount of time. Please don't hammer our API like this :P",
})

app.use(limiter)
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

async function connect() {
    await mongoose.connect(
        "mongodb://localhost:27017/api"
    )
}

connect().catch(err => console.error(err))

app.use("/:sessionId/todo", require("./routes/todoRoutes"))
app.use("/:sessionId/thing", require("./routes/thingRoutes"))

app.get("/pokemon", (req, res) => {
    return res.sendFile(path.join(__dirname, "static", "pokemon.json"))
})

app.get("/hitlist", (req, res) => {
    return res.sendFile(path.join(__dirname, "static", "hitlist.json"))
})

app.use((err, req, res, next) => {
    console.error(err)
    return res.send({ error: err.message })
})

app.listen(port, function () {
    console.log(`Express server listening on port ${port}`)
})
