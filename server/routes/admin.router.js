const express = require('express')
const {adminLogIn, adminLogOut} = require('../controllers/admin.controller');
const {createLocation, deleteLocation, locationList} = require('../controllers/location.controller');
const {createZone, deleteZone, getZonesByLocation} = require('../controllers/zone.controller');
const {getBookings, getBookingsByZone, updateBooking, deleteBooking} = require('../controllers/booking.controller');
const upload = require('../multer/locationImage');
const router = express.Router()
const  {isAdmin} = require('../middelware/admin.middelware');

router.post('/login', adminLogIn);
router.post(
  '/location',
  isAdmin,
  upload.fields([
    { name: 'imageUrl', maxCount: 1 }, 
    { name: 'zoneImg', maxCount: 1 }
  ]),
  createLocation
);
router.post('/logout', isAdmin, adminLogOut);
router.post('/zone', isAdmin, createZone);

router.get('/zones/:locationId', isAdmin, getZonesByLocation);
router.get('/locations', isAdmin, locationList);
router.get('/bookings', isAdmin, getBookings);
router.get('/bookings/zone/:zoneId', isAdmin, getBookingsByZone);

router.put('/booking/:id', isAdmin, updateBooking);

router.delete('/zone/:id', isAdmin, deleteZone);
router.delete('/booking/:id', isAdmin, deleteBooking);
router.delete('/location/:id', isAdmin, deleteLocation);
module.exports = router;