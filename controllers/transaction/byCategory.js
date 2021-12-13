const Transaction = require('../../model/transaction')
const { transactionsUtils } = require('../../utils/transactions')

module.exports = async (req, res) => {
  const { _id } = req.user
  const { year, month } = req.params

  const transactions = await Transaction.find({ owner: _id, year, month })

  const data = transactionsUtils.prepareTransactionByCategory(transactions)

  res.status(200).json({
    message: 'Existed transactions with categories',
    data,
  })
}
