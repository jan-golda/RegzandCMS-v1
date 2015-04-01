// rivate modules
var utils   = requireLocal("utils");

// public modules
var valid   = require('../node_modules/validator');
var async   = require('../node_modules/async');

// exports
module.exports = function(schema, options) {
    schema.methods.verify = function(callback){
        var self = this;
        var out = {};

        // forEach path
        async.each(Object.keys(options), function(path, cb1){
            // forEach validator
            async.rejectSeries(options[path], function(item, cb2){
                item = item.toLowerCase();

                if(!validators[item])
                    return cb2(true);

                validators[item](self,path,cb2);
            }, function(results) {
                if (results.length)
                    out[path] = results;
                cb1();
            });
        }, function(err){
            if(utils.isEmpty(out))
                return callback(false);
            callback(out);
        });

    };
};

var validators = {
    "required": function(doc,path,cb){
        cb(!!doc[path]);
    },
    "unique": function(doc,path,cb){
        if(!doc[path])
            return cb(true);
        doc.model(doc.constructor.modelName)
            .count()
            .where(path).equals(doc[path])
            .where("_id").ne(doc._id)
            .exec(function(err, count){
                if(err)
                    throw err;
                return cb(count==0);
            });
    },
    "email": function(doc,path,cb){
        if(!doc[path])
            return cb(true);
        return cb(valid.isEmail(doc[path]));
    },
    "url": function(doc,path,cb){
        if(!doc[path])
            return cb(true);
        return cb(valid.isURL(doc[path]));
    },
    "ip": function(doc,path,cb){
        if(!doc[path])
            return cb(true);
        return cb(valid.isIP(doc[path]));
    },
    "hex-color": function(doc,path,cb){
        if(!doc[path])
            return cb(true);
        return cb(valid.isHexColor(doc[path]));
    },
    "int": function(doc,path,cb){
        if(!doc[path])
            return cb(true);
        if(!valid.isInt(doc[path]))
            return cb(false);
        doc[path] = valid.toInt(doc[path]);
        return cb(true);
    },
    "float": function(doc,path,cb){
        if(!doc[path])
            return cb(true);
        if(!valid.isFloat(doc[path]))
            return cb(false);
        doc[path] = valid.toFloat(doc[path]);
        return cb(true);
    },
    "date": function(doc,path,cb){
        if(!doc[path])
            return cb(true);
        if(!valid.isDate(doc[path]))
            return cb(false);
        doc[path] = valid.toDate(doc[path]);
        return cb(true);
    }
};
