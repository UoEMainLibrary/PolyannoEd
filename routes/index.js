const express = require('express')
const router = express.Router()

const polyannoController = require('../controller/polyannoController')

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', polyannoController.getObjects)

router.get('/document', polyannoController.draw)

router.post('/document', (req, res) => {
  console.log(req.body)
  res.send(req.body)
  // res.render('document', {title: 'Document', data: req.body})
})

router.post('/save', polyannoController.saveObjects)

module.exports = router
