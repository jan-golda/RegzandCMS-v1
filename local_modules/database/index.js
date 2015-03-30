// public modules
var mongoose	= require('mongoose');

// private modules
var config		= requireLocal('config').config;
var logger		= requireLocal('logger').getLogger('[database]'.grey);

// adding callbacks
mongoose.connection.on('error', function(err){
	logger.error("An error occured during connecting to MongoDB", null, config.database);
	logger.error("Shutting down due to database problems");
	process.exit();
});
mongoose.connection.once('open', function(){
	logger.info("Successfully connected to MongoDB", null, config.database);
});

// if authorization is required
if(config.database.user)
    var options = {user: config.database.user, password: config.database.password};

// connecting
mongoose.connect("mongodb://"+config.database.url+"/"+config.database.db, options);

// exports
module.exports = mongoose;