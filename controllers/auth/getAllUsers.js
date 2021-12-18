const { User } = require('../../model')

const getAllUsers = async(req, res) => {
  const user = await User.find()
  const dataUser = user.map(users => {
    const newUsersObj = {
      _id: users._id,
      date: users.date,
      email: users.email,
      name: users.name,
      picture: users.picture,
      avatarURL: users.avatarURL,
      balance: users.balance,
      isGoogle: users.isGoogle,
      verify: users.verify,
      token: users.token,
    }
    const newUserArr = { ...newUsersObj }
    return newUserArr
  })

  res.json({
    status: 'success',
    code: 200,
    data: [...dataUser]
  })
}

module.exports = getAllUsers
