const express = require('express')
const { transactionController } = require('../../controllers/transaction')
const { transactionValidations } = require('../../validations/transaction')
const router = express.Router()

const {
  controllerWrapper,
  validate,
  authenticate,
} = require('../../middlewares')

router.get('/', authenticate, controllerWrapper(transactionController.getAll))
router.get(
  '/byYear/:year',
  authenticate,
  controllerWrapper(transactionController.byYear)
)
router.get(
  '/byCategory/:year',
  authenticate,
  controllerWrapper(transactionController.byCategory)
)

router.post(
  '/',
  authenticate,
  validate(transactionValidations.create),
  controllerWrapper(transactionController.create)
)

router.delete(
  '/:id',
  authenticate,
  controllerWrapper(transactionController.remove)
)

module.exports = router
