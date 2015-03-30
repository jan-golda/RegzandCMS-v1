// public modules
var express			= require('express');

// private modules
var logger 			= requireLocal('logger').getLogger('[API]'.grey);

// API router
var router = express.Router();

// load all APIs
var APIs = require('require-all')({
	dirname: __dirname,
	filter: /(.+API)\.js$/
});

// register API routes
for(var name in APIs){
	APIs[name].registerRoutes(router);
	logger.dev("Loaded: &{0}&", [name]);
}
logger.dev("Loaded &{0}& api modules", [Object.keys(APIs).length]);

// node.js module exports
module.exports = {};
module.exports.APIs = APIs;
module.exports.router = router;
