const Transaction = require('../../model/transaction')

module.exports = async (req, res, next) => {
  const data = await Transaction.find({})

  res.status(200).json({ message: 'Existed transactions', data })
}
