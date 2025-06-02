const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Donor = require("../models/Donor");
const donorController = require('../controllers/donorController');
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// Register
router.post("/register", donorController.register);

// Login
router.post("/login", donorController.login);

// Profile
router.get("/me", auth, async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.id);
    if (!donor) {
        return res.status(404).json({ message: "Donor not found" });
    }
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching profile." });
  }
});

// Update profile
router.put("/me", auth, async (req, res) => {
  try {
    const allowedUpdates = ['name', 'bloodType', 'phone', 'address', 'gender', 'dateOfBirth'];
    const updateData = {};
    for (const key in req.body) {
        if (allowedUpdates.includes(key)) {
            updateData[key] = req.body[key];
        }
    }
    const donor = await Donor.findByIdAndUpdate(req.user.id, updateData, { new: true });
    if (!donor) {
        return res.status(404).json({ message: "Donor not found" });
    }
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error updating profile." });
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
    console.error(err.message);
    res.status(500).json({ message: "Error fetching donation history." });
  }
});

// Donor CRUD for admin
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching donors." });
  }
});

router.post("/", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json(donor);
  } catch (err) {
    // For Mongoose validation errors, err.message can be useful.
    // Otherwise, a more generic message might be better for unexpected errors.
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  // Note: Add auth and admin role verification for this route in a real-world scenario
  try {
    const allowedAdminUpdates = ['name', 'email', 'bloodType', 'phone', 'address', 'gender', 'dateOfBirth', 'isActive']; // Example
    const updateData = {};
    for (const key in req.body) {
        if (allowedAdminUpdates.includes(key)) {
            updateData[key] = req.body[key];
        }
    }
    const donor = await Donor.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!donor) {
        return res.status(404).json({ message: "Donor not found" }); // Standardized key to message
    }
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error updating donor." }); // Standardized key to message
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
        return res.status(404).json({ message: "Donor not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error deleting donor." });
  }
});

module.exports = router;
