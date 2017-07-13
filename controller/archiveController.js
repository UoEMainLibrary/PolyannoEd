const Archive = require('../models/Archive')

exports.submission = (req, res) => {
  res.render('submit', {user: req.user})
}

exports.addArchive = async (req, res, next) => {
  req.body.author = req.user._id

  const newArchive = Archive(req.body)
  await newArchive.save()

  req.flash('success', 'You have added an archive')

  next()
}

exports.getArchives = async (req, res) => {
  const archives = await Archive.find()
  console.log(archives)

  res.render('index', {user: req.user, archives: archives})
}
