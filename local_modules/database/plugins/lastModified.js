module.exports = function lastModifiedPlugin(schema, options){

    // add field
    schema.add({ lastModified: Date });

    // add listener
    schema.pre('save', function (next) {
        this.lastModified = new Date();
        next();
    })

};