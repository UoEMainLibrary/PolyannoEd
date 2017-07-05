const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const validator = require('validator')

// const UserSchema = new Schema({
//   username: String,
//   password: String
// })

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
  FacebookId: String
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
UserSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', UserSchema)
