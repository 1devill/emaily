const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/user')
require('./services/passport')

mongoose.connect(process.env.MONGO_URI)

const app = express()

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/auth')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)