const Transaction = require('../../model/transaction')
const { transactionsUtils } = require('../../utils/transactions')

module.exports = async (req, res) => {
  const { _id } = req.user
  const { year } = req.params

  const transactions = await Transaction.find({ owner: _id, year })

  const { income: transactionsIncome, expense: transactionsExpense } =
    transactionsUtils.sortTransactionsByType(transactions)

  const income =
    transactionsUtils.prepareTransactionsByMonth(transactionsIncome)
  const expense =
    transactionsUtils.prepareTransactionsByMonth(transactionsExpense)

  res.status(200).json({
    message: 'Existed transactions',
    data: { income, expense },
  })
}
