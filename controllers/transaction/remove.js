const { NotFound } = require('http-errors')
const { Transaction, User } = require('../../model')

module.exports = async (req, res, next) => {
  const { id } = req.params
  const { _id, balance } = req.user

  const transaction = await Transaction.findOne({
    _id: id,
    owner: _id,
  })

  if (!transaction) next(new NotFound('Transaction not found!'))

  const { isIncome, amount } = transaction

  await Transaction.findByIdAndRemove(id)

  await User.findByIdAndUpdate(_id, {
    balance: isIncome ? balance - amount : balance + amount,
  })

  res.status(200).json({ message: 'Transaction deleted', data: transaction })
}
