const mongoose = require('mongoose')
mongoose.Promoise = global.Promise
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const validator = require('validator')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  facebookId: String,
  twitterId: String,
  authority: String
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', UserSchema)
