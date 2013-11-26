var orm = require("../../config/models");
var async = require("async");
/*
 * GET /reservation_requests/
 */
module.exports.list = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    reservation_request.findAll({
        "where": {"reservation.id": null, "status": null},
        "include": [
            {"model": orm.model("time_slot"), "as": "slot"},
            orm.model("teaching"),
            orm.model("reservation")
        ]})
        .success(function (reservation_requests) {
			async.map(reservation_requests,
				handleReservationRequest,
				function(error, results) {
					res.send(200, {"reservation_requests": results});
				}
			);
        });

    return next();
};

/*
 * POST /reservation_requests/
 */
module.exports.create = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    if (req.body && req.body.reservation_request) {
        var r = req.body.reservation_request;
        if (r.date && r.capacity && r.status && r.time_slot_id && r.teaching_id && r.characteristics) {

            // get the characteristics database objects
            async.map(r.characteristics, handleCharacteristic, function (err, results) {

                // remove them from the r_r
                delete r.characteristics;

                // save just the r_r
                reservation_request.create(r)
                    .success(function (reservation_request) {

                        // add some characs
                        reservation_request.setCharacteristics(results)
                            .success(function (characteristics) {
                                res.send(201, {"reservation_request": reservation_request});
                            })
                            .error(function (error) {
                                res.send(400, error);
                            });
                    })
                    .error(function (error) {
                        res.send(400, error);
                    });
            });
        }
        else {
            res.send(400, {"message": "Reservation_request found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Reservation_request not found in body"});
    }

    return next();
};

/*
 * GET /reservation_requests/:id
 */
module.exports.show = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    reservation_request.find({
        "where": {"id": req.params.id, "reservation.id": null},
        "include": [
            {"model": orm.model("time_slot"), "as": "slot"},
            orm.model("teaching"),
            orm.model("reservation")
        ]})
        .success(function (reservation_request) {
            if (!reservation_request) {
                res.send(404, {"message": "Reservation_request not found"});
            }
            else {
                res.send(200, {"reservation_request": reservation_request});
            }
        });

    return next();
};

/*
 * GET /reservation_requests/:id/available_rooms
 */
module.exports.available_rooms = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");
    var room = orm.model("room");

    reservation_request.find({
        "where": {"id": req.params.id, "reservation.id": null},
        "include": [orm.model("reservation"), orm.model("characteristic")]})
        .success(function (reservation_request) {
            if (!reservation_request) {
                res.send(404, {"message": "Reservation_request not found"});
            }
            else {
                // 1. Get all the free rooms for this date/slot
                // 2. Remove the ones that not match the charac
                // 3. Compute the score of each room
                // 4. Send after sorting
                async.waterfall(
                    [
                        // 1. Get all the free rooms
                        function (done) {
                            room.findAll({
                                "where": [
                                    "capacity >= ? " +
                                        "AND (reservation.date IS NULL OR reservation.date != ?) " +
                                        "AND (reservation.time_slot_id IS NULL OR reservation.time_slot_id != ?)",
                                    reservation_request.capacity, reservation_request.date,
                                    reservation_request.time_slot_id],
                                "include": [orm.model("reservation"), orm.model("characteristic"), orm.model("building")]})
                                .success(function (rooms) {
                                    done(null, rooms);
                                }
                            );
                        },

                        // Test if found rooms match the asked charac
                        function (arg1, done) {
                            async.map(arg1,
                                function (room, done) {
                                    async.map(reservation_request.characteristic,
                                        function (characteristic, done) {
                                            room.hasCharacteristic(characteristic).success(function (bool) {
                                                done(null, bool);
                                            });
                                        },
                                        function (error, results) {
                                            // if it don't match, send null
                                            if (results.indexOf(false) != -1) done(null, null)
                                            else done(null, room);
                                        });
                                },
                                function (error, results) {
                                    // remove the null rooms
                                    done(null, results.filter(function (n) {
                                        return n
                                    }));
                                }
                            );
                        },
                        // 3. Score every room
                        // f(given, asked) = (given - asked)/given
                        function (arg1, done) {
                            async.map(
                                arg1,
                                function (room, done) {
                                    var tmp = JSON.parse(JSON.stringify(room));
                                    delete tmp.reservation;
                                    delete tmp.characteristic;
                                    delete tmp.building_id;

                                    var room_score = (room.capacity - reservation_request.capacity) / room.capacity;
                                    var characteristic_score = (room.characteristic.length - reservation_request.characteristic.length) / room.characteristic.length;

                                    if (reservation_request.characteristic.length == 0) tmp.score = 0;
                                    else tmp.score = (1 - ((room_score + characteristic_score) / 2)) * 100;

                                    done(null, tmp);
                                },
                                // 4. Sort the results
                                function (error, results) {
                                    done(null, results.sort(function (a, b) {
                                        return b.score - a.score;
                                    }));
                                }
                            );
                        }
                    ],
                    function (error, results) {
                        res.send(200, {"rooms": results});
                    }
                );
            }
        });
    return next();
};

/*
 * PUT /reservation_requests/:id
 */
module.exports.update = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    if (req.body && req.body.reservation_request) {
        var r = req.body.reservation_request;
        if (r.date && r.capacity && r.status && r.time_slot_id && r.teaching_id) {
            reservation_request.find({"where": {"id": req.params.id}}).success(function (reservation_request) {
                if (!reservation_request) {
                    res.send(404, {"message": "Reservation_request not found"});
                }
                else {
                    reservation_request.date = r.date;
                    reservation_request.capacity = r.capacity;
                    reservation_request.status = r.status;
                    reservation_request.time_slot_id = r.time_slot_id;
                    reservation_request.teaching_id = r.teaching_id;

                    reservation_request.save()
                        .success(function (reservation_request) {
                            res.send(200, {"reservation_request": reservation_request});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Reservation_request found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Reservation_request not found in body"});
    }

    return next();
};

/*
 * DELETE /reservation_requests/:id
 */
module.exports.delete = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    reservation_request.find({"where": {"id": req.params.id}}).success(function (reservation_request) {
        if (!reservation_request) {
            res.send(404, {"message": "Reservation_request not found"});
        }
        else {
            reservation_request.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};

/*
 * HELPERS
 */
var handleReservationRequest = function (reservation_request, done) {
    var tmp = JSON.parse(JSON.stringify(reservation_request));

    async.parallel(
        {
            "teacher": function (done) {
                reservation_request.teaching.getTeacher().success(function (teacher) {
                    if (teacher) {
                        done(null, JSON.parse(JSON.stringify(teacher)));
                    }
                });
            },
            "group": function (done) {
                reservation_request.teaching.getGroup().success(function (group) {
                    if (group) {
                        done(null, JSON.parse(JSON.stringify(group)));
                    }
                });
            },
            "lesson": function (done) {
                reservation_request.teaching.getLesson({"include": [orm.model("subject"), {model: orm.model("lesson_type"), as: 'type'}]})
                    .success(function (lesson) {
                        if (lesson) {
                            done(null, JSON.parse(JSON.stringify(lesson)));
                        }
                    });
            }
        },
        function (err, results) {
            tmp.teaching.teacher = results.teacher;
            tmp.teaching.group = results.group;
            tmp.teaching.lesson = results.lesson;
            tmp.time_slot = tmp.slot;
            tmp.teaching.lesson.lesson_type = results.lesson.type;

            delete tmp.slot;
            delete tmp.time_slot_id;
            delete tmp.teaching_id;
            delete tmp.teaching.teacher_id;
            delete tmp.teaching.group_id;
            delete tmp.teaching.lesson_id;
            delete tmp.teaching.lesson.lesson_type_id;
            delete tmp.teaching.lesson.subject_id;
            delete tmp.teaching.lesson.type;

            done(null, tmp)
        });
};
module.exports.handleReservationRequest = handleReservationRequest;

var handleCharacteristic = function (characteristic, done) {
    orm.model("characteristic").find(characteristic.id)
        .success(function (characteristic) {
            done(null, characteristic);
        });
};