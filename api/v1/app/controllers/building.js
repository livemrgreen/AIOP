var orm = require("../../config/models");

/*
 * GET /buildings/
 */
module.exports.list = function (req, res, next) {
    var building = orm.model("building");
	
    building.findAll()
        .success(function (buildings) {
            res.send(200, buildings);
        });

    return next();
};

/*
 * POST /buildings/
 */
module.exports.create = function (req, res, next) {
    var building = orm.model("building");
	
	if (req.body && req.body.building) {
		building.findOrCreate()
			.success(function (building, created) {
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
 * GET /buildings/:id
 */
module.exports.show = function (req, res, next) {
    var building = orm.model("building");

    building.find({"where": {"id": req.params.id}})
        .success(function (building) {
            if (building == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
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
        building.find({"where": {"id": req.params.id}})
            .success(function (building) {
                if (building == null) {
                    res.send(404, {});
                }
                else {
                    building.save()
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
 * DELETE /buildings/:id
 */
module.exports.delete = function (req, res, next) {
    var building = orm.model("building");
	
    building.find({"where": {"id": req.params.id}})
        .success(function (building) {
            if (building == null) {
                res.send(404, {});
            }
            else {
                building.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};