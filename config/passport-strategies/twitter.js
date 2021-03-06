const mongoose = require('mongoose')
const User = mongoose.model('User')

const TwitterStrategy = require('passport-twitter').Strategy

const twitterSettings = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
  includeEmail: true,
  passReqToCallback: true
}

const twitterCallback = async (req, accessToken, refreshToken, profile, done) => {
  console.log(profile)
  const userEmail = profile.emails[0].value
  await User.findOne({ 'email': userEmail }, async function (err, user) {
    if (err) { return done(err) }

    if (user) {
      user.twitterId = profile.id
      user.name = profile.displayName
      user.email = profile.emails[0].value

      console.log('=========UpdatedUser============')
      console.log(user)

      user.save(function (err) {
        if (err) { throw err }
        return done(null, user)
      })
    } else {
      const newUser = new User()

      newUser.twitterId = profile.id // set the users facebook id
      newUser.name = profile.displayName // look at the passport user profile to see how names are returned
      newUser.email = profile.emails[0].value // facebook can return multiple emails so we'll take the first
      newUser.authority = 'user'

      // console.log(profile.id, profile.name, profile.displayName, newUser.email)
      console.log(newUser)

      newUser.save(function (err) {
        if (err) { throw err }
        return done(null, newUser)
      })
    }
  })
}

module.exports = new TwitterStrategy(twitterSettings, twitterCallback)
