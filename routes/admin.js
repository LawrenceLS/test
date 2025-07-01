const express = require('express');
const router = express.Router();
const path = require('path');
const { login, logout } = require('../auth/authController');
const { ensureAuthenticated } = require('../auth/authMiddleware');

// GET Login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

// POST Login (async wrapper)
router.post('/login', async (req, res, next) => {
    try {
        await login(req, res);
    } catch (err) {
        next(err);
    }
});

// POST Logout
router.post('/logout', logout);

// GET Protected Dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});

module.exports = router;
