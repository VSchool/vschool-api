function Error(msg, error, statusCode) {
    this.msg = msg;
    this.error = error;
    this.statusCode = statusCode;
}

function databaseError (req, res, err) {
    const error = new Error("Error", err, 400);
    res.status(400).send(error);
}

function noRecord (req, res, dataType) {
    const error = new Error("Could not find: " + dataType, null, 404);
    res.status(404).send(error);
}

module.exports = {
    databaseError,
    noRecord
};