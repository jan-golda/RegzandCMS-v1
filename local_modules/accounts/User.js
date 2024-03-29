// import private modules
var utils		            = requireLocal('utils');
var database	            = requireLocal('database');
var validator               = requireLocal('database/plugins/validator');
var lastModifiedPlugin      = requireLocal('database/plugins/lastModified');

// import public modules
var bcrypt	    = require('bcrypt-nodejs');

// User model
var User = database.Schema({
	username:       {type: String, trim: true, lowercase: true},
	password:       {type: String},
    email:          {type: String, trim: true},

    displayname:    String,
	avatar:         String,

	groups:         [{type: database.Schema.Types.ObjectId, ref: "Group"}],
    permissions:    [{type: String, trim: true, lowercase: true}]
});

// filling automatic values
User.post('init', function(doc){

    if(doc.displayname === undefined || doc.displayname === null)
        doc.displayname = doc.username;

    if(doc.avatar === undefined || doc.avatar === null)
        doc.avatar = 'dafault';
});

// attach plugins
User.plugin(validator, {
    username: ['required','unique'],
    password: ['required'],
    email: ['required','unique']
});
User.plugin(lastModifiedPlugin);

// check user password
User.methods.validPassword = function validPassword(password){
	return bcrypt.compareSync(password, this.password);
};

// get all permissions including groups permissions
User.methods.getAllPermissions = function getAllPermissions(){
    // merging all permissions
    var out = {};
    this.groups.forEach(function(e){
        utils.absorb(out, e.getPermissions());
    });

    // add private permissions
    this.permissions.forEach(function(e){
        if(utils.startsWith(e, "-")){
            out[e.substr(1)] = false;
        }else{
            out[e] = true;
        }
    });

    // returning permissions
    return out;
};

// check if user has permission
User.methods.hasPermission = function hasPermission(query){
	return User.checkPermission(this.getAllPermissions(), query);
};

// serialize - passport.js function
User.statics.serialize = function serialize(user, done){
	done(null, user.id);
};

// deserialize - passport.js function
User.statics.deserialize = function deserialize(id, done){
	database.model('User').findById(id, function(err, user){
		done(err, user);
	});
};

// generate hash
User.statics.getHash = function getHash(text){
    return bcrypt.hashSync(text);
};

// check permissions
User.statics.checkPermission = function checkPermission(permissions, query){
    // keep permissions always in lower case
    query = query.toLowerCase();

    // check if there is a special '*' permission
    if(permissions['*'])
        return true;
    // check if there is exacly quered permission
    if(permissions[query])
        return true;

    // checking subpermissions
    query = query.split(".");
    var perm = "";
    for(var i = 0; i<query.length; i++){
        perm += query[i]+".";
        if(permissions[p+'*'])
            return true;
    }

    // no matches
    return false;
};

// exports
module.exports = database.model('User', User);
