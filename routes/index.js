const express = require('express')
const router = express.Router()

const polyannoController = require('../controller/polyannoController')

var authController = require('../controller/authController')

// const { catchErrors } = require('../handlers/errorHandlers')

// router.get('/', polyannoController.getObjects)

router.get('/document', polyannoController.draw)
router.get('/document/:imageId', polyannoController.getObjects)

router.post('/save', polyannoController.saveObjects)

// restrict index for logged in user only
router.get('/', authController.home)

// route to register page
router.get('/register', authController.registerForm)

// route for register action
router.post('/register',
  authController.register,
  authController.login
)

// route to login page
router.get('/login', authController.loginForm)

// route for login action
router.post('/login', authController.login)

// route for logout action
router.get('/logout', authController.logout)

// router.get('/login/facebook', authController.facebook)

router.get('/login/facebook/callback', authController.facebookCallback)

// const passport = require('passport')
// router.get('/login/facebook/callback', (req, res) => {
//   passport.authenticate('facebook', function (err, user, info) {
//     console.log('testing')
//   })
// }
// )

module.exports = router
