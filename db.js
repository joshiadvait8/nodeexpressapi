const mongoose = require('mongoose');
const mongourl = "mongodb://localhost:27017/hotels";

mongoose.connect(mongourl);

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB successfully');
});
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

module.exports = db;
