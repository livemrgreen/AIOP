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

    "isMyTeacherModuleManager": function (req, res, next) {
        req.user.getTeacher().success(function (teacher) {
            if (teacher) {
                if (teacher.id == req.params.id) {
                    teacher.getModules().success(function (modules) {
                        if (modules.length) {
                            return next();
                        }
                        else {
                            res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_manager\", error_description=\"Manager not found\"");
                            res.send(401);
                        }
                    });
                }
                else {
                    res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_teacher\", error_description=\"Teachers differents\"");
                    res.send(401);
                }
            }
            else {
                res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_teacher\", error_description=\"Teacher not found\"");
                res.send(401);
            }
        });
    },

    "isMyUser": function (req, res, next) {
        if (req.params.id != req.user.id) {
            res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_user\", error_description=\"Users differents\"");
            res.send(401);
        }
        return next();
    },

    "isMyTeacher": function (req, res, next) {
        req.user.getTeacher().success(function (teacher) {
            if (teacher) {
                if (teacher.id == req.params.id) {
                    return next();
                }
                else {
                    res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_teacher\", error_description=\"Teachers differents\"");
                    res.send(401);
                }
            }
            else {
                res.setHeader("WWW-Authenticate", "Bearer realm=\"Users\", error=\"invalid_teacher\", error_description=\"Teacher not found\"");
                res.send(401);
            }
        });
    }
}
;