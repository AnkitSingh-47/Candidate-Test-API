const Candidate = require('../models/candidate.js');
const TestScore = require('../models/test_score')
const mongoose = require('mongoose');

//controller to create new candidate
exports.create_candidate = (req, res, next) => {
    if (!req.body.name || !req.body.email) {
        res.json({ success: false, message: 'email or name is missing' })
        return;
    }
    Candidate.find({ email: req.body.email })
        .exec()
        .then(candidate => {
            if (candidate.length >= 1) {
                res.status(409).json({
                    message: "this email is already exists!"
                });
            }
            else {
                const candidate = new Candidate({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                });
                candidate
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: "Candidate added successfully!",
                            result: result
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        });

}

//controller to add test score of specific candidate based on id/name
exports.addTestScores = (req, res, next) => {
    Candidate.findById(req.body.candidateId)
        .then(candidate => {
            if (!candidate || req.body.candidateName !== candidate.name) {
                return res.status(404).json({
                    message: "candidate not found!"
                })
            }
            if (req.body.first_round_score > 10 || req.body.second_round_score > 10 || req.body.third_round_score > 10) {
                return res.json({
                    message: "Test scores should be out of 10"
                })
            }
            const testScores = new TestScore({
                _id: mongoose.Types.ObjectId(),
                candidateId: req.body.candidateId,
                candidateName: req.body.candidateName,
                first_round_score: req.body.first_round_score,
                second_round_score: req.body.second_round_score,
                third_round_score: req.body.third_round_score,
            });
            return testScores.save().then(result => {
                console.log(result);
                res.status(200).json({
                    message: "Test scores was added!",
                    addedTestScores: {
                        _id: result._id,
                        candidateName: result.candidateName,
                        first_round_Score: result.first_round_score,
                        second_round_Score: result.second_round_score,
                        third_round_Score: result.third_round_score
                    }
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//controller to get a candidate with highest scores
exports.get_Highest_Scorer = (req, res, next) => {
    TestScore
        .find()
        .sort({ first_round_score: -1, second_round_score: -1, third_round_score: -1 })
        .limit(1)
        .then(docs => {
            res.status(200).json({
                Highest_Scorer: docs.map(doc => {
                    return {
                        _id: doc._id,
                        candidate_name: doc.candidateName,
                        first_round_score: doc.first_round_score,
                        second_round_score: doc.second_round_score,
                        third_round_score: doc.third_round_score
                    }

                })
            });

        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            })
        })

}

//controller to get average scores of each candidate in all round
exports.get_Averate_Score = (req, res, next) => {
    TestScore
        .find()
        .then(docs => {
            res.status(200).json({
                Candidate_Average_Score: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Candidate_name: doc.candidateName,
                        Candidate_Average_Score: ((doc.first_round_score + doc.second_round_score + doc.third_round_score) / 3)
                    }

                })
            });

        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            })
        })

}
