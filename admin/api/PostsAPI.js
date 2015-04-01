// private modules
var Post        = require(CMS_MODELS+"/Post");
var utils       = requireLocal("utils");

// exports
module.exports = {};

// registering routes
module.exports.registerRoutes = function registerRoutes(router) {

    router.route('/posts')

        // get all posts
        .get(function(req,res){
            Post.find()
                .select("-_id")
                .populate({
                    path: "author",
                    select: "-_id username email displayname avatar"
                })
                .exec(function(err, posts){
                    if(err)
                        throw err;

                    res.json(posts).end();
                });
        })

        // create post
        .post(function(req,res){
            var post = new Post();

            // set properties
            post.id = req.body.id;
            post.title = req.body.title;
            post.author = req.user._id; // TODO: author from request
            post.content = req.body.content;
            post.created = req.body.created;

            post.verify(function(result){
                if(result)
                    return res.status(400).json(result).end();

                post.save(function(err){
                    if(err)
                        throw err;

                    return res.sendStatus(201).end();
                });
            });
        });

};