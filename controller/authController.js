// const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/User')
const promisify = require('es6-promisify')

// Restrict access to root page
exports.home = function (req, res) {
  res.render('index', { user: req.user })
}

// Go to registration page
exports.registerForm = function (req, res) {
  res.render('register', {title: 'Register'})
}

// Post registration
exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name })
  const register = promisify(User.register, User)
  await register(user, req.body.password)

  // console.log(req)
  next()
}

exports.loginForm = (req, res) => {
  res.render('login')
}

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
})

// logout
exports.logout = function (req, res) {
  req.logout()
  req.flash('success', ' You are logged out')
  res.redirect('/')
}

exports.facebookCallback = passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
})

exports.facebook = passport.authenticate('facebook')
