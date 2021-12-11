const registrationUser = require('./signup')
const { googleAuth, googleRedirect } = require('./googleAuth')

module.exports = {
  registrationUser,
  googleAuth,
  googleRedirect
}
