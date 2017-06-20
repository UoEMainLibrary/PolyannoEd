var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var cors = require('cors')

const path = require('path')
const promisify = require('es6-promisify')
const flash = require('connect-flash')

// import environment variables
require('dotenv').config({ path: 'variables.env' })

// connect to mongodb and handle bad connection
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  console.error(`💔💔💔💔💔💔 ➡ ${err.message}`)
})

// GET APPLICATION RUNNING
var app = express()

// start the app
app.set('port', process.env.PORT || 8888)
const server = app.listen(app.get('port'), () => {
  console.log(`Express is running on PORT ${server.address().port}`)
})

// set the view engine
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)
app.use(express.static(path.join(__dirname, '/views')))

// set the main route
const router = require('./routes/index')
app.use('/', router)

// set the static files
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, '/examples')))

app.use(cors())
// Currently using cors for all origins just for development but will need to be specific for actual deployment

// Set bodypaser to process raw requests into req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// set the cookie parser
app.use(cookieParser())

app.use(function (req, res, next) {
  res.status(404).redirect('/404page.html')
})

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash())

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.flashes = req.flash()
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  next()
})

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})
