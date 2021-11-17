const { ReE } = require('../library/response');
const key = 'keyHereABC';
const time = new Date().valueOf();
module.exports = function(req, res, next) {
    //return `${key}.${time}`;
    let jwt = req.headers.token.split(".");
    if (jwt[0] !== key) return ReE(res, 'Unauthorized', 401);
    return next();
    //return ReE(res, `${key}.${time}`, 401);
}