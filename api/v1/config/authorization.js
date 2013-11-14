var models = require("./models");
var user = models.model("user");

module.exports = {

    "isAdministrator": function (req, res, next) {
        if (req.user.administrator) {
            return next();
        }
        else {
            res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_administrator\", error_description=\"Administrator not found\"");
            res.send(401);
        }
    },

    "isMe": function (req, res, next) {
        if (req.params.id != req.user.id) {
            res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_user\", error_description=\"Users different\"");
            res.send(401);
        }
        return next();
    }
};