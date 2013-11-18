var orm = require("../../config/models");
var async = require("async");

/*
 * GET /groups/
 */
module.exports.list = function (req, res, next) {
    var group = orm.model("group");

    group.findAll({}).success(function (groups) {
        res.send(200, {"groups": groups});
    });

    return next();
};

/*
 * POST /groups/
 */
module.exports.create = function (req, res, next) {
    var group = orm.model("group");

    if (req.body && req.body.group) {
        var g = req.body.group;
        if (g.label && g.parent_id) {
            group.create(g)
                .success(function (group) {
                    res.send(201, {"group": group});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Group found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Group not found in body"});
    }

    return next();
};

/*
 * GET /groups/:id
 */
module.exports.show = function (req, res, next) {
    var group = orm.model("group");

    group.find({"where": {"id": req.params.id}}).success(function (group) {
        if (!group) {
            res.send(404, {"message": "Group not found"});
        }
        else {
            res.send(200, {"group": group});
        }
    });

    return next();
};

/*
 * GET /groups/:id/teachings
 */
module.exports.teachings_available = function (req, res, next) {
    var group = orm.model("group");

    group.find({"where": {"id": req.params.id}}).success(function (group) {
        if (!group) {
            res.send(404, {"message": "Group not found"});
        }
        else {
            group.getTeachings({
                "where": ["reservation.id IS NULL"],
                "include": [orm.model("group"), orm.model("teacher"), orm.model("lesson"), orm.model("reservation")]})
                .success(function (teachings) {
                    async.map(teachings, handleLesson, function (error, results) {
                        res.send(200, {"teachings": results});
                    });
                });
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
        var g = req.body.group;
        if (g.label && g.parent_id) {
            group.find({"where": {"id": req.params.id}}).success(function (group) {
                if (!group) {
                    res.send(404, {"message": "Group not found"});
                }
                else {
                    group.label = g.label;
                    group.parent_id = g.parent_id;

                    group.save()
                        .success(function (group) {
                            res.send(200, {"group": group});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Group found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Group not found in body"});
    }

    return next();
};

/*
 * DELETE /groups/:id
 */
module.exports.delete = function (req, res, next) {
    var group = orm.model("group");

    group.find({"where": {"id": req.params.id}}).success(function (group) {
        if (!group) {
            res.send(404, {"message": "Group not found"});
        }
        else {
            group.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};

/*
 *
 */
var handleLesson = function (teaching, done) {
    var tmp = JSON.parse(JSON.stringify(teaching));

    async.parallel(
        {
            "lesson_type": function (done) {
                teaching.lesson.getType().success(function (lesson_type) {
                    if (lesson_type) {
                        done(null, JSON.parse(JSON.stringify(lesson_type)));
                    }
                });
            },

            "subject": function (done) {
                teaching.lesson.getSubject().success(function (subject) {
                    if (subject) {
                        done(null, JSON.parse(JSON.stringify(subject)));
                    }
                });
            }
        },
        function (err, results) {
            tmp.lesson.lesson_type = results.lesson_type;
            tmp.lesson.subject = results.subject;

            delete tmp.group_id;
            delete tmp.teacher_id;
            delete tmp.lesson_id;
            delete tmp.lesson.lesson_type_id;
            delete tmp.lesson.subject_id;
            delete tmp.reservation;

            done(null, tmp)
        }
    )
}