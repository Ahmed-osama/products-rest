const mongoose = require('mongoose');
const { EMAIL_REGEX } = require('./../constants')
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: EMAIL_REGEX

    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)