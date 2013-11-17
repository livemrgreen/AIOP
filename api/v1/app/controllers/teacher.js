var orm = require("../../config/models");
var async = require("async");
var res_ctrl = require("./reservation");

/*
 * GET /teachers/
 */
module.exports.list = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.findAll({}).success(function (teachers) {
        res.send(200, {"teachers": teachers});
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

    teacher.find({"where": {"id": req.params.id}}).success(function (teacher) {
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
 * GET /teachers/:id/reservations
 */
module.exports.show_reserations = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.find({"where": {"id": req.params.id}}).success(function (teacher) {
        if (!teacher) {
            res.send(404, {"message": "Teacher not found"});
        }
        else {
            teacher.getTeachings().success(function (teachings) {
                async.map(teachings, handleTeachingForReservations, function (error, results) {
                    var reservations = results.filter(function(reservation) { return reservation != null });
                    async.map(reservations, res_ctrl.handleReservation, function (error, results) {
                        res.send(200, {"reservations": results});
                    });
                });
            });
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
            teacher.find({"where": {"id": req.params.id}}).success(function (teacher) {
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

    teacher.find({"where": {"id": req.params.id}}).success(function (teacher) {
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
var handleTeachingForReservations = function (teaching, done) {
    teaching.getReservation().success(function (reservation) {
        if(reservation) {
            done(null, reservation);
        }
        else {
            done(null);
        }
    });
};