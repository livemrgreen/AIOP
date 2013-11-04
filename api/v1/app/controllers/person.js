var orm = require("../../config/models");

/*
 * GET /persons/
 */
module.exports.list = function (req, res, next) {
    var person = orm.model("person");

    person.findAll({"where": {"deleted_at": null}}).success(function (persons) {
        res.send(200, {"persons": persons});
    });

    return next();
};

/*
 * POST /persons/
 */
module.exports.create = function (req, res, next) {
    var person = orm.model("person");

    if (req.body && req.body.person) {
        var p = req.body.person;
        if (p.first_name && p.last_name) {
            person.create(p)
                .success(function (person) {
                    res.send(201, {"person": person});

                })
                .error(function (error) {
                    res.send(400, error);
                });
        }
        else {
            res.send(400, {"message": "Person found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Person not found in body"});
    }

    return next();
};

/*
 * GET /persons/:id
 */
module.exports.show = function (req, res, next) {
    var person = orm.model("person");

    person.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (person) {
        if (!person) {
            res.send(404, {"message": "Person not found"});
        }
        else {
            res.send(200, {"person": person});
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
        var p = req.body.person;
        if (p.first_name && p.last_name) {
            person.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (person) {
                if (!person) {
                    res.send(404, {"message": "Person not found"});
                }
                else {
                    person.first_name = p.first_name;
                    person.last_name = p.last_name;

                    person.save()
                        .success(function (person) {
                            res.send(200, {"person": person});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Person found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Person not found in body"});
    }

    return next();
};

/*
 * DELETE /persons/:id
 */
module.exports.delete = function (req, res, next) {
    var person = orm.model("person");

    person.find({"where": {"id": req.params.id, "deleted_at": null}}).success(function (person) {
        if (!person) {
            res.send(404, {"message": "Person not found"});
        }
        else {
            person.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};