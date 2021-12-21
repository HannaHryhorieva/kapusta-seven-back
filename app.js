const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const app = express()

const transactionRouter = require('./routes/api/transaction')
const authRouter = require('./routes/api/auth')
const swaggerRouter = require('./routes/api/swaggerDoc')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/api/transactions', transactionRouter)
app.use('/api/swagger', swaggerRouter)

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
