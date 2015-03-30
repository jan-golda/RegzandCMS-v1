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