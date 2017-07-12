const mongoose = require('mongoose')
const User = mongoose.model('User')

const FacebookStrategy = require('passport-facebook').Strategy

const fbSettings = {
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: process.env.FB_CALLBACK_URL,
  scope: ['email'],
  profileFields: ['id', 'displayName', 'email'],
  enableProof: true,
  passReqToCallback: true
}

const fbCallback = async (req, accessToken, refreshToken, profile, done) => {
  console.log('-------profile--------')
  console.log(profile)
  const userEmail = profile.emails[0].value
  await User.findOne({ 'email': userEmail }, async function (err, user) {
    console.log('=========User=========')
    console.log(user)
    if (err) { return done(err) }

    if (user) {
      user.facebookId = profile.id
      user.name = profile.displayName
      user.email = profile.emails[0].value

      console.log('=========UpdatedUser============')
      console.log(user)

      user.save(function (err) {
        if (err) { throw err }
        return done(null, user)
      })
      // return done(null, user) // user found, return that user
    } else {
      const newUser = new User()

      newUser.facebookId = profile.id // set the users facebook id
      newUser.name = profile.displayName // look at the passport user profile to see how names are returned
      newUser.email = profile.emails[0].value // facebook can return multiple emails so we'll take the first

      console.log('=========new user============')
      console.log(newUser)

      newUser.save(function (err) {
        if (err) { throw err }
        return done(null, newUser)
      })
    }
  })
}

module.exports = new FacebookStrategy(fbSettings, fbCallback)
