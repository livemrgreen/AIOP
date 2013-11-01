var orm = require("../../config/models");

/*
 * GET /time_slots/
 */
module.exports.list = function (req, res, next) {
    var time_slot = orm.model("time_slot");

    time_slot.findAll({"where": {"deleted_at": null}}).success(function (time_slots) {
        res.send(200, time_slots);
    });

    return next();
};

/*
 * POST /time_slots/
 */
module.exports.create = function (req, res, next) {
    var time_slot = orm.model("time_slot");

    if (req.body && req.body.time_slot) {
        var t = req.body.time_slot;
        if (t.start && t.end) {
            time_slot.create(t)
                .success(function (time_slot) {
                    res.send(201, time_slot);

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Time_slot found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Time_slot not found in body"});
    }

    return next();
};

/*
 * GET /time_slots/:id
 */
module.exports.show = function (req, res, next) {
    var time_slot = orm.model("time_slot");

    time_slot.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (time_slot) {
        if (!time_slot) {
            res.send(404, {"message": "Time_slot not found"});
        }
        else {
            res.send(200, time_slot);
        }
    });

    return next();
};

/*
 * PUT /time_slots/:id
 */
module.exports.update = function (req, res, next) {
    var time_slot = orm.model("time_slot");

    if (req.body && req.body.time_slot) {
        var t = req.body.time_slot;
        if (t.start && t.end) {
            time_slot.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (time_slot) {
                if (!time_slot) {
                    res.send(404, {"message": "Time_slot not found"});
                }
                else {
                    time_slot.start = t.start;
                    time_slot.end = t.end;

                    time_slot.save()
                        .success(function (time_slot) {
                            res.send(200, time_slot);
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Time_slot found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Time_slot not found in body"});
    }

    return next();
};

/*
 * DELETE /time_slots/:id
 */
module.exports.delete = function (req, res, next) {
    var time_slot = orm.model("time_slot");

    time_slot.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (time_slot) {
        if (!time_slot) {
            res.send(404, {"message": "Time_slot not found"});
        }
        else {
            time_slot.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};