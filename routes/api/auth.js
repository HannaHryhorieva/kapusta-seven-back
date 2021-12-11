const express = require('express')
const router = express.Router()

const { controllerWrapper } = require('../../middlewares')
const { authCtr } = require('../../controllers/')

router.post('/signup', controllerWrapper(authCtr.registrationUser))
router.get('/google', controllerWrapper(authCtr.googleAuth))
router.get('/google-redirect', controllerWrapper(authCtr.googleRedirect))

module.exports = router
