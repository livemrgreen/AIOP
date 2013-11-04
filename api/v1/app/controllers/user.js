var orm = require("../../config/models");

/*
 * GET /users/
 */
module.exports.list = function (req, res, next) {
    var user = orm.model("user");

    user.findAll({"where": {"deleted_at": null}, "attributes": ["id", "username", "person_id"]}).success(function (users) {
        res.send(200, {"users": users});
    });

    return next();
};

/*
 * POST /users/
 */
module.exports.create = function (req, res, next) {
    var user = orm.model("user");

    if (req.body && req.body.user) {
        var u = req.body.user;
        if (u.username && u.password && u.person_id) {
            var tmp = user.build(u);

            tmp.salt = tmp.makeSalt();
            tmp.password = tmp.encryptPassword(tmp.password);
            tmp.access_token = tmp.makeToken();

            tmp.save()
                .success(function (user) {
                    res.send(201, {"user": {"id": user.id, "username": user.username, "person_id": user.person_id}});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "User found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "User not found in body"});
    }

    return next();
};

/*
 * GET /users/:id
 */
module.exports.show = function (req, res, next) {
    var user = orm.model("user");

    user.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (user) {
        if (!user) {
            res.send(404, {"message": "User not found"});
        }
        else {
            res.send(200, {"user": {"id": user.id, "username": user.username, "person_id": user.person_id}});
        }
    });

    return next();
};

/*
 * PUT /users/:id
 */
module.exports.update = function (req, res, next) {
    var user = orm.model("user");

    if (req.body && req.body.user) {
        var u = req.body.user;
        if (u.username && u.password && u.person_id) {
            user.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (user) {
                if (!user) {
                    res.send(404, {"message": "User not found"});
                }
                else {
                    user.username = u.username;
                    user.password = user.encryptPassword(u.password);
                    user.person_id = u.person_id;

                    user.save()
                        .success(function (user) {
                            res.send(200, {"user": {"id": user.id, "username": user.username, "person_id": user.person_id}});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "User found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "User not found in body"});
    }

    return next();
};

/*
 * DELETE /users/:id
 */
module.exports.delete = function (req, res, next) {
    var user = orm.model("user");

    user.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (user) {
        if (!user) {
            res.send(404, {"message": "User not found"});
        }
        else {
            user.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};

/*
 * POST /signin
 */
module.exports.signin = function (req, res, next) {
    var user = req.user;

    user.access_token = user.makeToken();
    user.save(["access_token"]).success(function () {
        res.send(200, {"access_token": user.access_token});
    });

    return next();
};