var orm = require("../../config/models");

/*
 * GET /rooms/
 */
module.exports.list = function (req, res, next) {
    var room = orm.model("room");
	
    room.findAll()
        .success(function (rooms) {
            res.send(200, rooms);
        });

    return next();
};

/*
 * POST /rooms/
 */
module.exports.create = function (req, res, next) {
    var room = orm.model("room");
	
	if (req.body && req.body.room) {
		room.findOrCreate()
			.success(function (room, created) {
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
 * GET /rooms/:id
 */
module.exports.show = function (req, res, next) {
    var room = orm.model("room");

    room.find({"where": {"id": req.params.id}})
        .success(function (room) {
            if (room == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
            }
        });

    return next();
};

/*
 * PUT /rooms/:id
 */
module.exports.update = function (req, res, next) {
    var room = orm.model("room");

    if (req.body && req.body.room) {
        room.find({"where": {"id": req.params.id}})
            .success(function (room) {
                if (room == null) {
                    res.send(404, {});
                }
                else {
                    room.save()
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
 * DELETE /rooms/:id
 */
module.exports.delete = function (req, res, next) {
    var room = orm.model("room");
	
    room.find({"where": {"id": req.params.id}})
        .success(function (room) {
            if (room == null) {
                res.send(404, {});
            }
            else {
                room.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};