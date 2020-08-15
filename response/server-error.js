const {
    request,
    response
} = require('express');

async function serverError(error, req, res) {
    let _error = {
        ..._error || {},
        message: error.message
    }
    console.log(_error);
    res.status.send(_error);
}

module.exports.serverError = serverError;