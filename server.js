
// SETUP REQUIREMENTS

var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
// mongoose.Promise = require("bluebird");
var cookieParser = require('cookie-parser')
var cors = require('cors')

var polyanno = require('polyanno_storage')

/// /have released polyanno_storage as a separate NPM package so you should be able to simply "npm install" it the same as the other packages
/// need to set a function to (re)define those variables here within this package rather than just recalling what is defined in the node_modules package...

var thisWebsitePort = 7777

// GET APPLICATION RUNNING

var app = express()

/// /BASIC APP ROUTES & SETUP

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/examples'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.use(cors())
// Currently using cors for all origins just for development but will need to be specific for actual deployment

/// ////SETUP

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

var port = process.env.PORT || thisWebsitePort

/// ///MIDDLEWARE

var editorRouter = express.Router()

editorRouter.use(function (req, res, next) {
    // should have proper logging here
  next()
})

var userRouter = express.Router()

userRouter.use(function (req, res, next) {
    // should have proper logging here
  next()
})

/// //////////////PAGE ROUTES

editorRouter.get('/:name', function (req, res, next) {
  /// /specific to University of Edinburgh application to prevent general spamming with any old info.json through the website
  var fileName = 'http://images.is.ed.ac.uk/luna/servlet/iiif/' + req.params.name + '/info.json'
  var options = {
    root: __dirname + '/views/',
    headers: {
      'Set-Cookie': 'imageviewing=' + fileName + '; path=/editors ' /// expires todays date???
    }
  }

  res.sendFile('theimage.html', options, function (err) {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    } else {
      // console.log('Sent with '+JSON.stringify(options.headers));
    }
  })
})

editorRouter.use(express.static(__dirname + '/public'))
editorRouter.use(express.static(__dirname + '/views'))
editorRouter.use(express.static(__dirname + '/examples'))

app.get('/beginnertutorial', function (req, res) {
  res.redirect('/beginnertutorial.html')
})

app.get('/aboutus', function (req, res) {
  res.redirect('/aboutus.html')
})

/// //////////////USER ROUTES

/// need to update to reference a different database

userRouter.get('/username/:username', polyanno.users.getByUsername)
userRouter.get('/id/:user_id', polyanno.users.getByID)
userRouter.post('/', polyanno.users.addNew)
userRouter.put('/:username', polyanno.users.updateOne)

/// //////GET STARTED

app.use('/api', polyanno.router)
app.use('/editors', editorRouter)
app.use('/user', userRouter)

app.use(function (req, res, next) {
  res.status(404).redirect('/404page.html')
})

// tells the server where it should be listening for req and res
app.listen(thisWebsitePort)
