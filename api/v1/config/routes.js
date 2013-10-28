module.exports = function (server, passport, auth) {
    /*
     * User's routes
     * (used for signup/signin)
     */
    var user = require('../app/controllers/user');

    server.get('/users/', user.list);
    server.post('/users/', user.create);

    server.get('/users/:id', user.show);
    server.put('/users/:id', user.update);
    server.del('/users/:id', user.delete);

    server.post('/signin', user.signin);
};