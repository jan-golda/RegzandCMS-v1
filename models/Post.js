// private modules
var database	            = requireLocal('database');
var validator               = requireLocal('database/plugins/validator');
var lastModifiedPlugin      = requireLocal('database/plugins/lastModified');

// Post model
var Post = database.Schema({
    id:             {type: String, trim: true, lowercase: true},
    title:          {type: String, trim: true},
    author:         {type: database.Schema.Types.ObjectId, ref: "User"},
    created:        {type: Date, default: Date.now},
    content:        {type: String}
});

// attach plugins
Post.plugin(validator, {
    id: ['required','unique'],
    title: ['required']
});
Post.plugin(lastModifiedPlugin);

// exports
module.exports = database.model('Post', Post);