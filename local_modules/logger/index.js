// node.js modules
var path 	= require('path');

// private modules
var config 	= requireLocal('config').config;

// get logging module
var rLogger = require("rlogger")({
	file: path.join(__dirname, 'logger.log'),
	level: config.loggingLevel
});

// exports
module.exports.getLogger	= rLogger.getLogger;
module.exports.getExpress	= rLogger.getExpress;
module.exports.setLevel		= rLogger.setLevel;