const { Transaction, User } = require('../../model')
const { BadRequest } = require('http-errors')

module.exports = async (req, res, next) => {
  const { _id, balance = 0 } = req.user
  const { amount, isIncome } = req.body

  if (!isIncome && amount > balance) {
    next(new BadRequest('Amount is greater than balance'))
  }

  const transaction = await new Transaction({ ...req.body, owner: _id })

  await User.findByIdAndUpdate(_id, {
    balance: isIncome ? balance + amount : balance - amount,
  })

  await transaction.save()

  res.status(201).json({ message: 'Transaction created', data: transaction })
}
