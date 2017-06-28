const PolyannoObject = require('../models/PolyannoObject')

exports.saveObjects = async (req, res) => {
  await PolyannoObject.find().remove()

  const objectsSave = await (new PolyannoObject(req.body)).save()
  res.send(objectsSave)
}

exports.getObjects = async (req, res) => {
  const objects = await PolyannoObject.find()
  res.render('index', {data: objects[0]})
}

exports.draw = async (req, res) => {
  const objects = await PolyannoObject.find()
  res.render('document', {title: 'Document', data: objects})
}
