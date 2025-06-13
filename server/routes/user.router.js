const express = require('express')
const {getLocations} = require('../controllers/location.controller');
const {getZonesByLocation} = require('../controllers/zone.controller');
const {createBooking} = require('../controllers/booking.controller');
const router = express.Router()

router.get('/locations', getLocations);
router.get('/zones/:locationId', getZonesByLocation);

router.post('/booking', createBooking);

module.exports = router;