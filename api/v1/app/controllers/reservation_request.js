var orm = require("../../config/models");

/*
 * GET /reservation_requests/
 */
module.exports.list = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    reservation_request.findAll({"where": {"deleted_at": null}}).success(function (reservation_requests) {
        res.send(200, reservation_requests);
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
        if (r.date && r.time_slot_id && r.teaching_id) {
            reservation_request.create(r)
                .success(function (reservation_request) {
                    res.send(201, reservation_request);

                })
                .error(function (error) {
                    res.send(400, error);
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

    reservation_request.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (reservation_request) {
        if (!reservation_request) {
            res.send(404, {"message": "Reservation_request not found"});
        }
        else {
            res.send(200, reservation_request);
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
        if (r.date && r.time_slot_id && r.teaching_id) {
            reservation_request.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (reservation_request) {
                if (!reservation_request) {
                    res.send(404, {"message": "Reservation_request not found"});
                }
                else {
                    reservation_request.date = r.date;
                    reservation_request.time_slot_id = r.time_slot_id;
                    reservation_request.teaching_id = r.teaching_id;

                    reservation_request.save()
                        .success(function (reservation_request) {
                            res.send(200, reservation_request);
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

    reservation_request.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (reservation_request) {
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