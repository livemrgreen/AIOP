exports.user = {
    isAdministrator: function (req, res, next) {
        if(!req.user.getPerson.getTeacher.getAdministrator) {
            res.send(401, {"message": "User not authorized"});
        }
        return next();
    },
    isManager: function (req, res, next) {
        if(!req.user.getPerson.getTeacher.getManager) {
            res.send(401, {"message": "User not authorized"});
        }
        return next();
    },
    hasAuthorization: function (req, res, next) {
        if (req.params.id != req.user.id) {
            res.send(401, {"message": "User not authorized"});
        }
        return next();
    }
};