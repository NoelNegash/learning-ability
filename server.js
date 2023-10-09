const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Add your server-side routes and middleware here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});