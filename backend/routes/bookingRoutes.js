const express = require('express');

const {
    createBooking,
    getMyBookings,
    cancelBooking
} = require('../controllers/bookingController');

const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post(
    "/",
    verifyToken,
    createBooking
);

router.get(
    "/",
    verifyToken,
    getMyBookings
);

router.patch(
    "/:id/cancel",
    verifyToken,
    cancelBooking
);

module.exports = router;