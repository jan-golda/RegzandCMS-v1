// import node.js modules
var path 			        = require('path');

// defining global paths
GLOBAL.CMS_ROOT		        = __dirname;
GLOBAL.CMS_LOCAL_MODULES 	= path.join(CMS_ROOT, 'local_modules');
GLOBAL.CMS_PAGE 	        = path.join(CMS_ROOT, 'page');
GLOBAL.CMS_ADMIN 	        = path.join(CMS_ROOT, 'admin');
GLOBAL.CMS_MODELS 	        = path.join(CMS_ROOT, 'models');

// defining function to require local modules
GLOBAL.requireLocal = function (name){
    return require(path.join(CMS_LOCAL_MODULES, name));
};

// import local modules
var config 			        = requireLocal('config').config;
var logger			        = requireLocal('logger').getLogger('[main]'.grey);

// import public modules
var express			        = require('express');
var bodyParser		        = require('body-parser');
var cookieParser	        = require('cookie-parser');

// create express server
var server = express();

// protocols
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// prepare sections
var page 			        = require(CMS_PAGE);
var admin 			        = require(CMS_ADMIN);

// redirect to page or admin section
server.use(function(req, res, next){
    // check if requested host starts with adminSubdomain
    if(req.subdomains[0] && req.subdomains[req.subdomains.length-1].toLowerCase() === config.adminSubomain.toLowerCase()){
        // adminSubdomain -> redirect to admin section
        admin.server(req, res, next);
    }else{
        // page -> redirect to page section
        page.server(req, res, next);
    }
});

// starting server
server.listen(config.port);
logger.info("Server is listening on port &{0}&", [config.port]);