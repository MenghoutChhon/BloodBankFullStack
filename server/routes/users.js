const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// --- Admin/User Login (for Admin Panel) ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check user
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT with user role and ID
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    // Ensure response includes user.id for frontend (not just _id)
    const userObj = user.toObject();
    userObj.id = user._id;
    delete userObj._id;
    delete userObj.__v;
    userObj.role = user.role;

    res.json({ user: userObj, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Admin CRUD for Users ---

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    // Normalize for frontend (replace _id with id)
    const out = users.map(u => {
      const obj = u.toObject();
      obj.id = obj._id;
      delete obj._id;
      delete obj.__v;
      return obj;
    });
    res.json(out);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    // Return with id field for frontend
    const obj = user.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    res.json(obj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update user
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    const obj = user.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    res.json(obj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
