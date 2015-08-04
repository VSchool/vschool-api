var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var database = mongoose.connect('mongodb://localhost/meanserver');
var routes = require('./routes');

var app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('<h1>Page Not Found</h1><p>' + err + '</p>');
});

app.set('port', 9191);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});