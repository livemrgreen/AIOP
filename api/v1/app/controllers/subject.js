var orm = require("../../config/models");

/*
 * GET /subjects/
 */
module.exports.list = function (req, res, next) {
    var subject = orm.model("subject");
	
    subject.findAll()
        .success(function (subjects) {
            res.send(200, subjects);
        });

    return next();
};

/*
 * POST /subjects/
 */
module.exports.create = function (req, res, next) {
    var subject = orm.model("subject");
	
	if (req.body && req.body.subject) {
		subject.findOrCreate()
			.success(function (subject, created) {
				if (created) {
					res.send(201, {});
				}
				else {
					res.send(409, {});
				}
			})
			.error(function (error) {
				res.send(400, error);
			});
	}
    else {
        res.send(400, {});
    }
	
    return next();
};

/*
 * GET /subjects/:id
 */
module.exports.show = function (req, res, next) {
    var subject = orm.model("subject");

    subject.find({"where": {"id": req.params.id}})
        .success(function (subject) {
            if (subject == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
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
        subject.find({"where": {"id": req.params.id}})
            .success(function (subject) {
                if (subject == null) {
                    res.send(404, {});
                }
                else {
                    subject.save()
                        .success(function () {
                            res.send(200, {});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
    }
    else {
        res.send(400, {});
    }

    return next();
};

/*
 * DELETE /subjects/:id
 */
module.exports.delete = function (req, res, next) {
    var subject = orm.model("subject");
	
    subject.find({"where": {"id": req.params.id}})
        .success(function (subject) {
            if (subject == null) {
                res.send(404, {});
            }
            else {
                subject.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};