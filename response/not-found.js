const {
    request,
    response
} = require('express');

async function notFound(error, req, res) {
    let _error = {
        ...error || {},
        message: error.message || 'Not Found'
    }
    console.log(_error);
    res.status(404).send(_error);
}

module.exports.notFound = notFound;