const Donor = require('../models/Donor');
const Hospital = require('../models/Hospital');
const Booking = require('../models/Booking');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Survey = require('../models/Survey');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: 'Invalid email' });
  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ message: 'Invalid password' });
  const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, admin });
};

// View all donors
exports.getDonors = async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
};

// View all hospitals
exports.getHospitals = async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
};

// View all bookings
exports.getBookings = async (req, res) => {
  const bookings = await Booking.find().populate('donor hospital');
  res.json(bookings);
};

exports.getSurveys = async (req, res) => res.json(await Survey.find().populate('donor'));
// ...Add delete/update functions as needed
