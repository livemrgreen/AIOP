var orm = require("../../config/models");

/*
 * GET /groups/
 */
module.exports.list = function (req, res, next) {
    var group = orm.model("group");
	
    group.findAll()
        .success(function (groups) {
            res.send(200, groups);
        });

    return next();
};

/*
 * POST /groups/
 */
module.exports.create = function (req, res, next) {
    var group = orm.model("group");
	
	if (req.body && req.body.group) {
		group.findOrCreate()
			.success(function (group, created) {
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
 * GET /groups/:id
 */
module.exports.show = function (req, res, next) {
    var group = orm.model("group");

    group.find({"where": {"id": req.params.id}})
        .success(function (group) {
            if (group == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
            }
        });

    return next();
};

/*
 * PUT /groups/:id
 */
module.exports.update = function (req, res, next) {
    var group = orm.model("group");

    if (req.body && req.body.group) {
        group.find({"where": {"id": req.params.id}})
            .success(function (group) {
                if (group == null) {
                    res.send(404, {});
                }
                else {
                    group.save()
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
 * DELETE /groups/:id
 */
module.exports.delete = function (req, res, next) {
    var group = orm.model("group");
	
    group.find({"where": {"id": req.params.id}})
        .success(function (group) {
            if (group == null) {
                res.send(404, {});
            }
            else {
                group.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};