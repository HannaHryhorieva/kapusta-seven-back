const Transaction = require('../../model/transaction')

module.exports = async (req, res, next) => {
  const { _id } = req.user

  const data = await Transaction.find({ owner: _id })

  res.status(200).json({ message: 'Existed transactions', data })
}
