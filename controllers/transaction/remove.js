const { NotFound, BadRequest } = require('http-errors')
const { Transaction, User } = require('../../model')

module.exports = async (req, res, next) => {
  const { id } = req.params
  const { _id, balance } = req.user

  const transaction = await Transaction.findOne({
    _id: id,
    owner: _id,
  })

  if (!transaction) {
    return next(new NotFound('Transaction not found!'))
  }

  const { isIncome, amount } = transaction

  if (isIncome && balance < Number(amount)) {
    return next(
      new BadRequest('Deleting of this transaction make your balance negative'),
    )
  }

  await Transaction.findByIdAndRemove(id)

  await User.findByIdAndUpdate(_id, {
    balance: isIncome ? Number(balance) - Number(amount) : Number(balance) + Number(amount),
  })

  res.status(200).json({ message: 'Transaction deleted', data: transaction })
}
