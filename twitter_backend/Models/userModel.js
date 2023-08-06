const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    dob: {
        type: Date,
    },
    otp: {
        type: Number,
        default: 1111,
    },
    createdat: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })

const User = mongoose.model('Users', userModel)

module.exports = User