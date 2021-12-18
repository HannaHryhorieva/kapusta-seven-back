const { Transaction, User } = require('../../model')

module.exports = async (req, res, next) => {
  const { isIncome, amount } = req.body
  const { _id, balance } = req.user

  const transaction = await new Transaction({ ...req.body, owner: _id })

  await User.findByIdAndUpdate(_id, {
    balance: isIncome ? Number(balance) + Number(amount) : balance - amount,
  })

  await transaction.save()

  res.status(201).json({ message: 'Transaction created', data: transaction })
}
