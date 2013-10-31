module.exports = function (server, passport, auth) {

    var administrator = require("../app/controllers/administrator");
    server.get("/administrators", passport.authenticate("bearer", { session: false }), administrator.list);

    var building = require("../app/controllers/building");
    server.get("/buildings", passport.authenticate("bearer", { session: false }), building.list);

    var caracteristic = require("../app/controllers/caracteristic");
    server.get("/caracteristics", passport.authenticate("bearer", { session: false }), caracteristic.list);

    var group = require("../app/controllers/group");
    server.get("/groups", passport.authenticate("bearer", { session: false }), group.list);

    var lesson = require("../app/controllers/lesson");
    server.get("/lessons", passport.authenticate("bearer", { session: false }), lesson.list);

    var lesson_type = require("../app/controllers/lesson_type");
    server.get("/lesson_types", passport.authenticate("bearer", { session: false }), lesson_type.list);

    var module = require("../app/controllers/module");
    server.get("/modules", passport.authenticate("bearer", { session: false }), module.list);

    var module_namanger = require("../app/controllers/module_namanger");
    server.get("/module_namangers", passport.authenticate("bearer", { session: false }), module_namanger.list);

    var person = require("../app/controllers/person");
    server.get("/persons", passport.authenticate("bearer", { session: false }), person.list);

    var reservation = require("../app/controllers/reservation");
    server.get("/reservations", passport.authenticate("bearer", { session: false }), reservation.list);

    var reservation_request = require("../app/controllers/reservation_request");
    server.get("/reservation_requests", passport.authenticate("bearer", { session: false }), reservation_request.list);

    var room = require("../app/controllers/room");
    server.get("/rooms", passport.authenticate("bearer", { session: false }), room.list);

    var subject = require("../app/controllers/subject");
    server.get("/subjects", passport.authenticate("bearer", { session: false }), subject.list);

    var teacher = require("../app/controllers/teacher");
    server.get("/teachers", passport.authenticate("bearer", { session: false }), teacher.list);

    var teaching = require("../app/controllers/teaching");
    server.get("/teachings", passport.authenticate("bearer", { session: false }), teaching.list);

    var time_slot = require("../app/controllers/time_slot");
    server.get("/time_slots", passport.authenticate("bearer", { session: false }), time_slot.list);

    var user = require("../app/controllers/user");
    server.get("/users", passport.authenticate("bearer", { session: false }), user.list);
    server.post("/users", passport.authenticate("bearer", { session: false }), auth.user.isAdministrator, user.create);
    server.get("/users/:id", passport.authenticate("bearer", { session: false }), user.show);
    server.put("/users/:id", passport.authenticate("bearer", { session: false }), auth.user.hasAuthorization, user.update);
    server.del("/users/:id", passport.authenticate("bearer", { session: false }), auth.user.hasAuthorization, user.delete);
    server.post("/signin", passport.authenticate("local", { session: false }), user.signin);
};