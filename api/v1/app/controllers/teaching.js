var orm = require("../../config/models");

/*
 * GET /teachings/
 */
module.exports.list = function (req, res, next) {
    var teaching = orm.model("teaching");
	
    teaching.findAll()
        .success(function (teachings) {
            res.send(200, teachings);
        });

    return next();
};

/*
 * POST /teachings/
 */
module.exports.create = function (req, res, next) {
    var teaching = orm.model("teaching");
	
	if (req.body && req.body.teaching) {
		teaching.findOrCreate()
			.success(function (teaching, created) {
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
 * GET /teachings/:id
 */
module.exports.show = function (req, res, next) {
    var teaching = orm.model("teaching");

    teaching.find({"where": {"id": req.params.id}})
        .success(function (teaching) {
            if (teaching == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
            }
        });

    return next();
};

/*
 * PUT /teachings/:id
 */
module.exports.update = function (req, res, next) {
    var teaching = orm.model("teaching");

    if (req.body && req.body.teaching) {
        teaching.find({"where": {"id": req.params.id}})
            .success(function (teaching) {
                if (teaching == null) {
                    res.send(404, {});
                }
                else {
                    teaching.save()
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
 * DELETE /teachings/:id
 */
module.exports.delete = function (req, res, next) {
    var teaching = orm.model("teaching");
	
    teaching.find({"where": {"id": req.params.id}})
        .success(function (teaching) {
            if (teaching == null) {
                res.send(404, {});
            }
            else {
                teaching.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};