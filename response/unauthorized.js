const {
    request,
    response
} = require('express');

async function unauthorized(error, req, res) {
    let _error = {
        ...error || {},
        message: error.message
    }
    console.log(_error);
    res.status.send(_error);
}

module.exports.unauthorized = unauthorized;