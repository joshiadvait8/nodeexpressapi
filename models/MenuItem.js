const mongoose = require('mongoose');
const menuItem = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'savory', 'spicy'],
    }
});
const MenuItem = mongoose.model('MenuItem', menuItem,'menuitems');

module.exports = MenuItem;