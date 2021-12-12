const Transaction = require('../../model/transaction')

module.exports = async (req, res, next) => {
  const transaction = await new Transaction(req.body)

  await transaction.save()

  res.status(201).json({ message: 'Transaction created', data: transaction })
}
