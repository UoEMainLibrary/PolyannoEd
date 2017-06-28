const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const polyannoObjectSchema = new Schema({
  annotations: String,
  vectors: String

}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model('PolyannoObject', polyannoObjectSchema)
