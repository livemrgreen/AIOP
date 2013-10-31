var orm = require("../../config/models");

/*
 * GET /reservation_requests/
 */
module.exports.list = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");
	
    reservation_request.findAll()
        .success(function (reservation_requests) {
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
		reservation_request.findOrCreate()
			.success(function (reservation_request, created) {
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
 * GET /reservation_requests/:id
 */
module.exports.show = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    reservation_request.find({"where": {"id": req.params.id}})
        .success(function (reservation_request) {
            if (reservation_request == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
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
        reservation_request.find({"where": {"id": req.params.id}})
            .success(function (reservation_request) {
                if (reservation_request == null) {
                    res.send(404, {});
                }
                else {
                    reservation_request.save()
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
 * DELETE /reservation_requests/:id
 */
module.exports.delete = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");
	
    reservation_request.find({"where": {"id": req.params.id}})
        .success(function (reservation_request) {
            if (reservation_request == null) {
                res.send(404, {});
            }
            else {
                reservation_request.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};