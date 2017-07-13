const express = require('express')
const router = express.Router()

const authController = require('../controller/authController')

// local authentication (username and password)
router.get('/', authController.loginForm)
router.post('/', authController.login)

// facebook authentication
router.get('/facebook', authController.facebook)
router.get('/facebook/callback/',
            authController.facebookCallback,
            authController.home)

// twitter authentication
router.get('/twitter', authController.twitter)
router.get('/twitter/callback/',
            authController.twitterCallback,
            authController.home)

module.exports = router
