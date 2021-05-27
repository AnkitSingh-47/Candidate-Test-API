const mongoose = require("mongoose");

// const url = "mongodb://localhost:27017/CandidateDb";

const url = "mongodb+srv://Ankit_Singh_47:ankitsingh@free-cluster-ankit.6djo6.mongodb.net/candidateDb?retryWrites=true&w=majority"

const connection = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.log('Db connection failed!')
    }
    console.log('Db connected!')
});

module.exports = connection;