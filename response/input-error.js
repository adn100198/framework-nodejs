const {
    request,
    response
} = require('express')

async function inputError(error, req, res) {
    let _error = {
        ...error || {},
        message: error && error.message || 'Bad request'
    }
    res.status(400).send(_error);
}

module.exports.inputError = inputError;