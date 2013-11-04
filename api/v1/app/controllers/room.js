var orm = require("../../config/models");

/*
 * GET /rooms/
 */
module.exports.list = function (req, res, next) {
    var room = orm.model("room");

    room.findAll({"where": {"deleted_at": null}}).success(function (rooms) {
        res.send(200, {"rooms": rooms});
    });

    return next();
};

/*
 * POST /rooms/
 */
module.exports.create = function (req, res, next) {
    var room = orm.model("room");

    if (req.body && req.body.room) {
        var r = req.body.room;
        if (r.label && r.capacity && r.building_id) {
            room.create(r)
                .success(function (room) {
                    res.send(201, {"room": room});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Room found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Room not found in body"});
    }

    return next();
};

/*
 * GET /rooms/:id
 */
module.exports.show = function (req, res, next) {
    var room = orm.model("room");

    room.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (room) {
        if (!room) {
            res.send(404, {"message": "Room not found"});
        }
        else {
            res.send(200, {"room": room});
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
        var r = req.body.room;
        if (r.label && r.capacity && r.building_id) {
            room.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (room) {
                if (!room) {
                    res.send(404, {"message": "Room not found"});
                }
                else {
                    room.label = r.label;
                    room.capacity = r.capacity;
                    room.building_id = r.building_id;

                    room.save()
                        .success(function (room) {
                            res.send(200, {"room": room});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Room found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Room not found in body"});
    }

    return next();
};

/*
 * DELETE /rooms/:id
 */
module.exports.delete = function (req, res, next) {
    var room = orm.model("room");

    room.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (room) {
        if (!room) {
            res.send(404, {"message": "Room not found"});
        }
        else {
            room.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};