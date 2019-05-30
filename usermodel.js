const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
})

mongoose.model('User', userSchema);
module.exports = mongoose.model('User')