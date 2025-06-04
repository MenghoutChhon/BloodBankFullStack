const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Hospital = require("../models/Hospital");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hospital = await Hospital.findOne({ email });

    if (!hospital)
      return res.status(400).json({ error: "Invalid credentials" });

    const stored = hospital.password || "";
    const match = await bcrypt.compare(password, stored);
    if (!match)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: hospital._id, role: "hospital" }, process.env.JWT_SECRET);
    const hospitalObj = hospital.toObject();
    hospitalObj.role = "hospital";
    res.json({ user: hospitalObj, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard: blood stock
router.get("/me/stock", auth, async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.user.id);
    res.json(hospital.bloodStock || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard: requests/bookings
router.get("/me/requests", auth, async (req, res) => {
  try {
    const requests = await Booking.find({ hospital: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hospital CRUD for admin
router.get("/", async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
});

router.post("/", async (req, res) => {
  const hospital = new Hospital(req.body);
  await hospital.save();
  res.status(201).json(hospital);
});

router.put("/:id", async (req, res) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hospital);
});

router.delete("/:id", async (req, res) => {
  await Hospital.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
