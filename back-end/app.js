require('express-async-errors')
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
  logger.info('connected to db')
})
.catch((error) => {
  logger.error('error connection to db:', error.message)
})

app.use(express.json())
if (process.env.NODE_ENV !== 'production')
  app.use(middleware.requestLogger)

app.use(express.static(path.join(__dirname, 'build')))
app.use('/entries', require('./controllers/entries'))
app.use('/auth', require('./controllers/auth'))
app.use('*', (req, res) => res.sendfile(path.join(__dirname, 'build', 'index.html')))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app