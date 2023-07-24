const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

// index
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      let totalAmount = 0
      records.map((record) => {
        totalAmount += record.amount
      })
      return res.render('index', { records, totalAmount })
    })
    .catch(err => console.log('err'))
  
})

// sort
router.get('/sort/:sortBy', (req, res) => {
  const userId = req.user._id
  const name_en = req.params.sortBy
  Category.findOne({ name_en })
    .then((category) => categoryId = category._id)
    .then((categoryId) => {
      Record.find({ userId, categoryId })
      .populate('categoryId')
      .lean()
      .sort({ date: 'asc' })
      .then(records => {
        let totalAmount = 0
        records.map((record) => {
          totalAmount += record.amount
        })
        return res.render('index', { records, totalAmount })
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


// router.get('/sort/:sortBy', (req, res) => {
//   const name_en = req.params.sortBy
//   const userId = req.user._id
//   return Category.find({ name_en })
//     .lean()
//     .then(category => {
//       const icon = category[0].icon
//       return Record.find({ category: icon, userId })
//         .lean()
//         .sort({ date: 'asc' })
//         .then(records => {
//           console.log('records: ', records)
//           res.render('index', { records })
//         })
//         .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))
// })

module.exports = router