const app = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Page = require('../models/page')

const config = require('../utils/config')

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer'))
    return authorization.substring(7)

  return null
}

app.get('/all', async (request, response) => {
  const userId = jwt.verify(getToken(request), config.TOKEN_SECRET)
  const user = await User.findById(userId).populate('pages')

  const datesWithEntries = user.pages.map(elem => elem.date)

  response.json({ 'dates': datesWithEntries })
})

app.get('/:date', async (request, response) => {
  const date = request.params.date
  const userId = jwt.verify(getToken(request), config.TOKEN_SECRET)
  const user = await User.findById(userId).populate('pages')

  const page = user.pages.find(page => page.date == date)
  let entry = undefined
  if (page) {
    entry = page.entry
  }

  response.json({ date, entry })
})

app.post('/:date', async (request, response) => {
  const userId = jwt.verify(getToken(request), config.TOKEN_SECRET)
  const user = await User.findById(userId)
  const date = request.params.date
  const entry = request.body.entry

  let page = await Page.findOne({ 'user': user._id, date })
  if (page) {
    page.entry = entry
    page.save()
  } else {
    page = new Page({
      user: user._id,
      date,
      entry
    })

    const savedPage = await page.save()
    user.pages = [...user.pages, savedPage._id]
    user.save()
  }

  response.json({ 'date': page.date, 'entry': page.entry })
})

module.exports = app