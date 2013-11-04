var orm = require("../../config/models");

/*
 * GET /lessons/
 */
module.exports.list = function (req, res, next) {
    var lesson = orm.model("lesson");

    lesson.findAll({"where": {"deleted_at": null}}).success(function (lessons) {
        res.send(200, {"lessons": lessons});
    });

    return next();
};

/*
 * POST /lessons/
 */
module.exports.create = function (req, res, next) {
    var lesson = orm.model("lesson");

    if (req.body && req.body.lesson) {
        var l = req.body.lesson;
        if (l.label && l.lesson_type_id && l.subject_id) {
            lesson.create(l)
                .success(function (lesson) {
                    res.send(201, {"lesson": lesson});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Lesson found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Lesson not found in body"});
    }

    return next();
};

/*
 * GET /lessons/:id
 */
module.exports.show = function (req, res, next) {
    var lesson = orm.model("lesson");

    lesson.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (lesson) {
        if (!lesson) {
            res.send(404, {"message": "Lesson not found"});
        }
        else {
            res.send(200, {"lesson": lesson});
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
        var l = req.body.lesson;
        if (l.label && l.lesson_type_id && l.subject_id) {
            lesson.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (lesson) {
                if (!lesson) {
                    res.send(404, {"message": "Lesson not found"});
                }
                else {
                    lesson.label = l.label;
                    lesson.lesson_type_id = l.lesson_type_id;
                    lesson.subject_id = l.subject_id;

                    lesson.save()
                        .success(function (lesson) {
                            res.send(200, {"lesson": lesson});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Lesson found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Lesson not found in body"});
    }

    return next();
};

/*
 * DELETE /lessons/:id
 */
module.exports.delete = function (req, res, next) {
    var lesson = orm.model("lesson");

    lesson.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (lesson) {
        if (!lesson) {
            res.send(404, {"message": "Lesson not found"});
        }
        else {
            lesson.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};