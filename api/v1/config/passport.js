var LocalStrategy = require("passport-local").Strategy;
var BearerStrategy = require("passport-http-bearer").Strategy;
var models = require("./models");
var user = models.model("user");

module.exports = function (passport) {
    passport.use(new LocalStrategy({"usernameField": "username", "passwordField": "password" },
        function (username, password, done) {
            user.find({ "where": {"username": username, "deleted_at": null} })
                .success(function (user) {
                    if (user == null) {
                        return done(null, false, {"message": "User not found"})
                    }

                    if (!user.authenticate(password)) {
                        return done(null, false, {"message": "Invalid credentials"});
                    }

                    return done(null, user);
                });
        }
    ));

    passport.use(new BearerStrategy(
        function (token, done) {
            user.find({"where": {"access_token": token, "deleted_at": null}})
                .success(function (user) {
                    if (user == null) {
                        return done(null, false, {"message": "User not found"})
                    }
                    return done(null, user, { scope: "all" });
                });
        }
    ));
};