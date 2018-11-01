const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 9191;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    if (req.headers.origin) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        if (req.method === "OPTIONS") return res.send(200);
    }
    next();
});

mongoose.connect("mongodb://localhost:27017/api",
    { useNewUrlParser: true },
    (err) => {
        if (err) throw err;
        console.log("Connected to MongoDB database");
    }
);

app.use("/:sessionId/todo", require("./routes/todoRoutes"));

app.use((err, req, res, next) => {
    console.error(err);
    return res.send({error: err.message})
});

app.listen(port, function () {
    console.log(`Express server listening on port ${port}`);
});
