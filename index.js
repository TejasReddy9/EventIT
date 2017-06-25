var express = require('express');
var controlEvents = require(__dirname + '/public/js/controlEvents.js');

// var router = express.Router();
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

port = 8080;
app.listen(port);
console.log('Listening to port ' + port + ' ...');

controlEvents(app);

