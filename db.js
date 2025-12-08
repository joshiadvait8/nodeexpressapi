const mongoose = require('mongoose');
require('dotenv').config();
// const mongourl = "mongodb://localhost:27017/hotels";
const mongourl = process.env.MONGODB_URL;
mongoose.connect(mongourl);

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB successfully');
});
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

module.exports = db;
