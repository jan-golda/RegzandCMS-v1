// private modules
var database	             = requireLocal('database');
var lastModifiedPlugin      = requireLocal('database/plugins/lastModified');


// Group model
var Group = database.Schema({
	name:           {type: String, required: true, unique: true},
	weight:         {type: Number, default: 0},
	permissions:    [String]
});

// attach plugins
Group.plugin(lastModifiedPlugin);

// exports
module.exports = database.model('Group', Group);