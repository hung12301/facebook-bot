var http = require("http");
var app = require("./app.js");

var server = http.createServer(app);
var serverPORT = process.env.PORT;
var serverIP = process.env.IP;

server.listen( serverPORT, serverIP , function () {
	console.log("Connected with " + serverIP + ' and PORT is ' +  serverPORT);
});