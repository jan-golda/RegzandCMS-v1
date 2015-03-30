// private modules
var accounts		= requireLocal('accounts');

module.exports = function(server){

    // accounts routes
    server.post('/login', accounts.logInRoute);
    server.post('/logout', accounts.logOutRoute);

    // from now it's restricted area => chceck if request comes form logged in user
    server.all('*', accounts.checkUser);

    // RESTfull API routes
    server.use('/api', require('./api/').router);

    // error 404
    server.all('*', function(req, res, next){
        res.sendStatus(404).end();
    });

};