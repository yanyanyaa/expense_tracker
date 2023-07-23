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
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// edit
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  return Record.findById(_id)
    .lean()
    .then(record => {
      return Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories =>
          res.render('edit', { record, categories }))
    })
})

// data: edit
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const { name, date, amount, category } = req.body
  return Record.findById(_id)
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      record.category = category
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// data: delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndDelete(_id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router