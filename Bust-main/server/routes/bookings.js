const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Bed = require('../models/Bed');
const Ambulance = require('../models/Ambulance');

// @route   GET /bookings
// @desc    Get all bookings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('hospital', 'name')
      .populate('itemId');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /bookings
// @desc    Create a new booking
// @access  Public
router.post('/', async (req, res) => {
  const { bookingType, itemId, hospital } = req.body;

  try {
    const newBooking = new Booking({
      bookingType,
      itemId,
      hospital,
    });

    const booking = await newBooking.save();

    if (bookingType === 'bed') {
      await Bed.findByIdAndUpdate(itemId, { isAvailable: false });
    } else if (bookingType === 'ambulance') {
      await Ambulance.findByIdAndUpdate(itemId, { isAvailable: false });
    }

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
