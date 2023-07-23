if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose.js')

const Record = require('../record.js')
const Category = require('../category.js')
const User = require('../user.js')

db.once('open', () => {
  Record.create({
    name: '早餐',
    date: 2023-01-02,
    amount: 100, 
    Category: '家居物業'
  })
})
