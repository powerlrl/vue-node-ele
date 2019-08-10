const mongoose = require('mongoose')
const Schema = mongoose.Schema
let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  identify: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date().toLocaleString()
  }
})
let User = mongoose.model('users',UserSchema)
module.exports = User