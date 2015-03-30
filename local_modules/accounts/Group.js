// private modules
var database	             = requireLocal('database');
var requiredPlugin          = requireLocal('database/plugins/required');
var uniquePlugin            = requireLocal('database/plugins/unique');
var lastModifiedPlugin      = requireLocal('database/plugins/lastModified');


// Group model
var Group = database.Schema({
	name:           {type: String, required: true, unique: true},
	weight:         {type: Number, default: 0},
	permissions:    [String]
});

// attach plugins
Group.plugin(requiredPlugin);
Group.plugin(uniquePlugin);
Group.plugin(lastModifiedPlugin);

// exports
module.exports = database.model('Group', Group);