// public modules
var valid   = require('../node_modules/validator');

// exports
module.exports = {};

// mongoose plugin
module.exports.plugin = function(schema, options){
    schema.eachPath(function(path, schemaType){
        if(!schemaType.options || !schemaType.options.validator) return;

        schemaType.options.validator.forEach(function(type){
            type = type.toLowerCase();

            switch(type){
                case "required":
                    required(schemaType);
                    break;
                case "unique":
                    unique(schemaType);
                    break;
                case "email":
                    email(schemaType);
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
