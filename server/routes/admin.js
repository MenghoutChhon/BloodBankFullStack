const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Donor = require("../models/Donor");
const Hospital = require("../models/Hospital");
const Booking = require("../models/Booking");
const User = require("../models/User");

// Secure routes with admin-only middleware
router.get("/stats", authMiddleware(['admin']), async (req, res) => {
  const totalDonors = await Donor.countDocuments();
  const hospitals = await Hospital.countDocuments();
  const bloodUnits = await Donor.aggregate([
    { $group: { _id: null, total: { $sum: "$unitsDonated" } } }
  ]);
  const pendingRequests = await Booking.countDocuments({ status: "pending" });
  res.json({
    totalDonors,
    hospitals,
    bloodUnits: bloodUnits[0]?.total || 0,
    pendingRequests
  });
});

router.get("/stats/bloodunits", authMiddleware(['admin']), async (req, res) => {
  const agg = await Donor.aggregate([
    { $group: { _id: "$blood", total: { $sum: "$unitsDonated" } } }
  ]);
  const labels = agg.map(r => r._id);
  const data = agg.map(r => r.total);
  res.json({ labels, data });
});

router.get("/users", authMiddleware(['admin']), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Similarly secure other CRUD routes
router.post("/users", authMiddleware(['admin']), async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

router.put("/users/:id", authMiddleware(['admin']), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

router.delete("/users/:id", authMiddleware(['admin']), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
