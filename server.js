var express = require('express');
var app = express();

var path = __dirname + '/public';
var port = 8080;

// app.use(express.static(path));
app.get('*', function(req, res) {
    res.sendFile('index.html');
});
app.listen(port);