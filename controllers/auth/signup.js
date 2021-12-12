const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const { User } = require('../../model')

const mailVerify = require('../../public/mailVerify')
const sendMailVerify = require('../../helpers')

const registrationUser = async (req, res) => {
  const { email, password, balance, name } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }
  const verificationToken = nanoid()
  const newUser = new User({ email, verificationToken, balance, name })
  newUser.setPassword(password)
  await newUser.save()

  const sendMail = {
    to: email,
    subject: 'Confirmation of registration',
    html: `${mailVerify(verificationToken, name)}`,

  }
  await sendMailVerify(sendMail)

  res.json({
    status: 'Success',
    code: 201,
    data: {
      email: newUser.email,
      balance: newUser.balance
    },
  })
}

module.exports = registrationUser
