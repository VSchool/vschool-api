var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = mongoose.connect('mongodb://localhost/meanserver');

var cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        if (req.method === 'OPTIONS') return res.send(200);
    }
    next();
});

app.use('/:sessionId/todo', require('./routes/todoRoutes'));
app.use('/:sessionId/pony', require('./routes/ponyRoutes'));

app.use(function (req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('<h1>Page Not Found</h1><p>' + err + '</p>');
});

var port = process.env.PORT || 9191;
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});