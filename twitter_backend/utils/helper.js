const axios = require('axios')
require('dotenv').config();

exports.generateOTP = () => {
  const four_digit = Math.floor(1000 + Math.random() * 9000)
  return four_digit
}
