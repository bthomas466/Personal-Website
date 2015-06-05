var router = require("./router.js");
var static = require("node-static");

//Create web server with node
var file = new static.Server();
var http = require('http');
http.createServer(function (request, response) {
    request.addListener('end', function() {
        router.home(request, response);
        router.user(request, response);
    }).resume();
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
