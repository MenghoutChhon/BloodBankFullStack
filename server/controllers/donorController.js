const Donor = require('../models/Donor');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, bloodType, phone, address, gender, dateOfBirth } = req.body;

    // Basic validation
    if (!name || !email || !password || !bloodType || !phone || !address || !gender || !dateOfBirth) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    if (password.length < 6) { // Example: Minimum password length
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
    // Basic email format check (can be improved with regex for more accuracy)
    if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    // Add more specific checks for other fields if necessary (e.g., phone format, date format)

    const hashed = await bcrypt.hash(password, 10);
    const donor = new Donor({ name, email, password: hashed, bloodType, phone, address, gender, dateOfBirth });
    await donor.save();
    const token = jwt.sign({ id: donor._id, role: 'donor' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const donorObj = donor.toObject();
    donorObj.role = 'donor';
    res.status(201).json({ token, user: donorObj });
  } catch (err) {
    console.error(err.message); // Server-side log for unexpected errors
    // Mongoose validation errors (like unique email) will typically be caught by model validation
    // and ideally returned with a 400 before this generic catch.
    // This catch is for other unexpected server errors.
    res.status(500).json({ message: 'Error registering donor.' });
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
    const donorObj = donor.toObject();
    donorObj.role = 'donor'; // Explicitly set role as it was in the routes
    res.json({ token, user: donorObj }); // Match 'user' key and add role
  } catch (err) {
    console.error(err.message); // Server-side log
    res.status(500).json({ message: 'Error logging in.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found.' });
    }
    res.json(donor);
  } catch (err) {
    console.error(err.message); // Server-side log
    res.status(500).json({ message: 'Error fetching profile.' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ donor: req.user.id }).populate('hospital');
    // It's okay if bookings is an empty array. No specific not found check needed here.
    res.json(bookings);
  } catch (err) {
    console.error(err.message); // Server-side log
    res.status(500).json({ message: 'Error fetching bookings.' });
  }
};
