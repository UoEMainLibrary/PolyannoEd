// import express library
const express = require('express')

// import for library used to validate user inputs
const expressValidator = require('express-validator')

// import path for working with directory and files
const path = require('path')

// import body parser for processing requests
const bodyParser = require('body-parser')

// import for cookie parsing library
const cookieParser = require('cookie-parser')

// import for session
const session = require('express-session')

// import for mongo storing session
const MongoStore = require('connect-mongo')(session)

// import mongoose for interfacing with mongodb
const mongoose = require('mongoose')

// import library for hanling logins
const passport = require('passport')

// import for flash informations
const flash = require('connect-flash')

// import library to promisify callback
const promisify = require('es6-promisify')

// import routes to be handled
const routes = require('./routes/index')

// import the helpers file
const helpers = require('./helpers')

// import the error handlers
const errorHandlers = require('./handlers/errorHandlers')

// import environment variables
require('dotenv').config({ path: 'variables.env' })

// create the Express app
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views')) // the folder for template files
app.set('view engine', 'pug')

// serve static file in public folder
app.use(express.static(path.join(__dirname, 'public')))

// server universalviewer as static files
app.use(express.static(path.join(__dirname, 'node_modules/universalviewer/dist/uv-2.0.2')))

// turns raw requests into req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Validator for validating user inputs
app.use(expressValidator())

// populate req.cookies from request
app.use(cookieParser())

// add session mechanism that allow the app to keep the data from visiitors and send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport.js for handling logins
app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/User')
passport.use(User.createStrategy())

const FacebookStrategy = require('passport-facebook').Strategy

const fbSettings = {
  // clientID: process.env.FB_APP_ID,
  // clientSecret: process.env.FB_APP_SECRET,
  clientID: '1422122864547554',
  clientSecret: '605c6ad1437cb9b66c428d68cbf50f75',
  callbackURL: 'http://localhost:7777/login/facebook/callback'
}

const fbCallback = function (accessToken, refreshToken, profile, cb) {
  console.log(profile)
  // console.log(accessToken, refreshToken, profile, cb)
  // User.findOrCreate({ email: profile.email, name: profile.name, facebookId: profile.id }, function (err, user) {
  //   return cb(err, user)
  // })
}
passport.use(new FacebookStrategy(fbSettings, fbCallback))

app.route('/login/facebook').get(passport.authenticate('facebook'))
// app.route('/login/facebook/callback').get(passport.authenticate('facebook', function (err, user, info) {
//   console.log(err, user, info)
//   // console.log('testing')
// }))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// passport.serializeUser(function (user, done) {
//   done(null, user.id)
// })

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user)
//   })
// })

// Flash middleware for passing message to user requests
app.use(flash())

// pass variables to templates and requests
app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.flashes = req.flash()
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  next()
})

// promisify callback
app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

// handling routes
app.use('/', routes)

// error handling when route not found
app.use(errorHandlers.notFound)

// show error stacktrace if in development environment
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors)
}

// production error
app.use(errorHandlers.productionErrors)

// connect to mongodb and handle bad connection
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  console.error(`💔💔💔💔💔💔 ➡ ${err.message}`)
})

// start the app
app.set('port', process.env.PORT || 8888)
const server = app.listen(app.get('port'), () => {
  console.log(`Express is running on PORT ${server.address().port}`)
})
