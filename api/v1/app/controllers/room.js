var orm = require("../../config/models");
var async = require("async");

/*
 * GET /rooms/
 */
module.exports.list = function (req, res, next) {
    var room = orm.model("room");

    room.findAll({}).success(function (rooms) {
        async.map(rooms, handleRoom, function (error, results) {
            res.send(200, {"rooms": results});
        });
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
                    async.map([room], handleRoom, function (error, results) {
                        res.send(201, {"room": results[0]});
                    });
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

    room.find({"where": {"id": req.params.id}}).success(function (room) {
        if (!room) {
            res.send(404, {"message": "Room not found"});
        }
        else {
            async.map([room], handleRoom, function (error, results) {
                res.send(200, {"room": results[0]});
            });
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
            room.find({"where": {"id": req.params.id}}).success(function (room) {
                if (!room) {
                    res.send(404, {"message": "Room not found"});
                }
                else {
                    room.label = r.label;
                    room.capacity = r.capacity;
                    room.building_id = r.building_id;

                    room.save()
                        .success(function (room) {
                            async.map([room], handleRoom, function (error, results) {
                                res.send(200, {"room": results[0]});
                            });
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

    room.find({"where": {"id": req.params.id}}).success(function (room) {
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

/*
 * HELPERS
 */
var handleRoom = function (room, done) {
    var tmp = room.values;
    delete tmp.building_id;

    room.getBuilding().success(function (building) {
        if (building) {
            tmp.building = building.values;
            done(null, tmp);
        }
        else {
            done(null);
        }
    });
};