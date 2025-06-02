const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['donor']), bookingController.createBooking);
router.post('/:id/cancel', authMiddleware(['donor', 'admin']), bookingController.cancelBooking);
router.get('/', authMiddleware(['admin', 'donor', 'hospital']), bookingController.listBookings);
router.post('/:id/status', authMiddleware(['hospital', 'admin']), bookingController.updateBookingStatus);

module.exports = router;
