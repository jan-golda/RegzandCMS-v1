module.exports = function requiredPlugin(schema, options){

    schema.pre('save', function(next){
        for(var e in schema.tree){
            if(!schema.tree.hasOwnProperty(e))
                continue;
            if(!schema.tree[e].required)
                continue;
            if(this[e] !== undefined && this[e] !== null)
                continue;

            var error = new Error("Field "+e+" is required");
                error.plugin = "required";
                error.field = e;
            return next(error);
        }
        next();
    });

};