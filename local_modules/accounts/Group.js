// private modules
var database	             = requireLocal('database');
var validator               = requireLocal('database/plugins/validator');
var lastModifiedPlugin       = requireLocal('database/plugins/lastModified');
var utils	                 = requireLocal('utils');


// Group model
var Group = database.Schema({
	name:           {type: String, trim: true, validator: ['required','unique']},
	weight:         {type: Number, default: 0},
	permissions:    [{type: String, trim: true, lowercase: true}]
});

// attach plugins
Group.plugin(validator.plugin);
Group.plugin(lastModifiedPlugin);

// methods
Group.methods.getPermissions = function getPermissions(){
    var out = {};
    this.permissions.forEach(function(e){
        if(utils.startsWith(e, "-")){
            out[e.substr(1)] = false;
        }else{
            out[e] = true;
        }
    });
    return out;
};

// exports
module.exports = database.model('Group', Group);