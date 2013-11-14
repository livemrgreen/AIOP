var orm = require("../../config/models");
var async = require("async");

/*
 * GET /users/
 */
module.exports.list = function (req, res, next) {
    var user = orm.model("user");

    // Search for all users in db where deleted is null
    user.findAll({}).success(function (users) {

        // use of async.js to handle asynchronus calls when getting db associations
        async.map(users, handleUser, function (error, results) {
            // when all is done
            res.send(200, {"users": results});
        });
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
                    // We use handleUser to get all associations
                    // little trick to avoid write and write again some code
                    async.map([user], handleUser, function (error, results) {
                        res.send(201, {"user": results[0]});
                    });

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

    user.find({"where": {"id": req.params.id}}).success(function (user) {
        if (!user) {
            res.send(404, {"message": "User not found"});
        }
        else {
            // We use handleUser to get all associations
            // little trick to avoid write and write again some code
            async.map([user], handleUser, function (error, results) {
                res.send(200, {"user": results[0]});
            });
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
            user.find({"where": {"id": req.params.id}}).success(function (user) {
                if (!user) {
                    res.send(404, {"message": "User not found"});
                }
                else {
                    user.username = u.username;
                    user.password = user.encryptPassword(u.password);
                    user.person_id = u.person_id;

                    user.save()
                        .success(function (user) {
                            // We use handleUser to get all associations
                            // little trick to avoid write and write again some code
                            async.map([user], handleUser, function (error, results) {
                                res.send(200, {"user": results[0]});
                            });
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

    user.find({"where": {"id": req.params.id}}).success(function (user) {
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
        // We use handleUser to get all associations
        // little trick to avoid write and write again some code
        async.map([user], handleUser, function (error, results) {
            res.send(200, {"access_token": user.access_token, "user": results[0]});
        });
    });

    return next();
};

/*
 * HELPERS
 */
var handleUser = function (user, done) {
    // get the user in a tmp var
    // to deal just with main properties
    var tmp = user.values;

    // delete sensible ones
    delete tmp.password;
    delete tmp.salt;
    delete tmp.access_token;
    delete tmp.teacher_id;

    // now the teacher
    user.getTeacher().success(function (teacher) {

        // if there is a teacher
        if (teacher) {
            tmp.teacher = teacher.values;
            done(null, tmp);
        }
        else {
            done(null);
        }
    });

};