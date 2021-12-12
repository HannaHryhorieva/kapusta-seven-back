const express = require('express')
const { transactionController } = require('../../controllers/transaction')
const router = express.Router()
const { transactionValidations } = require('../../validations/transaction')

const { controllerWrapper, validate } = require('../../middlewares')

router.get('/', controllerWrapper(transactionController.getAll))
router.get('/byYear/:year', controllerWrapper(transactionController.byYear))

router.post(
  '/',
  validate(transactionValidations.create),
  controllerWrapper(transactionController.create)
)

router.delete('/:id', controllerWrapper(transactionController.remove))

module.exports = router
