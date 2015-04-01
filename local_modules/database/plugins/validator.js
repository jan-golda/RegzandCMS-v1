// public modules
var valid   = require('../node_modules/validator');

// exports
module.exports = {};

// mongoose plugin
module.exports.plugin = function(schema, options){
    schema.eachPath(function(path, schemaType){
        if(!schemaType.options || !schemaType.options.validator) return;

        schemaType.options.validator.forEach(function(type){
            switch(type.toLowerCase()){
                case "required":
                    required(schemaType);
                    break;
                case "unique":
                    unique(schemaType);
                    break;
                case "email":
                    email(schemaType);
                    break;
                case "url":
                    url(schemaType);
                    break;
                case "ip":
                    ip(schemaType);
                    break;
                case "hexcolor":
                    hexColor(schemaType);
                    break;
                case "int":
                    int(schemaType);
                    break;
                case "float":
                    float(schemaType);
                    break;
            }
        });
    })
};

function required(schemaType){
    schemaType.validate(function(value, respond){
        return respond( !!value );
    }, "required");
}

function unique(schemaType){
    schemaType.validate(function(value, respond){
        if(value===undefined || value===null)
            return respond(true);

        this.model(this.constructor.modelName)
            .count()
            .where(schemaType.path).equals(value)
            .where("_id").ne(this._id)
            .exec(function(err, count){
                if(err)
                    throw err;
                return respond(count==0);
            });
    }, "unique");
}

function email(schemaType){
    schemaType.validate(function(value, respond){
        if(value===undefined || value===null)
            return respond(true);
        return respond( valid.isEmail(value) );
    }, "email");
}

function url(schemaType){
    schemaType.validate(function(value, respond){
        if(value===undefined || value===null)
            return respond(true);
        return respond( valid.isURL(value) );
    }, "url");
}

function ip(schemaType){
    schemaType.validate(function(value, respond){
        if(value===undefined || value===null)
            return respond(true);
        return respond( valid.isIP(value) );
    }, "ip");
}

function hexColor(schemaType){
    schemaType.validate(function(value, respond){
        if(value===undefined || value===null)
            return respond(true);
        return respond( valid.isHexColor(value) );
    }, "hexColor");
}

function int(schemaType){
    schemaType.validate(function(value, respond){
        if(value===undefined || value===null)
            return respond(true);
        return respond( valid.isInt(value) );
    }, "int");
}

function float(schemaType){
    schemaType.validate(function(value, respond){
        if(value===undefined || value===null)
            return respond(true);
        return respond( valid.isFloat(value) );
    }, "float");
}
