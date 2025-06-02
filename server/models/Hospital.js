const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  bloodStock: { type: Object, default: {} }
});

module.exports = mongoose.model("Hospital", hospitalSchema);
