const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const limiter = require("./rateLimiter");
const port = process.env.PORT || 9191;

app.enable("trust proxy");

app.use(limiter);
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    if (req.headers.origin) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        if (req.method === "OPTIONS") return res.send(200);
    }
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/api", {useMongoClient: true}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB database");
});


app.use("/:sessionId/todo", require("./routes/todoRoutes"));
app.use("/:sessionId/pony", require("./routes/ponyRoutes"));

app.use((req, res) => {
    const err = new Error("Not Found");
    err.status = 404;
    res.send("<h1>Page Not Found</h1><p>" + err + "</p>");
});

app.listen(port, function() {
    console.log(`Express server listening on port ${port}`);
});
