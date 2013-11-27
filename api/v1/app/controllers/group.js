var orm = require("../../config/models");
var async = require("async");
var reservation_ctrl = require("./reservation");
var teaching_ctrl = require("./teaching");

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
 * GET /groups/:id/available_teachings
 */
module.exports.available_teachings = function (req, res, next) {
    var group = orm.model("group");

    group.find({"where": {"id": req.params.id}}).success(function (group) {
        if (!group) {
            res.send(404, {"message": "Group not found"});
        }
        else {
            group.getTeachings({
                "where": ["reservation.id IS NULL"],
                "include": [orm.model("group"), orm.model("teacher"), orm.model("lesson"), orm.model("reservation")]})
                .success(function (teachings) {
                    async.map(teachings, teaching_ctrl.handleLesson, function (error, results) {
                        res.send(200, {"teachings": results});
                    });
                });
        }
    });

    return next();
};

/*
 * GET /groups/:id/reservations
 */
module.exports.reservations = function (req, res, next) {
    var group = orm.model("group");

    group.find({"where": {"id": req.params.id}}).success(function (group) {
        if (!group) {
            res.send(404, {"message": "Group not found"});
        }
        else {
            // 1. get the parent and the children of the group
            // 2. create an array with all the id-group found before
            // 3. get all the reservations of the teachings about this id
            async.waterfall(
                [
                    // 1. Get the parent/children in parallel
                    function (done) {
                        async.parallel(
                            {
                                "parent": function (done) {
                                    group.getParent().success(function (parent) {
                                        if (parent) {
                                            done(null, parent.id);
                                        }
                                        else {
                                            done(null, null)
                                        }
                                    });
                                },
                                "children": function (done) {
                                    group.getChildren().success(function (children) {
                                        if (children) {
                                            async.map(
                                                children,
                                                function (child, done) {
                                                    done(null, child.id)
                                                },
                                                function (error, results) {
                                                    done(null, results);
                                                }
                                            );
                                        }
                                        else {
                                            done(null, null)
                                        }
                                    });
                                }
                            },
                            // 2. Create an array with all the id
                            function (err, results) {
                                var tmp = [];
                                tmp.push(group.id);
                                tmp.push(results.parent);
                                tmp.concat(results.children);
                                done(null, tmp.filter(function (n) {
                                    return n;
                                }));
                            });
                    },
                    // 3. For the id, get the teachings and the reservations related
                    function (arg1, done) {
                        var reservation = orm.model("reservation");
                        reservation.findAll({
                            "where": {"teaching.group_id": arg1},
                            "include": [orm.model("teaching"), {"model": orm.model("time_slot"), "as": "slot"}, orm.model("room")]})
                            .success(function (reservations) {
                                async.map(reservations, reservation_ctrl.handleReservation, function (error, results) {
                                    done(null, results);
                                });
                            });
                    }
                ],
                function (error, results) {
                    res.send(200, {"reservations": results});
                }
            );
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

/*
 *
 */
/*
 var handleTree = function (group) {
 return handleTreeR(group, true, true, []);
 };

 var handleTreeR = function (group, asc, desc, arr) {
 arr.push(group.id);

 if (asc) {
 group.getParent().success(function (parent) {
 if (parent) {
 arr = handleTreeR(parent, true, false, arr);
 }
 });
 }

 if (desc) {
 group.getChildren().success(function (children) {
 if (children) {
 children.forEach(function (child) {
 arr = handleTreeR(child, false, true, arr);
 })
 }
 });
 }

 return arr;
 };*/
