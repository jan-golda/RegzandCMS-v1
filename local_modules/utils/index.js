// exports
module.exports = {};

// starts with
module.exports.startsWith = function startsWith(string, begining) {
	string = ""+string;
	begining = ""+begining;
	return string.substring(0, begining.length) === begining;	
};

// ends with
module.exports.endsWith = function endsWith(string, ending) {
	string = ""+string;
	ending = ""+ending;
	return string.substring(string.length-ending.length, string.length) === ending;
};

// absorb object
module.exports.absorb = function absorb(to, from){
	Object.getOwnPropertyNames(from).forEach(function(e){
		to[e] = from[e];
	});

	return to;
};

// check if date is valid
module.exports.isDateValid = function isDateValid(date){
	return (date instanceof Date) && !isNaN(date.getTime());
};

// is empty
module.exports.isEmpty = function isEmpty(obj){

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for(var key in obj){
        if(Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}