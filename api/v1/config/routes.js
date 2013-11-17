module.exports = function (server, passport, auth) {

    var building = require("../app/controllers/building");
    server.get("/buildings", passport.authenticate("bearer", { session: false }), building.list);
    server.post("/buildings", passport.authenticate("bearer", { session: false }), auth.isAdministrator, building.create);
    server.get("/buildings/:id", passport.authenticate("bearer", { session: false }), building.show);
    server.put("/buildings/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, building.update);
    server.del("/buildings/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, building.delete);

    var caracteristic = require("../app/controllers/caracteristic");
    server.get("/caracteristics", passport.authenticate("bearer", { session: false }), caracteristic.list);
    server.post("/caracteristics", passport.authenticate("bearer", { session: false }), auth.isAdministrator, caracteristic.create);
    server.get("/caracteristics/:id", passport.authenticate("bearer", { session: false }), caracteristic.show);
    server.put("/caracteristics/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, caracteristic.update);
    server.del("/caracteristics/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, caracteristic.delete);

    var group = require("../app/controllers/group");
    server.get("/groups", passport.authenticate("bearer", { session: false }), group.list);
    server.post("/groups", passport.authenticate("bearer", { session: false }), auth.isAdministrator, group.create);
    server.get("/groups/:id", passport.authenticate("bearer", { session: false }), group.show);
    server.put("/groups/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, group.update);
    server.del("/groups/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, group.delete);

    var lesson = require("../app/controllers/lesson");
    server.get("/lessons", passport.authenticate("bearer", { session: false }), lesson.list);
    server.post("/lessons", passport.authenticate("bearer", { session: false }), lesson.create);
    server.get("/lessons/:id", passport.authenticate("bearer", { session: false }), lesson.show);
    server.put("/lessons/:id", passport.authenticate("bearer", { session: false }), lesson.update);
    server.del("/lessons/:id", passport.authenticate("bearer", { session: false }), lesson.delete);

    var lesson_type = require("../app/controllers/lesson_type");
    server.get("/lesson_types", passport.authenticate("bearer", { session: false }), lesson_type.list);
    server.post("/lesson_types", passport.authenticate("bearer", { session: false }), auth.isAdministrator, lesson_type.create);
    server.get("/lesson_types/:id", passport.authenticate("bearer", { session: false }), lesson_type.show);
    server.put("/lesson_types/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, lesson_type.update);
    server.del("/lesson_types/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, lesson_type.delete);

    var module = require("../app/controllers/module");
    server.get("/modules", passport.authenticate("bearer", { session: false }), module.list);
    server.post("/modules", passport.authenticate("bearer", { session: false }), auth.isAdministrator, module.create);
    server.get("/modules/:id", passport.authenticate("bearer", { session: false }), module.show);
    server.put("/modules/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, module.update);
    server.del("/modules/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, module.delete);

    var reservation = require("../app/controllers/reservation");
    server.get("/reservations", passport.authenticate("bearer", { session: false }), reservation.list);
    server.post("/reservations", passport.authenticate("bearer", { session: false }), reservation.create);
    server.get("/reservations/:id", passport.authenticate("bearer", { session: false }), reservation.show);
    server.put("/reservations/:id", passport.authenticate("bearer", { session: false }), reservation.update);
    server.del("/reservations/:id", passport.authenticate("bearer", { session: false }), reservation.delete);

    var reservation_request = require("../app/controllers/reservation_request");
    server.get("/reservation_requests", passport.authenticate("bearer", { session: false }), reservation_request.list);
    server.post("/reservation_requests", passport.authenticate("bearer", { session: false }), reservation_request.create);
    server.get("/reservation_requests/:id", passport.authenticate("bearer", { session: false }), reservation_request.show);
    server.put("/reservation_requests/:id", passport.authenticate("bearer", { session: false }), reservation_request.update);
    server.del("/reservation_requests/:id", passport.authenticate("bearer", { session: false }), reservation_request.delete);

    var room = require("../app/controllers/room");
    server.get("/rooms", passport.authenticate("bearer", { session: false }), room.list);
    server.post("/rooms", passport.authenticate("bearer", { session: false }), auth.isAdministrator, room.create);
    server.get("/rooms/:id", passport.authenticate("bearer", { session: false }), room.show);
    server.put("/rooms/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, room.update);
    server.del("/rooms/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, room.delete);

    var subject = require("../app/controllers/subject");
    server.get("/subjects", passport.authenticate("bearer", { session: false }), subject.list);
    server.post("/subjects", passport.authenticate("bearer", { session: false }), auth.isAdministrator, subject.create);
    server.get("/subjects/:id", passport.authenticate("bearer", { session: false }), subject.show);
    server.put("/subjects/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, subject.update);
    server.del("/subjects/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, subject.delete);

    var teacher = require("../app/controllers/teacher");
    server.get("/teachers", passport.authenticate("bearer", { session: false }), teacher.list);
    server.post("/teachers", passport.authenticate("bearer", { session: false }), auth.isAdministrator, teacher.create);
    server.get("/teachers/:id", passport.authenticate("bearer", { session: false }), teacher.show);
    server.get("/teachers/:id/reservations", passport.authenticate("bearer", { session: false }), auth.isMeTeacher, teacher.show_reserations);
    server.put("/teachers/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, teacher.update);
    server.del("/teachers/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, teacher.delete);

    var teaching = require("../app/controllers/teaching");
    server.get("/teachings", passport.authenticate("bearer", { session: false }), teaching.list);
    server.post("/teachings", passport.authenticate("bearer", { session: false }), auth.isAdministrator, teaching.create);
    server.get("/teachings/:id", passport.authenticate("bearer", { session: false }), teaching.show);
    server.put("/teachings/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, teaching.update);
    server.del("/teachings/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, teaching.delete);

    var time_slot = require("../app/controllers/time_slot");
    server.get("/time_slots", passport.authenticate("bearer", { session: false }), time_slot.list);
    server.post("/time_slots", passport.authenticate("bearer", { session: false }), auth.isAdministrator, time_slot.create);
    server.get("/time_slots/:id", passport.authenticate("bearer", { session: false }), time_slot.show);
    server.put("/time_slots/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, time_slot.update);
    server.del("/time_slots/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, time_slot.delete);

    var user = require("../app/controllers/user");
    server.get("/users", passport.authenticate("bearer", { session: false }), user.list);
    server.post("/users", passport.authenticate("bearer", { session: false }), auth.isAdministrator, user.create);
    server.get("/users/:id", passport.authenticate("bearer", { session: false }), auth.isMe, user.show);
    server.put("/users/:id", passport.authenticate("bearer", { session: false }), auth.isMe, user.update);
    server.del("/users/:id", passport.authenticate("bearer", { session: false }), auth.isAdministrator, user.delete);
    server.post("/signin", passport.authenticate("local", { session: false }), user.signin);
};