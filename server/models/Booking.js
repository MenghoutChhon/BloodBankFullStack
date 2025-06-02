const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
  type: { type: String, required: true }, // e.g., blood type "A+" (add this if missing)
  units: { type: Number, default: 1 },    // Number of units donated/requested
  date: { type: Date, default: Date.now }, // Use native Date for sorting/filtering
  status: { type: String, enum: ["pending", "approved", "completed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
