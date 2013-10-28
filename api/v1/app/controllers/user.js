var orm = require("../../config/models");
var jwt = require('jwt-simple');

module.exports.list = function (req, res, next) {
    var user = orm.model("user");

    user.findAll({"attributes": ['id', 'username']})
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
    var tmp = user.build({"username": req.body.username, "password": req.body.password});
    tmp.salt = tmp.makeSalt();
    tmp.password = tmp.encryptPassword(tmp.password);

    user.findOrCreate({"username": tmp.username}, {"password": tmp.password, "salt": tmp.salt})
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

module.exports.update = function (req, res, next) {
    return next();
};

module.exports.delete = function (req, res, next) {
    return next();
};


module.exports.signin = function (req, res, next) {
    var user = req.user;
    var token = jwt.encode(user.username + new Date().valueOf(), user.salt);

    // Generate the token based on the signin date and save it
    user.access_token = token;
    user.save();

    res.send(200, {"access_token": token});
    return next();
};