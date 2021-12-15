const { Transaction, User } = require('../../model')
const { BadRequest } = require('http-errors')
const { CATEGORY_EXPENSE, CATEGORY_INCOME } = require('../../model/constants')
const { transactionsUtils } = require('../../utils/transactions')

module.exports = async (req, res, next) => {
  const {
    month: currMonth,
    year: currYear,
    day: currDay,
    hours: currHours,
    minutes: currMinutes,
    date: currDate,
  } = transactionsUtils.getCurrDate()

  const { _id, balance = 0 } = req.user
  const {
    amount,
    isIncome = true,
    category,
    month = currMonth - 1,
    year = currYear,
    day = currDay,
  } = req.body

  const requestedDate = new Date(
    Date.UTC(year, month - 1, day, currHours, currMinutes)
  )
  const timestamp = requestedDate.getTime()

  if (requestedDate > currDate) return next(new BadRequest('Date is in future'))

  if (!isIncome && amount > balance) {
    return next(new BadRequest('Amount is greater than balance'))
  }

  const isCategoryNotCompareToTransaction = isIncome
    ? !CATEGORY_INCOME.includes(category)
    : !CATEGORY_EXPENSE.includes(category)

  if (isCategoryNotCompareToTransaction) {
    return next(
      new BadRequest(`This transaction type have no ${category} category`)
    )
  }

  const transaction = await new Transaction({
    ...req.body,
    owner: _id,
    timestamp,
  })

  await User.findByIdAndUpdate(_id, {
    balance: isIncome ? balance + amount : balance - amount,
  })

  await transaction.save()

  res.status(201).json({ message: 'Transaction created', data: transaction })
}
