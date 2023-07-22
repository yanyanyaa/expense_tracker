const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000
const Record = require('./models/record.js')
const Catrgory = require('./models/category.js')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// index
app.get('/', (req, res) => {
  Record.find()
  .lean()
  .sort({ _id: 'asc'})
  .then(records => res.render('index', { records }))
  .catch(err => console.log('err'))
})

// new
app.get('/records/new', (req, res) => {
  Catrgory.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => res.render('new', { categories }))
})

// data: new
app.post('/records', (req, res) => {  
  console.log(req.body)
  const { name, date, category, amount} = req.body
  return Record.create({ name, date, category, amount })  
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// edit

// data: edit

// data: delete


app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})