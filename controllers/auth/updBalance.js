const { NotFound } = require('http-errors')
const { User } = require('../../model')

const updateBalance = async (req, res) => {
  const { idUser } = req.params
  const { balance } = req.body
  const user = await User.findByIdAndUpdate(idUser, { balance }, { new: true })
  if (!user) {
    throw new NotFound('User with this id not found')
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      balance: user.balance
    }
  })
}

module.exports = updateBalance
