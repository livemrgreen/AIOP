var orm = require("../../config/models");

/*
 * GET /caracteristics/
 */
module.exports.list = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");
	
    caracteristic.findAll()
        .success(function (caracteristics) {
            res.send(200, caracteristics);
        });

    return next();
};

/*
 * POST /caracteristics/
 */
module.exports.create = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");
	
	if (req.body && req.body.caracteristic) {
		caracteristic.findOrCreate()
			.success(function (caracteristic, created) {
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
 * GET /caracteristics/:id
 */
module.exports.show = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");

    caracteristic.find({"where": {"id": req.params.id}})
        .success(function (caracteristic) {
            if (caracteristic == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
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
        caracteristic.find({"where": {"id": req.params.id}})
            .success(function (caracteristic) {
                if (caracteristic == null) {
                    res.send(404, {});
                }
                else {
                    caracteristic.save()
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
 * DELETE /caracteristics/:id
 */
module.exports.delete = function (req, res, next) {
    var caracteristic = orm.model("caracteristic");
	
    caracteristic.find({"where": {"id": req.params.id}})
        .success(function (caracteristic) {
            if (caracteristic == null) {
                res.send(404, {});
            }
            else {
                caracteristic.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};