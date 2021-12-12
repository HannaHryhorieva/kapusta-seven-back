const { User } = require('../../model')

const updateBalance = async (req, res) => {
  const { _id } = req.user
  const { balance } = req.body
  await User.findByIdAndUpdate(_id, { balance })

  res.json({
    status: 'success',
    code: 201,
    data: {
      balance
    }
  })
}

module.exports = updateBalance
