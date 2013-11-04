/*
 * Require section
 * for everything we need
 */
var restify = require("restify");
var passport = require("passport");
var database = require("./config/config").database;

/*
 * Main params
 * to run the serv and initialize
 * some important things
 */

var server = restify.createServer({});
require('se7ensky-restify-preflight')(server); // CORS qui marchent ..
server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.queryParser({"mapParams": false }));
server.use(restify.bodyParser({"mapParams": false }));
server.use(passport.initialize());

var orm = require("./config/models");
orm.setup(database.name, database.user, database.pass, {
    "host": database.host,
    "port": database.port
});
orm.sequelize().sync().success(orm.dbCompositeIndex);

require("./config/passport")(passport);
require("./config/routes")(server, passport, require("./config/authorization"));

/*
 * Gogo bitch
 */
server.listen(8080);
module.exports = server;