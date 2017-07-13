const PolyannoObject = require('../models/PolyannoObject')

exports.saveObjects = async (req, res) => {
  await PolyannoObject.find({imageId: req.body.imageId}).remove()

  const objectsSave = await (new PolyannoObject(req.body)).save()
  res.send(objectsSave)
}

exports.getObjects = async (req, res, next) => {
  const imageId = req.params.imageId
  const objects = await PolyannoObject.findOne({ imageId: imageId })

  if (objects) { res.send(objects) } else { res.send(`[no data] there is no ${imageId}`) }
}

exports.draw = async (req, res, next) => {
  const objects = await PolyannoObject.find()
  res.render('document', {title: 'Document', polyannoData: objects, identifier: req.params.identifier, user: req.user})
}
