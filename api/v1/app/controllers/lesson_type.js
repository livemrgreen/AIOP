var orm = require("../../config/models");

/*
 * GET /lesson_types/
 */
module.exports.list = function (req, res, next) {
    var lesson_type = orm.model("lesson_type");

    lesson_type.findAll({"where": {"deleted_at": null}}).success(function (lesson_types) {
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
        var l = req.body.lesson_type;
        if (l.label) {
            lesson_type.create(l)
                .success(function (lesson_type) {
                    res.send(201, lesson_type);

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Lesson_type found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Lesson_type not found in body"});
    }

    return next();
};

/*
 * GET /lesson_types/:id
 */
module.exports.show = function (req, res, next) {
    var lesson_type = orm.model("lesson_type");

    lesson_type.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (lesson_type) {
        if (!lesson_type) {
            res.send(404, {"message": "Lesson_type not found"});
        }
        else {
            res.send(200, lesson_type);
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
        var l = req.body.lesson_type;
        if (l.label) {
            lesson_type.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (lesson_type) {
                if (!lesson_type) {
                    res.send(404, {"message": "Lesson_type not found"});
                }
                else {
                    lesson_type.label = l.label;

                    lesson_type.save()
                        .success(function (lesson_type) {
                            res.send(200, lesson_type);
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Lesson_type found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Lesson_type not found in body"});
    }

    return next();
};

/*
 * DELETE /lesson_types/:id
 */
module.exports.delete = function (req, res, next) {
    var lesson_type = orm.model("lesson_type");

    lesson_type.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (lesson_type) {
        if (!lesson_type) {
            res.send(404, {"message": "Lesson_type not found"});
        }
        else {
            lesson_type.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};