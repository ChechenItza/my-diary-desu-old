require('dotenv').config()

let PORT = process.env.PORT 
let MONGODB_URI = process.env.MONGODB_URI
let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
let GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
let TOKEN_SECRET = process.env.TOKEN_SECRET

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = { 
  PORT, 
  MONGODB_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  TOKEN_SECRET
}