const mongoose = require('mongoose')
const User = mongoose.model('User')

const FacebookStrategy = require('passport-facebook').Strategy

const fbSettings = {
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: process.env.FB_CALLBACK_URL,
  scope: ['email'],
  profileFields: ['id', 'displayName', 'first_name', 'middle_name', 'last_name', 'email', 'photos', 'hometown'],
  enableProof: true,
  passReqToCallback: true
}

const fbCallback = async (req, accessToken, refreshToken, profile, done) => {
  console.log('-------profile--------')
  console.log(profile)
  const userEmail = profile.emails[0].value
  await User.findOne({ 'email': userEmail }, async function (err, user) {
    if (err) { return done(err) }

    if (user) {
      const updatedUser = await User.findOneAndUpdate({ 'email': userEmail }, profile, {
        new: true, // return the new store instead of the old one
        runValidators: true
      }).exec()
      console.log(updatedUser)
      return done(null, user) // user found, return that user
    } else {
      const newUser = new User()

      newUser.facebookId = profile.id // set the users facebook id
      newUser.name = profile.name.givenName + ' ' + profile.name.familyName // look at the passport user profile to see how names are returned
      newUser.email = profile.emails[0].value // facebook can return multiple emails so we'll take the first

      console.log(newUser)

      newUser.save(function (err) {
        if (err) { throw err }
        return done(null, newUser)
      })
    }
  })
}

module.exports = new FacebookStrategy(fbSettings, fbCallback)
