const Hospital = require('../models/Hospital');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  try {
    const { name, email, password, address, phone, city, state, zip_code, contact_person } = req.body;
    // Check if email already exists
    const existing = await Hospital.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    // Password required
    if (!password) return res.status(400).json({ message: 'Password required' });
    const hashed = await bcrypt.hash(password, 10);

    const hospital = new Hospital({
      name,
      email,
      password: hashed,
      address,
      phone,
      city,
      state,
      zip_code,
      contact_person
    });
    await hospital.save();
    res.status(201).json({ message: 'Hospital registered' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hospital = await Hospital.findOne({ email });
    if (!hospital) return res.status(400).json({ message: 'Invalid email' });
    // If your Hospital model does not include password, add password field to schema!
    if (!hospital.password) return res.status(500).json({ message: 'Hospital has no password set' });
    const match = await bcrypt.compare(password, hospital.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: hospital._id, role: 'hospital' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, hospital });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.user.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ hospital: req.user.id }).populate('donor');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    if (String(booking.hospital) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
