const Transaction = require('../../model/transaction')

module.exports = async (req, res, next) => {
  const { _id } = req.user

  const transaction = await new Transaction({ ...req.body, owner: _id })

  await transaction.save()

  res.status(201).json({ message: 'Transaction created', data: transaction })
}
