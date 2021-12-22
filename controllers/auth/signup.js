const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const moment = require('moment')
const { User } = require('../../model')

const mailVerify = require('../../public/mailVerify')
const sendMailVerify = require('../../helpers')

const registrationUser = async (req, res) => {
  const { email, password, name } = req.body
  const date = moment().format('DD.MM.YYYY_hh:mm:ss a')
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`Email ${email} in use`)
  }
  const verificationToken = nanoid()
  const newUser = new User({ email, verificationToken, name, date })
  newUser.setPassword(password)
  await newUser.save()
  const { _id, date: dateReg, email: mail, name: nameUs, verificationToken: verToken } = newUser

  const sendMail = {
    to: email,
    subject: 'Confirmation of registration',
    html: `${mailVerify(verificationToken, name)}`,
  }
  await sendMailVerify(sendMail)

  res.json({
    status: 'success',
    code: 201,
    data: {
      _id,
      date: dateReg,
      email: mail,
      name: nameUs,
      verificationToken: verToken
    },
  })
}

module.exports = registrationUser
