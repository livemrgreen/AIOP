var orm = require("../../config/models");

/*
 * GET /caracteristics/
 */
module.exports.list = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");

    caracteristic.findAll({}).success(function (caracteristics) {
        res.send(200, {"caracteristics": caracteristics});
    });

    return next();
};

/*
 * POST /caracteristics/
 */
module.exports.create = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");

    if (req.body && req.body.caracteristic) {
        var c = req.body.caracteristic;
        if (c.label) {
            caracteristic.create(c)
                .success(function (caracteristic) {
                    res.send(201, {"caracteristic": caracteristic});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Caracteristic found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Caracteristic not found in body"});
    }

    return next();
};

/*
 * GET /caracteristics/:id
 */
module.exports.show = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");

    caracteristic.find({"where": {"id": req.params.id}}).success(function (caracteristic) {
        if (!caracteristic) {
            res.send(404, {"message": "Caracteristic not found"});
        }
        else {
            res.send(200, {"caracteristic": caracteristic});
        }
    });

    return next();
};

/*
 * PUT /caracteristics/:id
 */
module.exports.update = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");

    if (req.body && req.body.caracteristic) {
        var c = req.body.caracteristic;
        if (c.label) {
            caracteristic.find({"where": {"id": req.params.id}}).success(function (caracteristic) {
                if (!caracteristic) {
                    res.send(404, {"message": "Caracteristic not found"});
                }
                else {
                    caracteristic.label = c.label;

                    caracteristic.save()
                        .success(function (caracteristic) {
                            res.send(200, {"caracteristic": caracteristic});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Caracteristic found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Caracteristic not found in body"});
    }

    return next();
};

/*
 * DELETE /caracteristics/:id
 */
module.exports.delete = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");

    caracteristic.find({"where": {"id": req.params.id}}).success(function (caracteristic) {
        if (!caracteristic) {
            res.send(404, {"message": "Caracteristic not found"});
        }
        else {
            caracteristic.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};