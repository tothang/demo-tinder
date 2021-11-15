const httpStatus = require('http-status');
const APIError = require('../library/error/APIError');
const { env } = require('../config/index');
const { ReE } = require('../library/response/index');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack,
    };

    if (env !== 'development') {
        delete response.stack;
    }
    return ReE(res, response, err.status);
};
exports.handler = handler;

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res) => {
    const err = new APIError({
        message: 'Not found',
        status: httpStatus.NOT_FOUND,
    });
    return handler(err, req, res);
};