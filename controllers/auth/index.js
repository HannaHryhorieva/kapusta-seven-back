const registrationUser = require('./signup')
const { googleAuth, googleRedirect } = require('./googleAuth')
const login = require('./signin')
const verify = require('./verify')
const updBalance = require('./updBalance')

module.exports = {
  registrationUser,
  googleAuth,
  googleRedirect,
  login,
  verify,
  updBalance
}
