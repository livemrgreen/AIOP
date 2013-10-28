module.exports = function (server, passport, auth) {
    /*
     * User"s routes
     * (used for signup/signin)
     */
    var user = require("../app/controllers/user");

    server.get("/users/", passport.authenticate('bearer', { session: false }), user.list);
    server.post("/users/", passport.authenticate('bearer', { session: false }), user.create);

    server.get("/users/:id", passport.authenticate('bearer', { session: false }), user.show);
    server.put("/users/:id", passport.authenticate('bearer', { session: false }), user.update);
    server.del("/users/:id", passport.authenticate('bearer', { session: false }), user.delete);

    server.post("/signin", passport.authenticate('local', { session: false }), user.signin);
};