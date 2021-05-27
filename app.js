const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const candidateRoute = require('./apis/routes/candidateRoute')
const connection = require('./dbConfig/connection')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes which handles requests
app.use("/candidate", candidateRoute);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;