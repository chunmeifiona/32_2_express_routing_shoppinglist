const express = require('express');
const ExpressError = require('./expressError');
const itemsRouters = require('./itemsRouters');

const app = express();

app.use(express.json());

app.use('/items', itemsRouters);


/** 404 handler */

app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
});

/** general error handler */
app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg;

    return res.status(status).json({
        error: { message, status }
    });
})

module.exports = app;
