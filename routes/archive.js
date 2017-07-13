const express = require('express')
const router = express.Router()

const polyannoController = require('../controller/polyannoController')

const authController = require('../controller/authController')

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', catchErrors(polyannoController.draw))
router.get('/manifest/:identifier', catchErrors(polyannoController.draw))
router.get('/:imageId', catchErrors(polyannoController.getObjects))

router.post('/save', authController.isLoggedIn, catchErrors(polyannoController.saveObjects))

module.exports = router
