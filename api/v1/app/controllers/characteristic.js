var orm = require("../../config/models");

/*
 * GET /characteristics/
 */
module.exports.list = function (req, res, next) {
    var characteristic = orm.model("characteristic");

    characteristic.findAll({}).success(function (characteristics) {
        res.send(200, {"characteristics": characteristics});
    });

    return next();
};

/*
 * POST /characteristics/
 */
module.exports.create = function (req, res, next) {
    var characteristic = orm.model("characteristic");

    if (req.body && req.body.characteristic) {
        var c = req.body.characteristic;
        if (c.label) {
            characteristic.create(c)
                .success(function (characteristic) {
                    res.send(201, {"characteristic": characteristic});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Characteristic found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Characteristic not found in body"});
    }

    return next();
};

/*
 * GET /characteristics/:id
 */
module.exports.show = function (req, res, next) {
    var characteristic = orm.model("characteristic");

    characteristic.find({"where": {"id": req.params.id}}).success(function (characteristic) {
        if (!characteristic) {
            res.send(404, {"message": "Characteristic not found"});
        }
        else {
            res.send(200, {"characteristic": characteristic});
        }
    });

    return next();
};

/*
 * PUT /characteristics/:id
 */
module.exports.update = function (req, res, next) {
    var characteristic = orm.model("characteristic");

    if (req.body && req.body.characteristic) {
        var c = req.body.characteristic;
        if (c.label) {
            characteristic.find({"where": {"id": req.params.id}}).success(function (characteristic) {
                if (!characteristic) {
                    res.send(404, {"message": "Characteristic not found"});
                }
                else {
                    characteristic.label = c.label;

                    characteristic.save()
                        .success(function (characteristic) {
                            res.send(200, {"characteristic": characteristic});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Characteristic found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Characteristic not found in body"});
    }

    return next();
};

/*
 * DELETE /characteristics/:id
 */
module.exports.delete = function (req, res, next) {
    var characteristic = orm.model("characteristic");

    characteristic.find({"where": {"id": req.params.id}}).success(function (characteristic) {
        if (!characteristic) {
            res.send(404, {"message": "Characteristic not found"});
        }
        else {
            characteristic.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};