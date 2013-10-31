var orm = require("../../config/models");

/*
 * GET /module_managers/
 */
module.exports.list = function (req, res, next) {
    var module_manager = orm.model("module_manager");
	
    module_manager.findAll()
        .success(function (module_managers) {
            res.send(200, module_managers);
        });

    return next();
};

/*
 * POST /module_managers/
 */
module.exports.create = function (req, res, next) {
    var module_manager = orm.model("module_manager");
	
	if (req.body && req.body.module_manager) {
		module_manager.findOrCreate()
			.success(function (module_manager, created) {
				if (created) {
					res.send(201, {});
				}
				else {
					res.send(409, {});
				}
			})
			.error(function (error) {
				res.send(400, error);
			});
	}
    else {
        res.send(400, {});
    }
	
    return next();
};

/*
 * GET /module_managers/:id
 */
module.exports.show = function (req, res, next) {
    var module_manager = orm.model("module_manager");

    module_manager.find({"where": {"id": req.params.id}})
        .success(function (module_manager) {
            if (module_manager == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
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
        module_manager.find({"where": {"id": req.params.id}})
            .success(function (module_manager) {
                if (module_manager == null) {
                    res.send(404, {});
                }
                else {
                    module_manager.save()
                        .success(function () {
                            res.send(200, {});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
    }
    else {
        res.send(400, {});
    }

    return next();
};

/*
 * DELETE /module_managers/:id
 */
module.exports.delete = function (req, res, next) {
    var module_manager = orm.model("module_manager");
	
    module_manager.find({"where": {"id": req.params.id}})
        .success(function (module_manager) {
            if (module_manager == null) {
                res.send(404, {});
            }
            else {
                module_manager.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};