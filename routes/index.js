const express = require('express')
const router = express.Router()

const polyannoController = require('../controller/polyannoController')

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', polyannoController.getObjects)

router.get('/document', polyannoController.draw)
router.get('/document/:imageId', polyannoController.getObjects)

router.post('/save', polyannoController.saveObjects)

module.exports = router
