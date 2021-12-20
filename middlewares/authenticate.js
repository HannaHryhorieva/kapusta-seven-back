const { Unauthorized, NotFound } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../model')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const allUsers = await User.find()
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    const userFind = allUsers.find(user => { return user.token === token ? user : null })
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }
    if (!userFind || userFind.token !== token) {
      throw new Unauthorized('Invalid token')
    }
    // console.log(userFind.isGoogle)
    if (!userFind.isGoogle) {
      try {
        const { id } = jwt.verify(token, SECRET_KEY)

        const user = await User.findById(id)
        console.log(user)
        if (!user || !userFind) {
          throw new NotFound('User not found!')
        }
        if (!user.token || user.token !== token) {
          throw new Unauthorized('Invalid token')
        }
        req.user = user

        next()
      } catch (error) {
        throw new Unauthorized('Invalid token')
      }
    }

    req.user = userFind
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
