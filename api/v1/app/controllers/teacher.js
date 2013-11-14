var orm = require("../../config/models");
var async = require("async");

/*
 * GET /teachers/
 */
module.exports.list = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.findAll({"where": {"deleted_at": null}}).success(function (teachers) {
        // use of async.js to handle asynchronus calls when getting db associations
        async.map(teachers, handleTeacher, function (error, results) {
            // when all is done
            res.send(200, {"teachers": results});
        });
    });

    return next();
};

/*
 * POST /teachers/
 */
module.exports.create = function (req, res, next) {
    var teacher = orm.model("teacher");

    if (req.body && req.body.teacher) {
        var t = req.body.teacher;
        if (t.person_id) {
            teacher.create(t)
                .success(function (teacher) {
                    res.send(201, {"teacher": teacher});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Teacher found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Teacher not found in body"});
    }

    return next();
};

/*
 * GET /teachers/:id
 */
module.exports.show = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (teacher) {
        if (!teacher) {
            res.send(404, {"message": "Teacher not found"});
        }
        else {
            res.send(200, {"teacher": teacher});
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
        var t = req.body.teacher;
        if (t.person_id) {
            teacher.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (teacher) {
                if (!teacher) {
                    res.send(404, {"message": "Teacher not found"});
                }
                else {
                    teacher.person_id = t.person_id;

                    teacher.save()
                        .success(function (teacher) {
                            res.send(200, {"teacher": teacher});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Teacher found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Teacher not found in body"});
    }

    return next();
};

/*
 * DELETE /teachers/:id
 */
module.exports.delete = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (teacher) {
        if (!teacher) {
            res.send(404, {"message": "Teacher not found"});
        }
        else {
            teacher.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};

/*
 * HELPERS
 */
var handleTeacher = function (teacher, done) {
    var tmp = teacher.values;
    delete tmp.person_id;

    // try to get the related person
    teacher.getPerson().success(function (person) {

        // if there is a person related
        if (person) {
            tmp.person = person.values;
            done(null, tmp);
        }
        else {
            done(null);
        }
    });
};