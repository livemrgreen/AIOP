var orm = require("../../config/models");
var async = require("async");

/*
 * GET /reservations/
 */
module.exports.list = function (req, res, next) {
    var reservation = orm.model("reservation");

    reservation.findAll({}).success(function (reservations) {
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
                    async.map([reservation], handleReservation, function (error, results) {
                        res.send(201, {"reservation": results[0]});
                    });

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

    reservation.find({"where": {"id": req.params.id}}).success(function (reservation) {
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
                            async.map([reservation], handleReservation, function (error, results) {
                                res.send(200, {"reservation": results[0]});
                            });
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
    var tmp = reservation.values;
    delete tmp.time_slot_id;
    delete tmp.room_id;
    delete tmp.teaching_id;
    delete tmp.reservation_request_id;

    async.parallel(
        // first arg = tasks to do
        {
            // try to reach the administrator
            "time_slot": function (done) {
                reservation.getSlot().success(function (time_slot) {
                    if (time_slot) {
                        var t = time_slot.values;
                        done(null, t);
                    }
                    else {
                        done(null);
                    }
                });
            },

            "room": function (done) {
                reservation.getRoom().success(function (room) {
                    if (room) {
                        var r = room.values;
                        delete r.building_id;
                        room.getBuilding().success(function (building) {
                            if (building) {
                                r.building = building.values;
                                done(null, r);
                            }
                            else {
                                done(null);
                            }
                        });
                    }
                    else {
                        done(null);
                    }
                });
            },

            "teaching": function (done) {
                reservation.getTeaching().success(function (teaching) {
                    if (teaching) {
                        var t = teaching.values;
                        done(null, t);
                    }
                    else {
                        done(null);
                    }
                });
            },

            // try to reach the manager
            "reservation_request": function (done) {
                reservation.getRequest().success(function (reservation_request) {
                    if (reservation_request) {
                        var r = reservation_request.values;
                        done(null, r);
                    }
                    else {
                        done(null);
                    }
                });
            }
        },

        // second arg = final func
        function (err, results) {
            // when done, we can use the object-key
            // to get the object-value
            tmp.time_slot = results.time_slot;
            tmp.room = results.room;
            tmp.teaching = results.teaching;
            tmp.reservation_request = results.reservation_request;
            done(null, tmp);
        }
    );
};
module.exports.handleReservation = handleReservation;