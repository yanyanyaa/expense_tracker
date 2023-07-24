if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose.js')

const bcrypt = require('bcryptjs')
const Record = require('../record.js')
const Category = require('../category.js')
const User = require('../user.js')
const recordList = require('./record.json')
const userList = require('./user.json')

db.once('open', () => {
  Promise.all(
    userList.map(seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => {
          return User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          })
          .catch(err => console.log(err))
        })
        .then(user => {
          const userRecordPromise = seedUser.records.map(async item => {
            const userId = user._id
            const category = await Category.findOne({ name: recordList[item - 1].category }).lean()
            const categoryId = category._id
            Object.assign(recordList[item - 1], { userId, categoryId })
            return recordList[item - 1]
          })
          return Promise.all(userRecordPromise)
        })
        .then((userRecord) => Record.create(userRecord))
        .catch(err => {console.log(err)})
    })
  )
  .then(() => {
    console.log('done.')
    process.exit()
  })
})
