const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const transactionRouter = require('./routes/api/transaction')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/transactions', transactionRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {
    status = 500,
    message = 'Sorry. Something went wrong. Try again later',
  } = err

  res.status(status).json({ message })
})

module.exports = app
