const Transaction = require('../../model/transaction')
const { transactionsUtils } = require('../../utils/transactions')

module.exports = async (req, res) => {
  const { year } = req.params
  const transactions = await Transaction.find({ year })

  const { income: transactionsIncome, expense: transactionsExpense } =
    transactionsUtils.sortTransactionsByType(transactions)

  const income = transactionsUtils.prepareYearlyTransactions(transactionsIncome)
  const expense =
    transactionsUtils.prepareYearlyTransactions(transactionsExpense)

  res.status(200).json({
    message: 'Existed transactions',
    data: { income, expense },
  })
}
