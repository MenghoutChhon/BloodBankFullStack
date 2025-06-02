const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const authMiddleware = require('../middleware/auth'); // NO curly braces!

router.post('/', authMiddleware(['donor']), surveyController.createSurvey);
router.get('/mine', authMiddleware(['donor']), surveyController.getMySurveys);

module.exports = router;
