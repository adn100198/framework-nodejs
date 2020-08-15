const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const tokenList = {};

/**
 * Controller for User register, login and logout
 */

async function login(req, res) {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('Not found');
        } else if (user && await user.comparePassword(password)) {
            let payload = {
                id: user._id,
                role: user.role,
                username: user.user_name
            };
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 15), //Token expired after 15 minutes
                payload
            }, process.env.JWT_SECRET);
            let refreshToken = jwt.sign({
                exp: 99999999999,
                payload
            }, process.env.JWT_SECRET);

            payload.token = token;
            payload.refreshToken = refreshToken;
            tokenList[refreshToken] = payload;

            return res.status(200).json(payload);
        }
        throw new Error('Password wrong');
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }
}

async function refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (refreshToken && (refreshToken in tokenList)) {
        try {
            //vertify refresh token
            var verifyOptions = {
                algorithm: [
                    "RS256",
                ],
            };
            jwt.verify(refreshToken, process.env.JWT_SECRET, verifyOptions);
            //get user info
            const payload = tokenList[refreshToken];
            //create new token
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 15), //Token expired after 24 hours
                payload
            }, process.env.JWT_SECRET);
            return res.status(200).json({
                token: token
            });
        } catch (error) {
            return res.forbidden(error);
        }
    }
    else {
        return res.status(400).json({
            message: 'Invalid Refresh Token'
        })
    }
}

async function register(req, res) {
    try {
        let user = new User(req.body);
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        return res.inputError(error);
    }
}

async function logout(req, res) {
    try {


    } catch (error) {
    }
}

module.exports = { login, register, logout, refreshToken }
