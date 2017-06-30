const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const polyannoObjectSchema = new Schema({
  imageId: String,
  annotations: String,
  vectors: String,
  translations: String,
  transcriptions: String,
  editors: String

}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

module.exports = mongoose.model('PolyannoObject', polyannoObjectSchema)
