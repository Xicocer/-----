const express = require('express')
const {adminLogIn, adminLogOut} = require('../controllers/admin.controller');
const {createLocation, deleteLocation, getLocations} = require('../controllers/location.controller');
const router = express.Router()
const  {isAdmin} = require('../middelware/admin.middelware');

router.post('/login', adminLogIn);

router.post('/location', isAdmin, createLocation);
router.get('/locations', isAdmin, getLocations);
router.delete('/location/:id', isAdmin, deleteLocation);
router.post('/logout', isAdmin, adminLogOut);

module.exports = router;