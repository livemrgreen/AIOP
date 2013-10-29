var orm = require("../../config/models");

module.exports.list = function (req, res, next) {
    var user = orm.model("user");

    // Looking for all users
    // return only id an username
    user.findAll({"attributes": ["id", "username"]})
        .success(function (users) {
            res.send(200, users);
        })
        .error(function (error) {
            res.send(error);
        })

    return next();
};

module.exports.create = function (req, res, next) {
    var user = orm.model("user");

    // Let's generate a tmp user to param some attributes
    var tmp = user.build({"username": req.body.username, "password": req.body.password});
    tmp.salt = tmp.makeSalt();
    tmp.password = tmp.encryptPassword(tmp.password);
    tmp.access_token = tmp.makeToken();

    // use directly the findOrCreate method
    // if found, error, else the user is created based on tmp's attributes
    user.findOrCreate({"username": tmp.username}, {"password": tmp.password, "salt": tmp.salt, "access_token": tmp.access_token})
        .success(function (user, created) {
            if (created) {
                res.send(201, user);
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


module.exports.show = function (req, res, next) {
    var user = orm.model("user");

    // Looking for a specifiq user id
    user.find(req.params.id)
        .success(function (user) {
            if (user == null) {
                res.send(404, {"message": "User not found"});
            }
            else {
                res.send(200, user);
            }
        });

    return next();
};

// @todo
module.exports.update = function (req, res, next) {
    var user = req.user;

    res.send(501);

    return next();
};

// @todo
module.exports.delete = function (req, res, next) {
    var user = req.user;

    res.send(501);

    return next();
};


module.exports.signin = function (req, res, next) {
    var user = req.user;

    // Generate the token based on the signin date and save it
    user.access_token = user.makeToken();
    user.save(["access_token"]);

    res.send(200, {"access_token": user.access_token});
    return next();
};