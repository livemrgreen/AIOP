/*
 * Require section
 * for everything we need
 */
var restify = require("restify");
var passport = require("passport");
var database = require("./config/config").database;
var auth = require("./config/authorization");

/*
 * Main params
 * to run the serv and initialize
 * some important things
 */
restify.CORS.ALLOW_HEADERS.push('x-requested-with');

var server = restify.createServer({});
server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser({ mapParams: false }));
server.use(passport.initialize());

var orm = require("./config/models");
orm.setup(database.name, database.user, database.pass, {
    "host": database.host,
    "port": database.port
});
orm.sequelize().sync();

require("./config/passport")(passport);
require("./config/routes")(server, passport, auth);

/*
 * Gogo bitch
 */
server.listen(8080);
module.exports = server;