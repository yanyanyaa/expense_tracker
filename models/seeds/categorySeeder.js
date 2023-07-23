if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose.js')

const Category = require('../category.js')
const categoryList = require('./category.json')

db.once('open', () => {
  categoryList.map(category => {
    const { name, name_en, icon } = category
    Category.create({
      name,
      name_en,
      icon
    })
  })
})
