const express = require('express');
const router = express.Router();
const { create_candidate, addTestScores, get_Highest_Scorer, get_Averate_Score } = require('../controllers/candidateController');

router.post('/createCandidate', create_candidate);

router.post('/candidateTestScore', addTestScores);

router.get('/highestScorer', get_Highest_Scorer);

router.get('/getAverageScores', get_Averate_Score)

module.exports = router;