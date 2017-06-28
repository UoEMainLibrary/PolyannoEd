const mongoose = require('mongoose')
const polyannoObject = require('../models/PolyannoObject')
// const PolyannoObject = polyannoObjectModel.PolyannoObject

exports.saveObjects = async (req, res) => {
  const objectsRemove = await polyannoObject.find().remove()
  const objectsSave = await (new polyannoObject(req.body)).save()
  // res.send(req.body)
  res.send(objectsSave)
}

exports.getObjects = async (req, res) => {
  const objects = await polyannoObject.find()
  // console.log(objects)
  res.render('index', {data: objects[0]})
  // res.render('index')
  // res.json(objects[0])
}

exports.draw = async (req, res) => {
  const objects = await polyannoObject.find()
  res.render('document', {title: 'Document', data: objects})
}
