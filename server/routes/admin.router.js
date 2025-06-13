const express = require('express')
const {adminLogIn, adminLogOut} = require('../controllers/admin.controller');
const {createLocation, deleteLocation, getLocations} = require('../controllers/location.controller');
const {createZone, deleteZone, getZonesByLocation} = require('../controllers/zone.controller');
const router = express.Router()
const  {isAdmin} = require('../middelware/admin.middelware');

router.post('/login', adminLogIn);
router.post('/location', isAdmin, createLocation);
router.post('/logout', isAdmin, adminLogOut);
router.post('/zone', isAdmin, createZone);

router.get('/zones/:locationId', isAdmin, getZonesByLocation);
router.get('/locations', isAdmin, getLocations);

router.delete('/zone/:id', isAdmin, deleteZone);
router.delete('/location/:id', isAdmin, deleteLocation);
module.exports = router;