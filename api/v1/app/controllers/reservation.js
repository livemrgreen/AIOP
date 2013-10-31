var orm = require("../../config/models");

/*
 * GET /reservations/
 */
module.exports.list = function (req, res, next) {
    var reservation = orm.model("reservation");
	
    reservation.findAll()
        .success(function (reservations) {
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
		reservation.findOrCreate()
			.success(function (reservation, created) {
				if (created) {
					res.send(201, {});
				}
				else {
					res.send(409, {});
				}
			})
			.error(function (error) {
				res.send(400, error);
			});
	}
    else {
        res.send(400, {});
    }
	
    return next();
};

/*
 * GET /reservations/:id
 */
module.exports.show = function (req, res, next) {
    var reservation = orm.model("reservation");

    reservation.find({"where": {"id": req.params.id}})
        .success(function (reservation) {
            if (reservation == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
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
        reservation.find({"where": {"id": req.params.id}})
            .success(function (reservation) {
                if (reservation == null) {
                    res.send(404, {});
                }
                else {
                    reservation.save()
                        .success(function () {
                            res.send(200, {});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
    }
    else {
        res.send(400, {});
    }

    return next();
};

/*
 * DELETE /reservations/:id
 */
module.exports.delete = function (req, res, next) {
    var reservation = orm.model("reservation");
	
    reservation.find({"where": {"id": req.params.id}})
        .success(function (reservation) {
            if (reservation == null) {
                res.send(404, {});
            }
            else {
                reservation.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};