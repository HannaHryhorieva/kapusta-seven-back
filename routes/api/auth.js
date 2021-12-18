const express = require('express')
const router = express.Router()

const { controllerWrapper, authenticate } = require('../../middlewares')
const { authCtr } = require('../../controllers/')

router.get('/', controllerWrapper(authCtr.getAllUsers))

router.post('/signup', controllerWrapper(authCtr.registrationUser))

router.get('/google', controllerWrapper(authCtr.googleAuth))

router.get('/google-redirect', controllerWrapper(authCtr.googleRedirect))

router.get('/verify/:verificationToken', controllerWrapper(authCtr.verify))

router.post('/signin', controllerWrapper(authCtr.login))

router.post('/logout', authenticate, controllerWrapper(authCtr.logout))

router.patch('/balance/:idUser', authenticate, controllerWrapper(authCtr.updBalance))

router.get('/users/:userId', authenticate, controllerWrapper(authCtr.getUser))

module.exports = router
