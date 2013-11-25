var orm = require("../../config/models");
var async = require("async");

/*
 * GET /reservations/
 */
module.exports.list = function (req, res, next) {
    var reservation = orm.model("reservation");

    reservation.findAll({"include": [orm.model("teaching"), {"model": orm.model("time_slot"), "as": "slot"}, orm.model("room")]}).success(function (reservations) {
        async.map(reservations, handleReservation, function (error, results) {
            res.send(200, {"reservations": results});
        });
    });

    return next();
};

/*
 * POST /reservations/
 */
module.exports.create = function (req, res, next) {
    var reservation = orm.model("reservation");

    if (req.body && req.body.reservation) {
        var r = req.body.reservation;
        if (r.date && r.time_slot_id && r.room_id && r.teaching_id) {
            reservation.create(r)
                .success(function (reservation) {
                    res.send(201, {"reservation": reservation});
                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Reservation found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Reservation not found in body"});
    }

    return next();
};

/*
 * GET /reservations/:id
 */
module.exports.show = function (req, res, next) {
    var reservation = orm.model("reservation");

    reservation.find({
        "where": {"id": req.params.id},
        "include": [orm.model("teaching"), {"model": orm.model("time_slot"), "as": "slot"}, orm.model("room")]}).success(function (reservation) {
            if (!reservation) {
                res.send(404, {"message": "Reservation not found"});
            }
            else {
                async.map([reservation], handleReservation, function (error, results) {
                    res.send(200, {"reservation": results[0]});
                });
            }
        });

    return next();
};

/*
 * PUT /reservations/:id
 */
module.exports.update = function (req, res, next) {
    var reservation = orm.model("reservation");

    if (req.body && req.body.reservation) {
        var r = req.body.reservation;
        if (r.date && r.time_slot_id && r.room_id && r.teaching_id) {
            reservation.find({"where": {"id": req.params.id}}).success(function (reservation) {
                if (!reservation) {
                    res.send(404, {"message": "Reservation not found"});
                }
                else {
                    reservation.date = r.date;
                    reservation.time_slot_id = r.time_slot_id;
                    reservation.room_id = r.room_id;
                    reservation.teaching_id = r.teaching_id;

                    reservation.save()
                        .success(function (reservation) {
                            res.send(200, {"reservation": reservation});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Reservation found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Reservation not found in body"});
    }

    return next();
};

/*
 * DELETE /reservations/:id
 */
module.exports.delete = function (req, res, next) {
    var reservation = orm.model("reservation");

    reservation.find({"where": {"id": req.params.id}}).success(function (reservation) {
        if (!reservation) {
            res.send(404, {"message": "Reservation not found"});
        }
        else {
            reservation.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};

/*
 * HELPERS
 */
var handleReservation = function (reservation, done) {
    var tmp = JSON.parse(JSON.stringify(reservation));

    async.parallel(
        {
            "teacher": function (done) {
                reservation.teaching.getTeacher().success(function (teacher) {
                    if (teacher) {
                        done(null, JSON.parse(JSON.stringify(teacher)));
                    }
                });
            },
            "group": function (done) {
                reservation.teaching.getGroup().success(function (group) {
                    if (group) {
                        done(null, JSON.parse(JSON.stringify(group)));
                    }
                });
            },
            "lesson": function (done) {
                reservation.teaching.getLesson({"include": [orm.model("subject"), {model: orm.model("lesson_type"), as: 'type'}]})
                    .success(function (lesson) {
                        if (lesson) {
                            done(null, JSON.parse(JSON.stringify(lesson)));
                        }
                    });
            },
            "building": function (done) {
                reservation.room.getBuilding().success(function (building) {
                    if (building) {
                        done(null, JSON.parse(JSON.stringify(building)));
                    }
                });
            }
        },
        function (err, results) {
            tmp.teaching.teacher = results.teacher;
            tmp.teaching.group = results.group;
            tmp.teaching.lesson = results.lesson;
            tmp.room.building = results.building;
            tmp.time_slot = tmp.slot;
			tmp.teaching.lesson.lesson_type = results.lesson.type;

            delete tmp.slot;
            delete tmp.time_slot_id;
            delete tmp.room_id;
            delete tmp.teaching_id;
            delete tmp.reservation_request_id;
            delete tmp.teaching.teacher_id;
            delete tmp.teaching.group_id;
            delete tmp.teaching.lesson_id;
            delete tmp.teaching.lesson.lesson_type_id;
            delete tmp.teaching.lesson.subject_id;
            delete tmp.teaching.lesson.type;
            delete tmp.room.building_id;

            done(null, tmp)
        });
};
module.exports.handleReservation = handleReservation;