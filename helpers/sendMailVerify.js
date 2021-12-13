const nodemailer = require('nodemailer')
require('dotenv').config()

const sendMailVerify = async(mail) => {
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
    from: 'supp0rt.kapusta@gmail.com', ...mail,
  }

  await transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info.accepted))
    .catch((err) => console.log(err))
}
module.exports = sendMailVerify
