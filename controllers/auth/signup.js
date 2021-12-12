const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const { User } = require('../../model')

const registrationUser = async (req, res) => {
  const { email, password, balance } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }
  const verificationToken = nanoid()
  const newUser = new User({ email, verificationToken, balance })
  newUser.setPassword(password)
  await newUser.save()

  const sendMail = {
    to: email,
    subject: 'Confirmation of registration',
    html: `<a href='http://localhost:3000/api/users/verivy/${verificationToken}'>Verify Email Now</a>`,

  }

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
