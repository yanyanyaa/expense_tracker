const mongoose = require('mongoose')
const Record = require('../record.js')
const Category = require('../category.js')
const User = require('../user.js')
const db = mongoose.connection

db.once('open', () => {
  Record.create({
    name: 早餐,
    date: 2023-01-02,
    amount: 100
  })
})
