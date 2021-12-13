const { Schema, model } = require('mongoose')
const { CATEGORY_ENUM } = require('./constants')

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
      type: String,
      enum: CATEGORY_ENUM,
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
  }
)

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
