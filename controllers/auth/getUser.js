const { User } = require('../../model')
const { NotFound } = require('http-errors')

const getUser = async(req, res) => {
  const { token } = req.params
  const user = await User.find()
  const userFind = user.find(user => {
    return user.token === token ? user : null
  })
  if (!userFind) {
    throw new NotFound('User with this email not found. Please register!')
  }
  const { _id, email, name, date, picture, verify, balance } = userFind
  res.json({
    status: 'success',
    code: 201,
    data: {
      _id,
      email,
      name,
      balance,
      token: userFind.token,
      date,
      picture,
      verify
    }
  })
}

module.exports = getUser
