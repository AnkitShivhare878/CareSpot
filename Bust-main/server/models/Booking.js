const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingType: {
    type: String,
    required: true,
    enum: ['bed', 'ambulance'],
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'bookingType',
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
