const express = require('express')
const {adminLogIn, adminLogOut} = require('../controllers/admin.controller');
const router = express.Router()

// Admin login route
router.post('/login', adminLogIn);

// Admin logout route
router.post('/logout', adminLogOut);

module.exports = router;