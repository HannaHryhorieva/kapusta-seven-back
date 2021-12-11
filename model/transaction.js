const { Schema, model } = require('mongoose')

const transactionSchema = Schema({
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isIncome: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
},
{
  versionKey: false,
})

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
