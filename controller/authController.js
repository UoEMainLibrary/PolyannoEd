const passport = require('passport')
const User = require('../models/User')
const promisify = require('es6-promisify')

exports.home = function (req, res) {
  res.render('index', { user: req.user })
}

exports.registerForm = function (req, res) {
  res.render('register', {title: 'Register'})
}

exports.loginForm = (req, res) => {
  res.render('login')
}

// local middlewares
exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name })
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next()
}
exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
})

// facebook middlewares
exports.facebook = passport.authenticate('facebook')
exports.facebookCallback = passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
})

// twitter middlewares
exports.twitter = passport.authenticate('twitter')
exports.twitterCallback = passport.authenticate('twitter', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
})

// logout
exports.logout = (req, res) => {
  req.logout()
  req.flash('success', ' You are logged out')
  res.redirect('/')
}

// check if the user logged in
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
    return
  }

  req.flash('danger', 'You need to login first')
  res.redirect('/login')
}
