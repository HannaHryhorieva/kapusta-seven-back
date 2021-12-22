const Transaction = require('../../model/transaction')
const { transactionsUtils } = require('../../utils/transactions')

module.exports = async (req, res) => {
  const { _id } = req.user
  const { year, month } = req.params

  const transactions = await Transaction.find({ owner: _id, year, month })

  const { income: transactionsIncome, expense: transactionsExpense } =
    transactionsUtils.sortTransactionsByType(transactions)

  const income =
    transactionsUtils.prepareTransactionByCategory(transactionsIncome)
  const expense =
    transactionsUtils.prepareTransactionByCategory(transactionsExpense)

  res.status(200).json({
    message: 'Existed transactions with categories',
    data: { income, expense },
  })
}
