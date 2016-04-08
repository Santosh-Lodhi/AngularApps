var express = require('express'),
app = express();

var routes = require('./app/routes/index');

//app.use(express.static(__dirname + ''));
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', routes);

app.listen(8000)

console.log("server is listning on port no. 8000");
