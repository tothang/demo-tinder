const { to } = require('await-to-js');
const pe = require('parse-error');
const APIError = require('./../error/APIError');

module.exports.to = async (promise) => {
    const [err, res] = await to(promise);
    if (err) {
        throw new APIError({
            status: 500,
            message: pe(err),
        });
    }
    return res;
};

module.exports.ReE = (res, err, code) => {
    let msgErr = err;
    if (typeof err === 'object' && typeof err.message !== 'undefined') {
        msgErr = err.message;
    }
    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json({ success: false, message: msgErr });
};

module.exports.ReS = (res, data, code) => {
    if (typeof code !== 'undefined') res.statusCode = code;
    return res.json({
        success: true,
        data,
    });
};