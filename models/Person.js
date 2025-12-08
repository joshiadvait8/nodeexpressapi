const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    }
});
const Person = mongoose.model('Person', personSchema,'persons');

module.exports = Person;