const { User } = require('../../model')
const { NotFound } = require('http-errors')

const getUser = async(req, res) => {
  const { userId } = req.params
  const user = await User.findById(userId)

  if (!user) {
    throw new NotFound('User with this email not found. Please register!')
  }
  const { _id, email, name, token, date, picture, verify, balance } = user
  res.json({
    status: 'success',
    code: 201,
    data: {
      _id,
      email,
      name,
      balance,
      token,
      date,
      picture,
      verify
    }
  })
}

module.exports = getUser
