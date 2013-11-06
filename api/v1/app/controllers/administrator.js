var orm = require("../../config/models");

/*
 * GET /administrators/
 */
module.exports.list = function (req, res, next) {
    var administrator = orm.model("administrator");

    administrator.findAll({"where": {"deleted_at": null}}).success(function (administrators) {
        res.send(200, {"administrators": administrators});
    });

    return next();
};

/*
 * POST /administrators/
 */
module.exports.create = function (req, res, next) {
    var administrator = orm.model("administrator");

    if (req.body && req.body.administrator) {
        var a = req.body.administrator;
        if (a.teacher_id) {
            administrator.create(a)
                .success(function (administrator) {
                    res.send(201, {"administrator": administrator});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Administrator found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Administrator not found in body"});
    }

    return next();
};

/*
 * GET /administrators/:id
 */
module.exports.show = function (req, res, next) {
    var administrator = orm.model("administrator");

    administrator.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (administrator) {
        if (!administrator) {
            res.send(404, {"message": "Administrator not found"});
        }
        else {
            res.send(200, {"administrator": administrator});
        }
    });

    return next();
};

/*
 * PUT /administrators/:id
 */
module.exports.update = function (req, res, next) {
    var administrator = orm.model("administrator");

    if (req.body && req.body.administrator) {
        var a = req.body.administrator;
        if (a.teacher_id) {
            administrator.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (administrator) {
                if (!administrator) {
                    res.send(404, {"message": "Administrator not found"});
                }
                else {
                    administrator.teacher_id = a.teacher_id;

                    administrator.save()
                        .success(function (administrator) {
                            res.send(200, {"administrator": administrator});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Administrator found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Administrator not found in body"});
    }

    return next();
};

/*
 * DELETE /administrators/:id
 */
module.exports.delete = function (req, res, next) {
    var administrator = orm.model("administrator");

    administrator.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (administrator) {
        if (!administrator) {
            res.send(404, {"message": "Administrator not found"});
        }
        else {
            administrator.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};