var orm = require("../../config/models");

/*
 * GET /teachers/
 */
module.exports.list = function (req, res, next) {
    var teacher = orm.model("teacher");
	
    teacher.findAll()
        .success(function (teachers) {
            res.send(200, teachers);
        });

    return next();
};

/*
 * POST /teachers/
 */
module.exports.create = function (req, res, next) {
    var teacher = orm.model("teacher");
	
	if (req.body && req.body.teacher) {
		teacher.findOrCreate()
			.success(function (teacher, created) {
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
 * GET /teachers/:id
 */
module.exports.show = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.find({"where": {"id": req.params.id}})
        .success(function (teacher) {
            if (teacher == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
            }
        });

    return next();
};

/*
 * PUT /teachers/:id
 */
module.exports.update = function (req, res, next) {
    var teacher = orm.model("teacher");

    if (req.body && req.body.teacher) {
        teacher.find({"where": {"id": req.params.id}})
            .success(function (teacher) {
                if (teacher == null) {
                    res.send(404, {});
                }
                else {
                    teacher.save()
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
 * DELETE /teachers/:id
 */
module.exports.delete = function (req, res, next) {
    var teacher = orm.model("teacher");
	
    teacher.find({"where": {"id": req.params.id}})
        .success(function (teacher) {
            if (teacher == null) {
                res.send(404, {});
            }
            else {
                teacher.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};