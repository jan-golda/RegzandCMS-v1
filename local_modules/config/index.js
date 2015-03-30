// node.js modules
var fs 		= require('fs');
var path	= require('path');

// config class
var Config = function Config(){
	var config = this;

	// config object - store all configuration
	config.config = {};

	// json file
	config.file = path.join(__dirname, 'config.json');

	// loading data form json file
	config.loadConfig = function loadConfig(callback) {
		fs.readFile(config.file, function(err, data){
			if(err) return callback(err);
			config.config = JSON.parse(data);
			callback(null, config.config);
		});
	};

	// loading data from json file (sync)
	config.loadConfigSync = function loadConfigSync() {
		config.config = JSON.parse(fs.readFileSync(config.file));
	};

	// saving config to json file
	config.saveConfig = function saveConfig(callback) {
		fs.writeFile(config.file, JSON.stringify(config.config, null, 4), callback);
	};

	// saving config to json file (sync)
	config.saveConfigSync = function saveConfigSync() {
		fs.writeFileSync(config.file, JSON.stringify(config.config, null, 4));
	};

	// create file if not exists
	if(!fs.existsSync(config.file))
		config.saveConfigSync();

	// initial loading
	config.loadConfigSync();
};

// node.js module export
module.exports = new Config();
