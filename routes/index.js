const express = require('express');
const router = express.Router();

const permissions = require('../config/permissions');
const hasOwnPermission = require('../middlewares/hasOwnPermission');
const authController = require('../controllers/auth.controller');

//Check health api
router.get('/health-check', function (req, res) {
    res.json({
        success: true
    });
});

// User Login Api
router.post('/users/register', authController.register);
router.post('/users/login', authController.login);
router.get('/logout', authController.logout);
router.post('/refresh-token', hasOwnPermission(permissions.manager.roles), authController.refreshToken);
// Manage User Api


module.exports = router;