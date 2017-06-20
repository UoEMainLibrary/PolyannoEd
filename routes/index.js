const express = require('express')
const router = express.Router()

const editorController = require('../controller/editorController')

router.get('/', (req, res) => {
  res.render('layout')
})

router.get('/beginnertutorial', function (req, res) {
  res.redirect('/beginnertutorial.html')
})

router.get('/aboutus', function (req, res) {
  res.redirect('/aboutus.html')
})

router.get('/editors/:name',
  editorController.edit
)

module.exports = router
