const Transaction = require('../../model/transaction')

module.exports = async (req, res, next) => {
  const { _id } = req.user
  const { year, month } = req.params

  const transactions = await Transaction.find({ owner: _id, month, year })

  const sortedTransactions = transactions.sort(
    (a, b) => b.timestamp - a.timestamp
  )

  res
    .status(200)
    .json({ message: 'Existed transactions', data: sortedTransactions })
}
