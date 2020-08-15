const jwt = require('jsonwebtoken');


/**
 * A middle ware that checking permission in payload of jwt
 * @param _permissions {String | Array} `string` or `array` permissions required by route 
 */

function checkPermission(value, permissions) {
    if (value.includes(permissions)) return true;
    return false;
}

module.exports = (permission) => {
    return (req, res, next) => {
        // get token from body, query or headers
        var token = req.body.token || req.query.token || req.headers['api-access-token'];
        if (!token) {
            return res.status(400).send({
                message: "You must get access token first"
            })
        }
        try {

            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                let requiredPermissions = [];
                if (typeof permission === 'string') {
                    requiredPermissions = permission.split();
                }
                if (Array.isArray(permission)) {
                    requiredPermissions = permission;
                }
                if (decoded === undefined) {
                    return res.status(401).json({
                        code: 401,
                        message: "Token invalid_"
                    });
                }
                //get role from token
                let role = decoded.payload.role;
                //check permission
                if (checkPermission(requiredPermissions, role)) {
                    // save decoded and payload to req
                    req.decoded = decoded;
                    req.payload = decoded;
                    next();
                } else {
                    return res.status(403).send({
                        message: "You dont have permission for action"
                    })
                }
            })
        } catch (error) {
            return res.unauthorized(error);
        }
    }
}
