const Donor = require('../models/Donor');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, bloodType, phone, address, gender, dateOfBirth } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const donor = new Donor({ name, email, password: hashed, bloodType, phone, address, gender, dateOfBirth });
    await donor.save();
    res.status(201).json({ message: 'Donor registered' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(400).json({ message: 'Invalid email' });
    const match = await bcrypt.compare(password, donor.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: donor._id, role: 'donor' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, donor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  const donor = await Donor.findById(req.user.id);
  res.json(donor);
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ donor: req.user.id }).populate('hospital');
  res.json(bookings);
};
