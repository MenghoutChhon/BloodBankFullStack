const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Hospital = require("../models/Hospital");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// Register new hospital
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const existing = await Hospital.findOne({ email });
    if (existing) return res.status(400).json({ error: "Hospital already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const hospital = new Hospital({ name, email, password: hashed, address, phone });
    await hospital.save();
    const token = jwt.sign({ id: hospital._id, role: "hospital" }, process.env.JWT_SECRET);
    const obj = hospital.toObject();
    obj.role = "hospital";
    res.status(201).json({ user: obj, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// Get current hospital profile
router.get("/me", auth(["hospital"]), async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.user.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update current hospital profile
router.put("/me", auth(["hospital"]), async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const hospital = await Hospital.findByIdAndUpdate(req.user.id, data, { new: true });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard: blood stock
router.get("/me/stock", auth(["hospital"]), async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.user.id);
    res.json(hospital.bloodStock || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard: requests/bookings
router.get("/me/requests", auth(["hospital"]), async (req, res) => {
  try {
    const requests = await Booking.find({ hospital: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hospital CRUD for admin
router.get("/", auth(["admin"]), async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
});

router.post("/", auth(["admin"]), async (req, res) => {
  const hospital = new Hospital(req.body);
  await hospital.save();
  res.status(201).json(hospital);
});

router.put("/:id", auth(["admin"]), async (req, res) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hospital);
});

router.delete("/:id", auth(["admin"]), async (req, res) => {
  await Hospital.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
