const express = require('express')
const { transactionController } = require('../../controllers/transaction')
const { transactionValidations } = require('../../validations/transaction')
const {
  controllerWrapper,
  validate,
  authenticate,
  createTransactionGuard,
} = require('../../middlewares')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(transactionController.getAll))
router.get(
  '/byYear/:year',
  authenticate,
  controllerWrapper(transactionController.byYear)
)
router.get(
  '/byCategory/:year/:month',
  authenticate,
  controllerWrapper(transactionController.byCategory)
)
router.get(
  '/byMonth/:year/:month',
  authenticate,
  controllerWrapper(transactionController.byMonth)
)

router.post(
  '/',
  authenticate,
  validate(transactionValidations.create),
  createTransactionGuard,
  controllerWrapper(transactionController.create)
)

router.delete(
  '/:id',
  authenticate,
  controllerWrapper(transactionController.remove)
)

module.exports = router
