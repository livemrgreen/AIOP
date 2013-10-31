var orm = require("../../config/models");

/*
 * GET /lessons/
 */
module.exports.list = function (req, res, next) {
    var lesson = orm.model("lesson");
	
    lesson.findAll()
        .success(function (lessons) {
            res.send(200, lessons);
        });

    return next();
};

/*
 * POST /lessons/
 */
module.exports.create = function (req, res, next) {
    var lesson = orm.model("lesson");
	
	if (req.body && req.body.lesson) {
		lesson.findOrCreate()
			.success(function (lesson, created) {
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
 * GET /lessons/:id
 */
module.exports.show = function (req, res, next) {
    var lesson = orm.model("lesson");

    lesson.find({"where": {"id": req.params.id}})
        .success(function (lesson) {
            if (lesson == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
            }
        });

    return next();
};

/*
 * PUT /lessons/:id
 */
module.exports.update = function (req, res, next) {
    var lesson = orm.model("lesson");

    if (req.body && req.body.lesson) {
        lesson.find({"where": {"id": req.params.id}})
            .success(function (lesson) {
                if (lesson == null) {
                    res.send(404, {});
                }
                else {
                    lesson.save()
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
 * DELETE /lessons/:id
 */
module.exports.delete = function (req, res, next) {
    var lesson = orm.model("lesson");
	
    lesson.find({"where": {"id": req.params.id}})
        .success(function (lesson) {
            if (lesson == null) {
                res.send(404, {});
            }
            else {
                lesson.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};