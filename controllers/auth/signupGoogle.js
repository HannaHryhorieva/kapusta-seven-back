const { Conflict } = require('http-errors')
const { User } = require('../../model')
const mailVerify = require('../../public/mailVerify')
const sendMailVerify = require('../../helpers')

const signupGoogleAuth = (userData) => {
  const signupGoogle = async (res, req) => {
    const { id: verificationToken, name, email, picture } = userData.data
    const { Authorization: token } = userData.config.headers
    console.log(token)
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict(`Email ${email} in use`)
    }
    const newUser = new User({ email, name, picture, token, verificationToken })
    await newUser.save()

    const sendMail = {
      to: email,
      subject: 'Confirmation of registration',
      html: `${mailVerify(verificationToken, name)}`,
    }
    await sendMailVerify(sendMail)
    res.json({
      status: 'Success',
      code: 200,
      data: {
        token: newUser.token,
        email: newUser.email,
        name: newUser.name,
        picture: newUser.picture
      },
    })
  }
  return signupGoogle()
}

module.exports = signupGoogleAuth
