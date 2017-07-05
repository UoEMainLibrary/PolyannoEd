const express = require('express')
const router = express.Router()

const polyannoController = require('../controller/polyannoController')

var authController = require('../controller/authController')

// const { catchErrors } = require('../handlers/errorHandlers')

router.get('/document', polyannoController.draw)
router.get('/document/:imageId', polyannoController.getObjects)

router.post('/save', polyannoController.saveObjects)

router.get('/', authController.home)

router.get('/register', authController.registerForm)

router.post('/register',
  authController.register,
  authController.login
)

router.get('/login', authController.loginForm)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

router.get('/auth/facebook/callback/', authController.facebookCallback, (req, res) => {
  res.render('index')
})
router.get('/login/facebook', authController.facebook)

module.exports = router
