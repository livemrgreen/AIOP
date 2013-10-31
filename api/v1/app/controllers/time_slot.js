var orm = require("../../config/models");

/*
 * GET /time_slots/
 */
module.exports.list = function (req, res, next) {
    var time_slot = orm.model("time_slot");
	
    time_slot.findAll()
        .success(function (time_slots) {
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
		time_slot.findOrCreate()
			.success(function (time_slot, created) {
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
 * GET /time_slots/:id
 */
module.exports.show = function (req, res, next) {
    var time_slot = orm.model("time_slot");

    time_slot.find({"where": {"id": req.params.id}})
        .success(function (time_slot) {
            if (time_slot == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
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
        time_slot.find({"where": {"id": req.params.id}})
            .success(function (time_slot) {
                if (time_slot == null) {
                    res.send(404, {});
                }
                else {
                    time_slot.save()
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
 * DELETE /time_slots/:id
 */
module.exports.delete = function (req, res, next) {
    var time_slot = orm.model("time_slot");
	
    time_slot.find({"where": {"id": req.params.id}})
        .success(function (time_slot) {
            if (time_slot == null) {
                res.send(404, {});
            }
            else {
                time_slot.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};