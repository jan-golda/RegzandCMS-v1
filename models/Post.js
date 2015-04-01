// private modules
var database	            = requireLocal('database');
var validator               = requireLocal('database/plugins/validator');
var lastModifiedPlugin      = requireLocal('database/plugins/lastModified');

// Post model
var Post = database.Schema({
    id:             {type: String, trim: true, lowercase: true, validator: ['required','unique']},
    title:          {type: String, trim: true, validator: ['required']},
    author:         {type: database.Schema.Types.ObjectId, ref: "User"},
    created:        {type: Date, default: Date.now},
    content:        {type: String}
});

// attach plugins
Post.plugin(validator.plugin);
Post.plugin(lastModifiedPlugin);

// exports
module.exports = database.model('Post', Post);