// public modules
var express 		= require('express');
var session 		= require('express-session');

// private modules
var accounts		= requireLocal("accounts");
var config			= requireLocal("config").config;

// create express server
var server = express();

// register logger for express server
server.use(requireLocal('logger').getExpress("[HTTP] [Admin]".grey));

// session
server.use(session({secret: config.sessionSecret, resave: false, saveUninitialized: true}));

// accounts system
accounts.addMiddleware(server);

// routes
require('./routes')(server);

// node.js module export
module.exports = {};
module.exports.server = server;
