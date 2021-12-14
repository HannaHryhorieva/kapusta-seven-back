const { Transaction, User } = require('../../model')
const { BadRequest } = require('http-errors')
const { CATEGORY_EXPENSE, CATEGORY_INCOME } = require('../../model/constants')

module.exports = async (req, res, next) => {
  const { _id, balance = 0 } = req.user
  const { amount, isIncome = true, category } = req.body

  if (!isIncome && amount > balance) {
    return next(new BadRequest('Amount is greater than balance'))
  }

  const isCategoryNotCompareToTransaction = isIncome
    ? !CATEGORY_INCOME.includes(category)
    : !CATEGORY_EXPENSE.includes(category)

  if (isCategoryNotCompareToTransaction) {
    return next(
      new BadRequest(`This transaction type have no ${category} category`)
    )
  }

  const transaction = await new Transaction({ ...req.body, owner: _id })

  await User.findByIdAndUpdate(_id, {
    balance: isIncome ? balance + amount : balance - amount,
  })

  await transaction.save()

  res.status(201).json({ message: 'Transaction created', data: transaction })
}
