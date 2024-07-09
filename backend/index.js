require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Routes
app.use('/', require('./routes/apiRoutes'));
app.use('/upload', require('./routes/uploadRoutes'));

// Start Server
app.listen(port, (err) => {
    if (!err) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + err);
    }
});
