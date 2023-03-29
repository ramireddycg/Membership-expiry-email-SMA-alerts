const express = require('express')
const app = express()
const morgan = require('morgan')

// Middlewares

// Logger
app.use(morgan("dev"))

// Body Parser
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(express.json())

// handle cors Errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  //* means every one can accessout side
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// routes to be published here

// Error Handling
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
module.exports = app