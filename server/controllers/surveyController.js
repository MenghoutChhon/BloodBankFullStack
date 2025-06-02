const Survey = require('../models/Survey');
exports.createSurvey = async (req, res) => {
  const donor = req.user.id;
  const survey = await Survey.create({ donor, data: req.body });
  res.status(201).json(survey);
};

// controllers/surveyController.js

exports.getMySurveys = async (req, res) => {
  try {
    const donor = req.user.id;
    const surveys = await Survey.find({ donor });
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
};
