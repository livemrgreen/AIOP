var orm = require('../../config/models');

/*module.exports.hello = function (request, response){
 //Getting the Hello model from the orm.
 var Hello = orm.model('Hello');
 //Doing complex stuff like getting entries from a many-to-many relationship...
 Hello.find(1).success(function (hello){
 hello.getWorlds().success(function (worlds) {
 response.send(worlds)
 });
 });
 }*/

module.exports.list = function (req, res, next) {
    var user = orm.model('user');

    user.findAll({})
        .success(function (users) {
            res.send(200, users);
        })
        .error(function (error) {
            res.send(500, error);
        })

    return next();
};

module.exports.create = function (req, res, next) {
    var user = orm.model('user');

    user.findOrCreate({"username": req.body.username}, {"password": req.body.password})
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
    var user = orm.model('user');

    user.find(req.params.id)
        .success(function (user) {
            if (user == null) {
                res.send(404, {"message": "User was not found"});
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
    return next();
};