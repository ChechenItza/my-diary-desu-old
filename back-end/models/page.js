const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.String,
    ref: 'User'
  },
  date: String,
  entry: Object
})

pageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Page', pageSchema)