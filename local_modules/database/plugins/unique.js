module.exports = function uniquePlugin(schema, options){

    schema.pre('save', function(next){
        for(var e in schema.tree){
            if(!schema.tree.hasOwnProperty(e))
                continue;
            if(!schema.tree[e].unique)
                continue;

            var model = this.model(this.constructor.modelName);
            var query = {};
                query[e] = this[e];

            model.count(query, function(dbError, count){
                if(dbError)
                    return next(dbError);

                if(count==0)
                    return next();

                var error = new Error("Field "+e+" is has to be unique");
                    error.plugin = "unique";
                    error.field = e;
                    error.value = this[e];
                return next(error);
            });
        }
    });

};