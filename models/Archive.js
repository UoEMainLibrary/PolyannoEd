const mongoose = require('mongoose')
mongoose.Promoise = global.Promise
const Schema = mongoose.Schema

const ArchiveSchema = new Schema({
  title: String,
  url: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  }
})

function autopopulate (next) {
  this.populate('author')
  next()
}

ArchiveSchema.pre('find', autopopulate)
ArchiveSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Archive', ArchiveSchema)
