const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

// new
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => res.render('new', { categories }))
})

// data: new
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  Category.findOne({ name: category })
    .lean()
    .then((recordCategory) => {
      categoryId = recordCategory._id
      return Record.create({ userId, name, date, category, amount, categoryId })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      record.date = record.date.toISOString().split('T')[0]
      return Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories =>
          res.render('edit', { record, categories }))
    })
})

// data: edit
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, category } = req.body
  Category.findOne({ name: category })
    .lean()
    .then((recordCategory) => {
      categoryId =recordCategory._id
      return Record.findOne({ _id, userId })
      .then(record => {
        record.name = name
        record.date = date
        record.amount = amount
        record.category = category
        record.categoryId = categoryId
        return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
    })
  
})

// data: delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router