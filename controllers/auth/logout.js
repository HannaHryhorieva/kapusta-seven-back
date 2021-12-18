const { User } = require('../../model')

const logout = async (req, res) => {
  console.log(req)
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json({ message: 'User logged out' })
}

module.exports = logout
