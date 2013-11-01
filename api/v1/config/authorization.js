var models = require("./models");
var user = models.model("user");

module.exports = {

    "isAdministrator": function (req, res, next) {
        req.user.getPerson().success(function (person) {
            if (person) {
                person.getTeacher().success(function (teacher) {
                    if (teacher) {
                        teacher.getAdministrator().success(function (administrator) {
                            if (!administrator) {
                                res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_manager\", error_description=\"Manager not found\"");
                                res.send(401);
                            }
                            return next();
                        });
                    }
                    else {
                        res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_teacher\", error_description=\"Teacher not found\"");
                        res.send(401);
                    }
                });
            }
            else {
                res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_person\", error_description=\"Person not found\"");
                res.send(401);
            }

        });
    },

    "isModuleManager": function (req, res, next) {
        req.user.getPerson().success(function (person) {
            if (person) {
                person.getTeacher().success(function (teacher) {
                    if (teacher) {
                        teacher.getManager().success(function (manager) {
                            if (!manager) {
                                res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_manager\", error_description=\"Manager not found\"");
                                res.send(401);
                            }
                            return next();
                        });
                    }
                    else {
                        res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_teacher\", error_description=\"Teacher not found\"");
                        res.send(401);
                    }
                });
            }
            else {
                res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_person\", error_description=\"Person not found\"");
                res.send(401);
            }

        });
    },

    "isMe": function (req, res, next) {
        if (req.params.id != req.user.id) {
            res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_user\", error_description=\"Users different\"");
            res.send(401);
        }
        return next();
    }
};