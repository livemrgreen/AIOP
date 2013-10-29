/*
 * User's auth
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        if (req.params.id != req.user.id) {
            res.send(401, {"message": "User not authorized"});
        }
        return next();
    }
};