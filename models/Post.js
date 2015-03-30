// private modules
var database	             = requireLocal('database');
var requiredPlugin          = requireLocal('database/plugins/required');
var uniquePlugin            = requireLocal('database/plugins/unique');
var lastModifiedPlugin      = requireLocal('database/plugins/lastModified');

// Post model
var Post = database.Schema({
    id:             {type: String, required: true, unique: true},
    title:          {type: String, required: true},
    author:         {type: database.Schema.Types.ObjectId, ref: "Users"},
    created:        {type: Date, default: Date.now},
    content:        {type: String}
});

// attach plugins
Post.plugin(requiredPlugin);
Post.plugin(uniquePlugin);
Post.plugin(lastModifiedPlugin);

// exports
module.exports = database.model('Post', Post);