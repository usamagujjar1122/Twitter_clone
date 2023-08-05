const mongoose = require('mongoose')

const otpModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
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

const Otp = mongoose.model('otps', otpModel)

module.exports = Otp