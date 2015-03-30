// public modules
var passport 		= require('passport');
var LocalStrategy 	= require('passport-local');

// private modules
var logger 			= requireLocal('logger').getLogger('[accounts]'.grey);
var database		= requireLocal('database');

// exports
module.exports = {};
module.exports.passport = passport;

// user and group models
var Group	= require('./Group');
var User	= require('./User');

// connecting passport.js to User model
passport.serializeUser(User.serialize);
passport.deserializeUser(User.deserialize);

// local login strategy <=> username/password system
passport.use("local", new LocalStrategy(function(username, password, done){
    User.findOne({username: username})
        .populate({path: "groups", options: {sort: "weight"}})
        .exec(function(err, user) {
            // throw database errors
            if (err)
                return done(err);
            // check if user is correct
            if (!user){
                logger.warn("Someone tried to login with incorrect username: &{0}&", [username]);
                return done(null, false);
            }
            // check if password is valid
            if (!user.validPassword(password)){
                logger.warn("User &{0}& tried to login with incorrect password", [username]);
                return done(null, false);
            }
            logger.info("User &{0}& has login", [username]);
            return done(null, user);
        });
}));

// adding passport middleware
module.exports.addMiddleware = function addMiddleware(app){
	app.use(passport.initialize());
	app.use(passport.session());
};

// chceck if request comes form logged in user
module.exports.checkUser = function checkUser(req, res, next){
	// if logged in => continue
	if(req.user)
		return next();

	// set response code to 403 - Forbidden
	return res.sendStatus(403).end();
};

// login request
module.exports.logInRoute = function logInRoute(req, res, next){
	passport.authenticate('local')(req, res, function(){
		res.status(200).send("Logged in").end();
	});
};

// logout request
module.exports.logOutRoute = function logOutRoute(req, res, next){
	if(req.user)logger.info("User &{0}& has logout", [req.user.username]);
	req.logout();
	res.status(200).send("Logged out").end();
};
