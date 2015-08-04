var Error = function(msg, error, statusCode) {
	this.msg = msg;
	this.error = error;
	this.statusCode = statusCode;
};

exports.databaseError = function(req, res, err) {
		var error = new Error("Database error", err, null);
		res.send(error);
};

exports.noRecord = function(req, res, dataType) {
		var error = new Error("Could not find: " + dataType, null, null);
		res.send(error);
}
