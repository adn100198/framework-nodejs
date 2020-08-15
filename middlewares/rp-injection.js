const {
    forbidden
} = require('../response/forbidden');

const {
    inputError
} = require('../response/input-error');

const {
    notFound
} = require('../response/not-found');

const {
    serverError
} = require('../response/server-error');

const {
    unauthorized
} = require('../response/unauthorized');

function RpInjectionMiddleware(req, res, next) {
    try {
        res.forbidden = async (error) => {
            forbidden(error, req, res);
        };
        res.inputError = async (error) => {
            inputError(error, req, res);
        };
        res.notFound = async (error) => {
            notFound(error, req, res);
        };
        res.serverError = async (error) => {
            serverError(error, req, res);
        };
        res.unauthorized = async (error) => {
            unauthorized(error, req, res);
        }
    } catch (error) {

    }
    next();
}

module.exports.RpInjectionMiddleware = RpInjectionMiddleware;