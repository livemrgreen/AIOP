var orm = require("../../config/models");

/*
 * GET /lesson_types/
 */
module.exports.list = function (req, res, next) {
    var lesson_type = orm.model("lesson_type");
	
    lesson_type.findAll()
        .success(function (lesson_types) {
            res.send(200, lesson_types);
        });

    return next();
};

/*
 * POST /lesson_types/
 */
module.exports.create = function (req, res, next) {
    var lesson_type = orm.model("lesson_type");
	
	if (req.body && req.body.lesson_type) {
		lesson_type.findOrCreate()
			.success(function (lesson_type, created) {
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
 * GET /lesson_types/:id
 */
module.exports.show = function (req, res, next) {
    var lesson_type = orm.model("lesson_type");

    lesson_type.find({"where": {"id": req.params.id}})
        .success(function (lesson_type) {
            if (lesson_type == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
            }
        });

    return next();
};

/*
 * PUT /lesson_types/:id
 */
module.exports.update = function (req, res, next) {
    var lesson_type = orm.model("lesson_type");

    if (req.body && req.body.lesson_type) {
        lesson_type.find({"where": {"id": req.params.id}})
            .success(function (lesson_type) {
                if (lesson_type == null) {
                    res.send(404, {});
                }
                else {
                    lesson_type.save()
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
 * DELETE /lesson_types/:id
 */
module.exports.delete = function (req, res, next) {
    var lesson_type = orm.model("lesson_type");
	
    lesson_type.find({"where": {"id": req.params.id}})
        .success(function (lesson_type) {
            if (lesson_type == null) {
                res.send(404, {});
            }
            else {
                lesson_type.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};