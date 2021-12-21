const { Unauthorized, NotFound } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../model')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const allUsers = await User.find()
    const [bearer, token] = req.headers.authorization.split(' ')
    const userFind = allUsers.find((user) => {
      return user.token === token ? user : null
    })
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }
    if (userFind.token !== token) {
      throw new Unauthorized('Invalid token')
    }
    try {
      if (!userFind.isGoogle) {
        const { id } = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id)
        if (!user || !userFind) {
          throw new NotFound('User not found!')
        }
        if (!user.token || user.token !== token) {
          throw new Unauthorized('Invalid token')
        }
        req.user = user
      } else {
        req.user = userFind
      }
      next()
    } catch (error) {
      throw new Unauthorized('Invalid token')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
