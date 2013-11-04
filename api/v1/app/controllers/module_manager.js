var orm = require("../../config/models");

/*
 * GET /module_managers/
 */
module.exports.list = function (req, res, next) {
    var module_manager = orm.model("module_manager");

    module_manager.findAll({"where": {"deleted_at": null}}).success(function (module_managers) {
        res.send(200, {"module_managers": module_managers});
    });

    return next();
};

/*
 * POST /module_managers/
 */
module.exports.create = function (req, res, next) {
    var module_manager = orm.model("module_manager");

    if (req.body && req.body.module_manager) {
        var m = req.body.module_manager;
        if (m.teacher_id) {
            module_manager.create(m)
                .success(function (module_manager) {
                    res.send(201, {"module_manager": module_manager});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Module_manager found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Module_manager not found in body"});
    }

    return next();
};

/*
 * GET /module_managers/:id
 */
module.exports.show = function (req, res, next) {
    var module_manager = orm.model("module_manager");

    module_manager.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (module_manager) {
        if (!module_manager) {
            res.send(404, {"message": "Module_manager not found"});
        }
        else {
            res.send(200, {"module_manager": module_manager});
        }
    });

    return next();
};

/*
 * PUT /module_managers/:id
 */
module.exports.update = function (req, res, next) {
    var module_manager = orm.model("module_manager");

    if (req.body && req.body.module_manager) {
        var m = req.body.module_manager;
        if (m.teacher_id) {
            module_manager.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (module_manager) {
                if (!module_manager) {
                    res.send(404, {"message": "Module_manager not found"});
                }
                else {
                    module_manager.teacher_id = m.teacher_id;

                    module_manager.save()
                        .success(function (module_manager) {
                            res.send(200, {"module_manager": module_manager});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Module_manager found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Module_manager not found in body"});
    }

    return next();
};

/*
 * DELETE /module_managers/:id
 */
module.exports.delete = function (req, res, next) {
    var module_manager = orm.model("module_manager");

    module_manager.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (module_manager) {
        if (!module_manager) {
            res.send(404, {"message": "Module_manager not found"});
        }
        else {
            module_manager.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};