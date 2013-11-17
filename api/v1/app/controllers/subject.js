var orm = require("../../config/models");
var async = require("async");

/*
 * GET /subjects/
 */
module.exports.list = function (req, res, next) {
    var subject = orm.model("subject");

    subject.findAll({}).success(function (subjects) {
        async.map(subjects, handleSubject, function (error, results) {
            res.send(200, {"subjects": results});
        });
    });

    return next();
};

/*
 * POST /subjects/
 */
module.exports.create = function (req, res, next) {
    var subject = orm.model("subject");

    if (req.body && req.body.subject) {
        var s = req.body.subject;
        if (s.label && s.module_id) {
            subject.create(s)
                .success(function (subject) {
                    async.map([subject], handleSubject, function (error, results) {
                        res.send(201, {"subject": results[0]});
                    });

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Subject found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Subject not found in body"});
    }

    return next();
};

/*
 * GET /subjects/:id
 */
module.exports.show = function (req, res, next) {
    var subject = orm.model("subject");

    subject.find({"where": {"id": req.params.id}}).success(function (subject) {
        if (!subject) {
            res.send(404, {"message": "Subject not found"});
        }
        else {
            async.map([subject], handleSubject, function (error, results) {
                res.send(200, {"subject": results[0]});
            });
        }
    });

    return next();
};

/*
 * PUT /subjects/:id
 */
module.exports.update = function (req, res, next) {
    var subject = orm.model("subject");

    if (req.body && req.body.subject) {
        var s = req.body.subject;
        if (s.label && s.module_id) {
            subject.find({"where": {"id": req.params.id}}).success(function (subject) {
                if (!subject) {
                    res.send(404, {"message": "Subject not found"});
                }
                else {
                    subject.label = s.label;
                    subject.module_id = s.module_id;

                    subject.save()
                        .success(function (subject) {
                            async.map([subject], handleSubject, function (error, results) {
                                res.send(200, {"subject": results[0]});
                            });
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Subject found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Subject not found in body"});
    }

    return next();
};

/*
 * DELETE /subjects/:id
 */
module.exports.delete = function (req, res, next) {
    var subject = orm.model("subject");

    subject.find({"where": {"id": req.params.id}}).success(function (subject) {
        if (!subject) {
            res.send(404, {"message": "Subject not found"});
        }
        else {
            subject.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};

/*
 * HELPERS
 */
var handleSubject = function (subject, done) {
    var tmp = subject.values;
    delete tmp.module_id;

    subject.getModule().success(function (module) {

        if (module) {
            tmp.module = module.values;
        }
        else {
            tmp.module = null;
        }
        done(null, tmp);
    });
};