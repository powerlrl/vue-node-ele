const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ProfilesSchema = new Schema({
  type: {
    type: String,
  },
  describe: {
    type: String,
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date()
  }
})

let Profile = mongoose.model("profiles",ProfilesSchema)
module.exports =  Profile