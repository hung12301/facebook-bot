var http = require("http");
var app = require("./app.js");

var server = http.createServer(app);
var serverPORT = process.env.OPENSHIFT_NODEJS_PORT;
var serverIP = process.env.OPENSHIFT_NODEJS_IP;

server.listen( serverPORT, serverIP , function () {
	console.log("Connected with " + serverIP + ' and PORT is ' +  serverPORT);
});