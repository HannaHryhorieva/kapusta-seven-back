const Joi = require('joi')

const createTransactionSchema = Joi.object({
  description: Joi.string().min(4).max(44).required(),
  category: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  isIncome: Joi.boolean(),
  month: Joi.number().min(1).max(12),
  day: Joi.number().min(1).max(31),
  year: Joi.number().min(2001),
})

module.exports = { transactionValidations: { create: createTransactionSchema } }
