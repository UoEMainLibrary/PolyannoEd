// const User = require('.../models/User')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const FacebookStrategy = require('passport-facebook').Strategy

const fbSettings = {
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  // clientID: '1422122864547554',
  // clientSecret: '605c6ad1437cb9b66c428d68cbf50f75',
  callbackURL: 'http://localhost:7777/auth/facebook/callback',
  scope: ['email'],
  profileFields:
['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
  enableProof: true,
  passReqToCallback: true
}

const fbCallback = async (req, accessToken, refreshToken, profile, done) => {
  // console.log(`profile id ${profile.id}`)
  // console.log(profile)

  User.findOne({ 'facebookId': profile.id }, function (err, user) {
    if (err) { return done(err) }

    if (user) {
      return done(null, user) // user found, return that user
    } else {
      const newUser = new User()

      newUser.facebookId = profile.id // set the users facebook id
      newUser.name = profile.name.givenName + ' ' + profile.name.familyName // look at the passport user profile to see how names are returned
      newUser.email = profile.emails[0].value // facebook can return multiple emails so we'll take the first

      newUser.save(function (err) {
        if (err) { throw err }
        return done(null, newUser)
      })
    }
  })
}

module.exports = new FacebookStrategy(fbSettings, fbCallback)
