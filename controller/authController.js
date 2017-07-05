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

exports.facebook = passport.authenticate('facebook', { scope: ['email'] })

exports.facebookCallback = (req, res) => {
  // const t = setFacebook()
  // console.log(t)
  setFacebook()

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

  console.log('test facebook callback')
  passport.authenticate('facebook', function (err, user, info) {
    console.log('tes inside')
    if (err) { console.log(err) }
  })
  res.send(req.body)

  // passport.authenticate('facebook', function (err, user, info) {
  // //   console.log('testing')
  // })
}

const setFacebook = () => {
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
}
// app.route('/login/facebook').get(passport.authenticate('facebook'))
// app.route('/login/facebook/callback').get(passport.authenticate('facebook', function (err, user, info) {
//   console.log(err, user, info)
//   // console.log('testing')
// }))
