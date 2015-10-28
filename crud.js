var error = require('./error');

module.exports = function (Model, populatePath) {

    this.get = function (req, res) {

        if (populatePath) {
            Model.find({}).populate(populatePath).exec(function (err, obj) {
                if (err)
                    error.databaseError(req, res, err);

                res.send(obj);
            });
        } else {
            Model.find({}, function (err, objs) {
                if (err)
                    error.databaseError(req, res);

                res.send(objs);
            });
        }
    };

    this.getOne = function (req, res) {
        var query = {
            _id: req.params.id
        };

        if (populatePath) {
            Model.find(query).populate(populatePath).exec(function (err, obj) {
                if (err)
                    error.databaseError(req, res, err);

                res.send(obj);
            });
        } else {
            Model.find(query, function (err, obj) {
                if (err)
                    error.databaseError(req, res, err);

                res.send(obj);
            });
        }
    };

    this.put = function (req, res) {

        Model.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, new: true}, function (err, obj) {

            if (err)
                error.databaseError(req, res, err);
            res.send(obj);
        });
    };

    this.post = function (req, res) {
        var model = new Model(req.body);

        model.save(function (err, obj) {
            if (err) {
                error.databaseError(req, res, err);
            }

            res.send(obj);
        });
    };

    this.delete = function (req, res) {
        Model.findOneAndRemove({
            _id: req.params.id
        }, function (err) {
            if (err)
                error.databaseError(req, res, err);

            res.send({
                msg: "Successfully deleted record"
            });
        });
    };
};
