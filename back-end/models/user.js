const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  pages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)