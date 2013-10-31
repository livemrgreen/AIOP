var orm = require("../../config/models");

/*
 * GET /modules/
 */
module.exports.list = function (req, res, next) {
    var module = orm.model("module");
	
    module.findAll()
        .success(function (modules) {
            res.send(200, modules);
        });

    return next();
};

/*
 * POST /modules/
 */
module.exports.create = function (req, res, next) {
    var module = orm.model("module");
	
	if (req.body && req.body.module) {
		module.findOrCreate()
			.success(function (module, created) {
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
 * GET /modules/:id
 */
module.exports.show = function (req, res, next) {
    var module = orm.model("module");

    module.find({"where": {"id": req.params.id}})
        .success(function (module) {
            if (module == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
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
        module.find({"where": {"id": req.params.id}})
            .success(function (module) {
                if (module == null) {
                    res.send(404, {});
                }
                else {
                    module.save()
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
 * DELETE /modules/:id
 */
module.exports.delete = function (req, res, next) {
    var module = orm.model("module");
	
    module.find({"where": {"id": req.params.id}})
        .success(function (module) {
            if (module == null) {
                res.send(404, {});
            }
            else {
                module.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};