const { ReE } = require('../library/response');
var passport = require('passport');
module.exports = function(req, res, next) {
    passport.authenticate('jwt', function(err, user) {
        if (err) throw err;
        if (!user) {
            return ReE(res, 'Unauthorized', 401);
        } else {
            req.user = user;
            return next();
        }
    })(req, res, next)
}