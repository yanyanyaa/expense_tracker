const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000
const Record = require('./models/record.js')
const Category = require('./models/category.js')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// index
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      let totalAmount = 0
      records.map((record) => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })})
    .catch(err => console.log('err'))
})

// sort
app.get('/sort/:sortBy', (req, res) => {
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
          res.render('index', { records })})
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// new
app.get('/records/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => res.render('new', { categories }))
})

// data: new
app.post('/records', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// edit
app.get('/records/:id/edit', (req, res) => {
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
app.put('/records/:id', (req, res) => {
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
app.delete('/records/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndDelete(_id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})