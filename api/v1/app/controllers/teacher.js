var orm = require("../../config/models");
var async = require("async");
var reservation_ctrl = require("./reservation");
var reservation_request_ctrl = require("./reservation_request");

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
module.exports.reservations = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.find({"where": {"id": req.params.id}}).success(function (teacher) {
        if (!teacher) {
            res.send(404, {"message": "Teacher not found"});
        }
        else {
            var reservation = orm.model("reservation");
            reservation.findAll({
                "where": {"teaching.teacher_id": teacher.id},
                "include": [orm.model("teaching"), {"model": orm.model("time_slot"), "as": "slot"}, orm.model("room")]})
                .success(function (reservations) {
                    async.map(reservations, reservation_ctrl.handleReservation, function (error, results) {
                        res.send(200, {"reservations": results});
                    });
                });
        }
    });

    return next();
};

/*
 * GET /teachers/:id/reservation_requests
 */
module.exports.reservation_requests = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.find({"where": {"id": req.params.id}}).success(function (teacher) {
        if (!teacher) {
            res.send(404, {"message": "Teacher not found"});
        }
        else {
            orm.model("reservation_request").findAll({
                "where": {"teaching.teacher_id": teacher.id},
                "include": [orm.model("teaching"), orm.model("reservation"), orm.model("time_slot")]})
                .success(function (reservation_requests) {
                res.send(200, {"reservation_requests": reservation_requests});
            });
        }
    });
    return next();
};

/*
 * GET /teachers/:id/reservation_requests_available
 */
module.exports.reservation_requests_available = function (req, res, next) {
    var teacher = orm.model("teacher");

    teacher.find({"where": {"id": req.params.id}}).success(function (teacher) {
        if (!teacher) {
            res.send(404, {"message": "Teacher not found"});
        }
        else {
            // Get all the modules from the manager
            teacher.getModules({"include": [orm.model("subject")]}).success(function (modules) {
                if (modules) {
                    // for all modules
                    async.map(modules,
                        function (module, done) {
                            // for all subjects in this module
                            async.map(module.subject,
                                function (subject, done) {
                                    subject.getLessons({"include": [orm.model("teaching")]}).success(function (lessons) {
                                        if (lessons) {
                                            // for all lessons in this subject
                                            async.map(lessons,
                                                function (lesson, done) {
                                                    // for all reservation request related to the teaching related to the lesson
                                                    lesson.teaching.getRequest({
                                                        "include": [
                                                            {"model": orm.model("time_slot"), "as": "slot"},
                                                            orm.model("teaching")
                                                        ]})
                                                        .success(function (reservation_requests) {
                                                            // if there are some reservations request
                                                            if (reservation_requests.length == 0) done(null, null);
                                                            else done(null, reservation_requests);
                                                        });
                                                },
                                                function (error, results) {
                                                    // we merge sub arrays of reservations request
                                                    var tmp = [];
                                                    done(null, results.concat.apply(tmp, results));
                                                }
                                            );
                                        }
                                    });
                                },
                                function (error, results) {
                                    // we merge sub arrays of reservations request
                                    var tmp = [];
                                    done(null, tmp.concat.apply(tmp, results));
                                }
                            );
                        },
                        function (error, results) {
                            // we merge sub arrays of reservations request
                            // and we delete null entries
                            var tmp = [];
                            tmp = tmp.concat.apply(tmp, results).filter(function (n) {
                                return n;
                            });

                            // for all reservation_requests
                            async.map(tmp,
                                function (reservation_request, done) {
                                    // if there is an status on the request
                                    if (!reservation_request.status) {
                                        reservation_request.getReservation().success(function (reservation) {
                                            // if there is a reservation
                                            if (reservation) done(null, null);
                                            else done(null, reservation_request);
                                        })
                                    }
                                    else {
                                        done(null, null);
                                    }
                                },
                                function (error, results) {
                                    // filter with the only the requests
                                    tmp = results.filter(function (n) {
                                        return n;
                                    });

                                    // hydrate all reservation_requests
                                    async.map(tmp,
                                        reservation_request_ctrl.handleReservationRequest,
                                        function (error, results) {
                                            res.send(200, {"reservation_requests": results});
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
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