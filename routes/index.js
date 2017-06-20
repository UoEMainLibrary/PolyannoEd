const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/beginnertutorial', function (req, res) {
  res.redirect('/beginnertutorial.html')
})

router.get('/aboutus', function (req, res) {
  res.redirect('/aboutus.html')
})

module.exports = router
