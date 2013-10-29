var orm = require("../../config/models");

/*
 * GET /users/
 */
module.exports.list = function (req, res, next) {
    var user = orm.model("user");

    // Looking for all users
    // return only id an username
    user.findAll({"where": {"deleted_at": null}, "attributes": ["id", "username"]})
        .success(function (users) {
            res.send(200, users);
        });

    return next();
};

/*
 * POST /users/
 */
module.exports.create = function (req, res, next) {
    var user = orm.model("user");

    // Let's generate a tmp user to param some attributes
    var tmp = user.build({"username": req.body.user.username, "password": req.body.user.password});
    tmp.salt = tmp.makeSalt();
    tmp.password = tmp.encryptPassword(tmp.password);
    tmp.access_token = tmp.makeToken();

    // use directly the findOrCreate method
    // if found, error, else the user is created based on tmp's attributes
    user.findOrCreate({"username": tmp.username}, {"password": tmp.password, "salt": tmp.salt, "access_token": tmp.access_token})
        .success(function (user, created) {
            if (created) {
                res.send(201, {"id": user.id, "username": user.username, "access_token": user.access_token});
            }
            else {
                res.send(409, {"message": "Username already exists"});
            }
        })
        .error(function (error) {
            res.send(400, error);
        });

    return next();
};

/*
 * GET /users/:id
 */
module.exports.show = function (req, res, next) {
    var user = orm.model("user");

    // Looking for a specific user id
    user.find({"where": {"id": req.params.id, "deleted_at": null}})
        .success(function (user) {
            if (user == null) {
                res.send(404, {"message": "User not found"});
            }
            else {
                res.send(200, {"id": user.id, "username": user.username});
            }
        });

    return next();
};

/*
 * PUT /users/:id
 */
module.exports.update = function (req, res, next) {
    var user = orm.model("user");

    // Generate a tmp user for param
    var tmp = user.build({"password": req.body.user.password});
    tmp.salt = tmp.makeSalt();
    tmp.password = tmp.encryptPassword(tmp.password);

    // Find the user to update
    user.find({"where": {"id": req.params.id, "deleted_at": null}})
        .success(function (user) {
            if (user == null) {
                res.send(404, {"message": "User not found"});
            }
            else {
                user.salt = tmp.salt;
                user.password = tmp.password;

                user.save(["password", "salt"])
                    .success(function () {
                        res.send(200, {"id": user.id, "username": user.username});
                    })
                    .error(function (error) {
                        res.send(400, error);
                    });
            }
        });

    return next();
};

/*
 * DELETE /users/:id
 */
module.exports.delete = function (req, res, next) {
    var user = orm.model("user");

    // Find the user to delete
    user.find({"where": {"id": req.params.id, "deleted_at": null}})
        .success(function (user) {
            if (user == null) {
                res.send(404, {"message": "User not found"});
            }
            else {
                user.destroy()
                    .success(function () {
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

    // Generate the token based on the signin date and save it
    user.access_token = user.makeToken();
    user.save(["access_token"])
        .success(function () {
            res.send(200, {"access_token": user.access_token});
        });

    return next();
};