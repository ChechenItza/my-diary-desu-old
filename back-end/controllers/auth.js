const app = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')

app.post('/:id', async (req, res) => {
  let user = await User.findOne({'_id': req.params.id})
  if (!user) {
    user = new User();
    user._id = req.params.id
    user.name = req.body.name
    user.journal = []
    
    user.save()
  }

  const token = jwt.sign(req.params.id, process.env.TOKEN_SECRET)
  res.json({ token })
})

module.exports = app