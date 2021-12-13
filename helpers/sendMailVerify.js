const nodemailer = require('nodemailer')
require('dotenv').config()

const sendMailVerify = (mail) => {
  console.log(mail)
  const config = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'supp0rt.kapusta@gmail.com',
      pass: process.env.SEND_MAIL_PASS,
    },
  }

  const transporter = nodemailer.createTransport(config)
  const emailOptions = {
    ...mail,
    from: 'supp0rt.kapusta@gmail.com',
  }

  return transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err))
}
module.exports = sendMailVerify
