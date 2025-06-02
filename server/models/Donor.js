const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // In production, always hash passwords!
  blood: { type: String, required: true },    // e.g., "A+", "O-"
  phone: { type: String, required: true },
  lastDonated: { type: String }, // Consider using Date if you want to sort/filter
  unitsDonated: { type: Number, default: 0 }
});

module.exports = mongoose.model("Donor", donorSchema);
