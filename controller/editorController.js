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

// app.use('/api', polyanno.router)
app.use('/editors', editorRouter)
app.use('/user', userRouter)

app.use(function (req, res, next) {
  res.status(404).redirect('/404page.html')
})
