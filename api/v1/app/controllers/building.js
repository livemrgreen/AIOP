var orm = require("../../config/models");

/*
 * GET /buildings/
 */
module.exports.list = function (req, res, next) {
    var building = orm.model("building");

    building.findAll({"where": {"deleted_at": null}}).success(function (buildings) {
        res.send(200, {"buildings": buildings});
    });

    return next();
};

/*
 * POST /buildings/
 */
module.exports.create = function (req, res, next) {
    var building = orm.model("building");

    if (req.body && req.body.building) {
        var b = req.body.building;
        if (b.label) {
            building.create(b)
                .success(function (building) {
                    res.send(201, {"building": building});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Building found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Building not found in body"});
    }

    return next();
};

/*
 * GET /buildings/:id
 */
module.exports.show = function (req, res, next) {
    var building = orm.model("building");

    building.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (building) {
        if (!building) {
            res.send(404, {"message": "Building not found"});
        }
        else {
            res.send(200, {"building": building});
        }
    });

    return next();
};

/*
 * PUT /buildings/:id
 */
module.exports.update = function (req, res, next) {
    var building = orm.model("building");

    if (req.body && req.body.building) {
        var b = req.body.building;
        if (b.label) {
            building.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (building) {
                if (!building) {
                    res.send(404, {"message": "Building not found"});
                }
                else {
                    building.label = b.label;

                    building.save()
                        .success(function (building) {
                            res.send(200, {"building": building});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Building found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Building not found in body"});
    }

    return next();
};

/*
 * DELETE /buildings/:id
 */
module.exports.delete = function (req, res, next) {
    var building = orm.model("building");

    building.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (building) {
        if (!building) {
            res.send(404, {"message": "Building not found"});
        }
        else {
            building.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};