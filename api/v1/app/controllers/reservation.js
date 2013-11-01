var orm = require("../../config/models");

/*
 * GET /reservations/
 */
module.exports.list = function (req, res, next) {
    var reservation = orm.model("reservation");

    reservation.findAll({"where": {"deleted_at": null}}).success(function (reservations) {
        res.send(200, reservations);
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
                    res.send(201, reservation);

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

    reservation.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (reservation) {
        if (!reservation) {
            res.send(404, {"message": "Reservation not found"});
        }
        else {
            res.send(200, reservation);
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
            reservation.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (reservation) {
                if (!reservation) {
                    res.send(404, {"message": "Reservation not found"});
                }
                else {
                    reservation.date = r.date;
                    reservation.time_slot_id = r.time_slot_id;
                    reservation.room_id = r.room_id;
                    reservation.teaching_id = r.teaching_id;

                    reservation.save()
                        .success(function (user) {
                            res.send(200, reservation);
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

    reservation.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (reservation) {
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