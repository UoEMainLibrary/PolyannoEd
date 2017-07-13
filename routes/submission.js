const express = require('express')
const router = express.Router()

// const { catchErrors } = require('../handlers/errorHandlers')

const archiveController = require('../controller/archiveController')
const authController = require('../controller/authController')

router.get('/archive', authController.isLoggedIn, archiveController.submission)

router.post('/archive', authController.isLoggedIn, archiveController.addArchive)

module.exports = router
