const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  name_en: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  }
})

module.exports = mongoose.model('Category', categorySchema)