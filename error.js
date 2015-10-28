var Error = function (msg, error, statusCode) {
    this.msg = msg;
    this.error = error;
    this.statusCode = statusCode;
};

function databaseError (req, res, err) {
    var error = new Error("Database error", err, null);
    res.send(error);
}

function noRecord (req, res, dataType) {
    var error = new Error("Could not find: " + dataType, null, null);
    res.send(error);
}

module.exports = {
    databaseError: databaseError,
    noRecord: noRecord
};