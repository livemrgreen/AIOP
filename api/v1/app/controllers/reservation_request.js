var orm = require("../../config/models");
var async = require("async");
/*
 * GET /reservation_requests/
 */
module.exports.list = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    reservation_request.findAll({}).success(function (reservation_requests) {
        res.send(200, {"reservation_requests": reservation_requests});
    });

    return next();
};

/*
 * POST /reservation_requests/
 */
module.exports.create = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    if (req.body && req.body.reservation_request) {
        var r = req.body.reservation_request;
        if (r.date && r.capacity && r.time_slot_id && r.teaching_id && r.characteristics) {
            async.map(r.characteristics, handleCharacteristic, function (err, results) {

                delete r.characteristics;
                reservation_request.create(r)
                    .success(function (reservation_request) {
                        reservation_request.setCharacteristics(results).success(function (characteristics) {
                            res.send(201, {"reservation_request": reservation_request});
                        })
                            .error(function (error) {
                                res.send(400, error);
                            });
                    })
                    .error(function (error) {
                        res.send(400, error);
                    });
            });
            var charac = JSON.parse(JSON.stringify(r.characteristics));

        }
        else {
            res.send(400, {"message": "Reservation_request found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Reservation_request not found in body"});
    }

    return next();
};

/*
 * GET /reservation_requests/:id
 */
module.exports.show = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    reservation_request.find({"where": {"id": req.params.id}}).success(function (reservation_request) {
        if (!reservation_request) {
            res.send(404, {"message": "Reservation_request not found"});
        }
        else {
            res.send(200, {"reservation_request": reservation_request});
        }
    });

    return next();
};

/*
 * PUT /reservation_requests/:id
 */
module.exports.update = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    if (req.body && req.body.reservation_request) {
        var r = req.body.reservation_request;
        if (r.date && r.time_slot_id && r.teaching_id) {
            reservation_request.find({"where": {"id": req.params.id}}).success(function (reservation_request) {
                if (!reservation_request) {
                    res.send(404, {"message": "Reservation_request not found"});
                }
                else {
                    reservation_request.date = r.date;
                    reservation_request.time_slot_id = r.time_slot_id;
                    reservation_request.teaching_id = r.teaching_id;

                    reservation_request.save()
                        .success(function (reservation_request) {
                            res.send(200, {"reservation_request": reservation_request});
                        })
                        .error(function (error) {
                            res.send(400, error);
                        });
                }
            });
        }
        else {
            res.send(400, {"message": "Reservation_request found with missing params"});
        }
    }
    else {
        res.send(400, {"message": "Reservation_request not found in body"});
    }

    return next();
};

/*
 * DELETE /reservation_requests/:id
 */
module.exports.delete = function (req, res, next) {
    var reservation_request = orm.model("reservation_request");

    reservation_request.find({"where": {"id": req.params.id}}).success(function (reservation_request) {
        if (!reservation_request) {
            res.send(404, {"message": "Reservation_request not found"});
        }
        else {
            reservation_request.destroy().success(function () {
                res.send(204);
            });
        }
    });

    return next();
};

var handleCharacteristic = function (charac, done) {
    var characteristic = orm.model("characteristic");
    characteristic.find(charac.id).success(function (charac) {
        done(null, charac);
    });
};

module.exports.rooms_available = function (req, res, next) {
    var reserv_request = orm.model("reservation_request");
    reserv_request.find({"where" : {"id" : req.params.id},
        include :[
            orm.model("characteristic"),
            {model : orm.model("time_slot"), as : "slot"}
        ]}).success(function(reservation_request){
            var room = orm.model("room");
            room.find(
                {
                    "where" : [{"capacity" : {"gte" : reserv_request.capacity },
                        "slot.start" : reservation_request.slot.start ,
                        "slot.end" : reservation_request.slot.end},
                        "reservation.id IS NULL"],
                    include : [orm.model("reservation")]
                }).success(function(room_available){
                    res.send(200,{room_available :room_available} );
                });
        });


    return next();

};