var orm = require("../../config/models");

/*
 * GET /groups/
 */
module.exports.list = function (req, res, next) {
    var group = orm.model("group");

    group.findAll({}).success(function (groups) {
        res.send(200, {"groups": groups});
    });

    return next();
};

/*
 * POST /groups/
 */
module.exports.create = function (req, res, next) {
    var group = orm.model("group");

    if (req.body && req.body.group) {
        var g = req.body.group;
        if (g.label && g.parent_id) {
            group.create(g)
                .success(function (group) {
                    res.send(201, {"group": group});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Group found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Group not found in body"});
    }

    return next();
};

/*
 * GET /groups/:id
 */
module.exports.show = function (req, res, next) {
    var group = orm.model("group");

    group.find({"where": {"id": req.params.id}}).success(function (group) {
        if (!group) {
            res.send(404, {"message": "Group not found"});
        }
        else {
            res.send(200, {"group": group});
        }
    });

    return next();
};

/*
 * PUT /groups/:id
 */
module.exports.update = function (req, res, next) {
    var group = orm.model("group");

    if (req.body && req.body.group) {
        var g = req.body.group;
        if (g.label && g.parent_id) {
            group.find({"where": {"id": req.params.id}}).success(function (group) {
                if (!group) {
                    res.send(404, {"message": "Group not found"});
                }
                else {
                    group.label = g.label;
                    group.parent_id = g.parent_id;

                    group.save()
                        .success(function (group) {
                            res.send(200, {"group": group});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Group found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Group not found in body"});
    }

    return next();
};

/*
 * DELETE /groups/:id
 */
module.exports.delete = function (req, res, next) {
    var group = orm.model("group");

    group.find({"where": {"id": req.params.id}}).success(function (group) {
        if (!group) {
            res.send(404, {"message": "Group not found"});
        }
        else {
            group.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};