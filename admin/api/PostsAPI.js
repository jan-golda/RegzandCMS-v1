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
            Post.find({}, function(err, posts){
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
            // set date
            var date = new Date(req.body.created);
            if(utils.isDateValid(date))
                post.created = date;

            //save to db
            post.save(function(err){
                // TODO: Add arrors handling
                if(err)
                    return res.json(err).end();

                return res.sendStatus(201).end();
            });
        });

};