const {
    request,
    response
} = require('express');

async function forbidden(error, req, res) {
    let _error = {
        ...error || {},
        message: error && error.message || 'Forbidden',
    }
    console.log(error);
    res.status(403).send(_error);
};

module.exports.forbidden = forbidden;