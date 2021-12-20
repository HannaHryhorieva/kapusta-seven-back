const Joi = require('joi')

const createTransactionSchema = Joi.object({
  description: Joi.string().min(1).max(44).required(),
  category: Joi.number().min(0).max(10).required(),
  amount: Joi.number().strip().min(1).required(),
  isIncome: Joi.boolean(),
  month: Joi.number().min(1).max(12),
  day: Joi.number().min(1).max(31),
  year: Joi.number().min(2001),
})

module.exports = { transactionValidations: { create: createTransactionSchema } }
