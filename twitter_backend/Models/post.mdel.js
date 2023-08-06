const mongoose = require('mongoose')
const { Schema } = mongoose;

const postModel = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  likes: {
    type: Array,
  },
  msg: {
    type: String,
  },
  createdat: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true })

const Post = mongoose.model('posts', postModel)

module.exports = Post