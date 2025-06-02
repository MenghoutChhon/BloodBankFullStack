const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { donorId, hospitalId, date, survey } = req.body;
    const booking = new Booking({ donor: donorId || req.user.id, hospital: hospitalId, date, survey });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listBookings = async (req, res) => {
  try {
    let filter = {};
    if (req.query.donorId) filter.donor = req.query.donorId;
    if (req.query.hospitalId) filter.hospital = req.query.hospitalId;
    const bookings = await Booking.find(filter).populate('donor hospital');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
