const express = require('express')
const router = express.Router()

const polyannoController = require('../controller/polyannoController')

const authController = require('../controller/authController')

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', authController.home)

router.get('/register', authController.registerForm)

router.post('/register',
  catchErrors(authController.register),
  authController.login
)

// // local authentication (username and password)
// router.get('/login', authController.loginForm)
// router.post('/login', authController.login)

// // facebook authentication
// router.get('/login/facebook', authController.facebook)
// router.get('/auth/facebook/callback/',
//             authController.facebookCallback,
//             authController.home)

// // twitter authentication
// router.get('/login/twitter', authController.twitter)
// router.get('/auth/twitter/callback/',
//             authController.twitterCallback,
//             authController.home)

// logout from all authentication
router.get('/logout', authController.logout)

module.exports = router
