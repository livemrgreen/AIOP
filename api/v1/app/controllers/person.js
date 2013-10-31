var orm = require("../../config/models");

/*
 * GET /persons/
 */
module.exports.list = function (req, res, next) {
    var person = orm.model("person");
	
    person.findAll()
        .success(function (persons) {
            res.send(200, persons);
        });

    return next();
};

/*
 * POST /persons/
 */
module.exports.create = function (req, res, next) {
    var person = orm.model("person");
	
	if (req.body && req.body.person) {
		person.findOrCreate()
			.success(function (person, created) {
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
 * GET /persons/:id
 */
module.exports.show = function (req, res, next) {
    var person = orm.model("person");

    person.find({"where": {"id": req.params.id}})
        .success(function (person) {
            if (person == null) {
                res.send(404, {});
            }
            else {
                res.send(200, {});
            }
        });

    return next();
};

/*
 * PUT /persons/:id
 */
module.exports.update = function (req, res, next) {
    var person = orm.model("person");

    if (req.body && req.body.person) {
        person.find({"where": {"id": req.params.id}})
            .success(function (person) {
                if (person == null) {
                    res.send(404, {});
                }
                else {
                    person.save()
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
 * DELETE /persons/:id
 */
module.exports.delete = function (req, res, next) {
    var person = orm.model("person");
	
    person.find({"where": {"id": req.params.id}})
        .success(function (person) {
            if (person == null) {
                res.send(404, {});
            }
            else {
                person.destroy()
                    .success(function () {
                        res.send(204);
                    });
            }
        });

    return next();
};