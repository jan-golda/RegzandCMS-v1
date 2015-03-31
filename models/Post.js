// private modules
var database	            = requireLocal('database');
var lastModifiedPlugin      = requireLocal('database/plugins/lastModified');

// Post model
var Post = database.Schema({
    id:             {type: String, required: true, unique: true, trim: true, lowercase: true},
    title:          {type: String, required: true, trim: true},
    author:         {type: database.Schema.Types.ObjectId, ref: "Users"},
    created:        {type: Date, default: Date.now},
    content:        {type: String}
});

// attach plugins
Post.plugin(lastModifiedPlugin);

// exports
module.exports = database.model('Post', Post);