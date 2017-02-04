function Error(msg, error, statusCode) {
    this.msg = msg;
    this.error = error;
    this.statusCode = statusCode;
}

function databaseError (req, res, err) {
    var error = new Error("Error", err, null);
    res.status(400).send(error);
}

function noRecord (req, res, dataType) {
    var error = new Error("Could not find: " + dataType, null, null);
    res.status(404).send(error);
}

module.exports = {
    databaseError: databaseError,
    noRecord: noRecord
};