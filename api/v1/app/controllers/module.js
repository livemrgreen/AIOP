var orm = require("../../config/models");

/*
 * GET /modules/
 */
module.exports.list = function (req, res, next) {
    var module = orm.model("module");

    module.findAll({}).success(function (modules) {
        res.send(200, {"modules": modules});
    });

    return next();
};

/*
 * POST /modules/
 */
module.exports.create = function (req, res, next) {
    var module = orm.model("module");

    if (req.body && req.body.module) {
        var m = req.body.module;
        if (m.label && m.module_manager_id) {
            module.create(m)
                .success(function (module) {
                    res.send(201, {"module": module});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Module found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Module not found in body"});
    }

    return next();
};

/*
 * GET /modules/:id
 */
module.exports.show = function (req, res, next) {
    var module = orm.model("module");

    module.find({"where": {"id": req.params.id}}).success(function (module) {
        if (!module) {
            res.send(404, {"message": "Module not found"});
        }
        else {
            res.send(200, {"module": module});
        }
    });

    return next();
};

/*
 * PUT /modules/:id
 */
module.exports.update = function (req, res, next) {
    var module = orm.model("module");

    if (req.body && req.body.module) {
        var m = req.body.module;
        if (m.label && m.module_manager_id) {
            module.find({"where": {"id": req.params.id}}).success(function (module) {
                if (!module) {
                    res.send(404, {"message": "Module not found"});
                }
                else {
                    module.label = m.label;
                    module.module_manager_id = m.module_manager_id;

                    module.save()
                        .success(function (module) {
                            res.send(200, {"module": module});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Module found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Module not found in body"});
    }

    return next();
};

/*
 * DELETE /modules/:id
 */
module.exports.delete = function (req, res, next) {
    var module = orm.model("module");

    module.find({"where": {"id": req.params.id}}).success(function (module) {
        if (!module) {
            res.send(404, {"message": "Module not found"});
        }
        else {
            module.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};