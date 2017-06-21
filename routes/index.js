const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('layout')
})

router.get('/document', (req, res) => {
  res.render('document', {title: 'Document'})
})

module.exports = router
