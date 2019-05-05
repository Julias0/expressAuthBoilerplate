const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model('user',userSchema);

module.exports = User;