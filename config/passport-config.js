const facebookStrategy = require('./passport-strategies/facebook')
const localStratey = require('./passport-strategies/local')

const mongoose = require('mongoose')
const User = mongoose.model('User')

const setPassport = (passport) => {
  passport.use(localStratey)

  passport.use(facebookStrategy)

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}

module.exports = setPassport
