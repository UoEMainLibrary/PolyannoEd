// error handler for async/await
exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

// error handler for route that is not found
exports.notFound = (req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
}

// flash validation errors for mongoDB
exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err)
  const errorKeys = Object.keys(err.errors)
  errorKeys.forEach(key => req.flash('error', err.errors[key].message))
  res.redirect('back')
}

// error handler for  development environment
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || ''

  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  }

  res.status(err.status || 500)

  res.format({
    'text/html': () => {
      res.render('error', errorDetails)
    },
    'application/json': () => res.json(errorDetails)
  })
}

// error handler for production environment, without error stacktraces
exports.productionsErrors = (err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
}
