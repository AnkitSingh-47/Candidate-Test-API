const mongoose = require('mongoose');

const testScoreSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    candidateName: { type: String, ref: 'Candidate', required: true },
    first_round_score: { type: Number, required: true, maxValue: 10 },
    second_round_score: { type: Number, required: true },
    third_round_score: { type: Number, required: true },
});

module.exports = mongoose.model('TestScore', testScoreSchema);