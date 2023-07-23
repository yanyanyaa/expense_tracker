const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

// index
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      let totalAmount = 0
      records.map((record) => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log('err'))
})

// sort
router.get('/sort/:sortBy', (req, res) => {
  const name_en = req.params.sortBy
  return Category.find({ name_en })
    .lean()
    .then(category => {
      const name = category[0].icon
      return Record.find({ category: name })
        .lean()
        .sort({ _id: 'asc' })
        .then(records => {
          console.log('records: ', records)
          res.render('index', { records })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router