const { ReE } = require('../library/response');
module.exports = function(req, res, next) {
    console.log(req.query);
    if (req.params.id) return next();
    return ReE(res, 'Unauthorized', 401);
    // passport.authenticate('jwt', function(err, user) {
    //     if (err) throw err;
    //     if (!user) {
    //         return ReE(res, 'Unauthorized', 401);
    //     } else {
    //         req.user = user;
    //         return next();
    //     }
    // })(req, res, next)
    //return true;
}