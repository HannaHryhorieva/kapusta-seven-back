const { NotFound } = require('http-errors')
const Transaction = require('../../model/transaction')

module.exports = async (req, res, next) => {
  const { id } = req.params
  const { _id } = req.user

  const transaction = await Transaction.findOneAndDelete({
    _id: id,
    owner: _id,
  })

  if (!transaction) next(new NotFound('Transaction not found!'))

  res.status(200).json({ message: 'Transaction deleted', data: transaction })
}
