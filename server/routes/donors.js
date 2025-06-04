const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Donor = require("../models/Donor");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, blood, phone } = req.body;
    if (!email || !password || !fullName || !blood || !phone)
      return res.status(400).json({ error: "Missing fields" });
    let donor = await Donor.findOne({ email });
    if (donor) return res.status(400).json({ error: "Donor already exists" });
    const hashed = await bcrypt.hash(password, 10);
    donor = new Donor({ fullName, email, password: hashed, blood, phone });
    await donor.save();
    const token = jwt.sign({ id: donor._id, role: "donor" }, process.env.JWT_SECRET);

    // Add .role = "donor" to returned object
    const donorObj = donor.toObject();
    donorObj.role = "donor";

    res.json({ user: donorObj, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(400).json({ error: "Invalid credentials" });
    const match = await bcrypt.compare(password, donor.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: donor._id, role: "donor" }, process.env.JWT_SECRET);

    // Add .role = "donor" to returned object
    const donorObj = donor.toObject();
    donorObj.role = "donor";

    res.json({ user: donorObj, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profile
router.get("/me", auth, async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.id);
    res.json(donor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put("/me", auth, async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Donor donation history
router.get("/me/history", auth, async (req, res) => {
  try {
    const history = await Booking.find({ donor: req.user.id })
      .populate("hospital")
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Donor CRUD for admin
router.get("/", async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});

router.post("/", async (req, res) => {
  const donor = new Donor(req.body);
  await donor.save();
  res.status(201).json(donor);
});

router.put("/:id", async (req, res) => {
  const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(donor);
});

router.delete("/:id", async (req, res) => {
  await Donor.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
