var orm = require("../../config/models");

/*
 * GET /administrators/
 */
module.exports.list = function (req, res, next) {
    var administrator = orm.model("administrator");

    administrator.findAll({"where": {"deleted_at": null}})
        .success(function (administrators) {
            var tmp = [];
            administrators.forEach(function (administrator) {
                tmp.push(administrator.getTeacher.getPerson);
            })
            res.send(200, tmp);
        });

    return next();
};