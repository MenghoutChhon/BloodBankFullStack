const mongoose = require('mongoose');
const surveySchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  data: Object, // All survey answers
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Survey', surveySchema);
