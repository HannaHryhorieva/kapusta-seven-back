const { Schema, model } = require('mongoose')

const transactionSchema = Schema(
  {
    month: {
      type: Number,
      default: new Date().getMonth() + 1,
    },
    day: {
      type: Number,
      default: new Date().getUTCDate(),
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Number,
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
    timestamp: {
      type: Number,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
)

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
