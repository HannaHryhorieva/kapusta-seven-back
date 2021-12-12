const nodemailer = require('nodemailer')

require('dotenv').config()

const config = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'goitnodejs@meta.ua',
    pass: process.env.PASSWORD,
  },
}

const transporter = nodemailer.createTransport(config)
const emailOptions = {
  from: 'supp0rt.kapusta@gmail.com',
  to: 'noresponse@gmail.com',
  subject: 'Nodemailer test',
  text: 'Привет. Мы тестируем отправку писем!',
}

transporter
  .sendMail(emailOptions)
  .then((info) => console.log(info))
  .catch((err) => console.log(err))
