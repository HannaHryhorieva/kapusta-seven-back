const { BadRequest } = require('http-errors')
const { CATEGORY_INCOME, CATEGORY_EXPENSE } = require('../../model/constants')
const { transactionsUtils } = require('../../utils/transactions')

const createTransactionGuard = async (req, res, next) => {
  try {
    const {
      month: currMonth,
      year: currYear,
      day: currDay,
      hours: currHours,
      minutes: currMinutes,
      date: currDate,
    } = transactionsUtils.getCurrDate()

    const { balance = 0 } = req.user

    const {
      amount,
      isIncome = true,
      category,
      month = currMonth - 1,
      year = currYear,
      day = currDay,
    } = req.body
    const amountNum = Number(amount)
    const requestedDate = new Date(
      Date.UTC(year, month - 1, day, currHours, currMinutes),
    )
    const timestamp = requestedDate.getTime()

    if (requestedDate > currDate) {
      return next(new BadRequest('Date is in future'))
    }

    if (requestedDate.getUTCDate() !== day) {
      return next(new BadRequest('Impossible date'))
    }

    if (!isIncome && amountNum > balance) {
      return next(new BadRequest('Amount is greater than balance'))
    }

    const isCategoryNotCompareToTransaction = isIncome
      ? !CATEGORY_INCOME.includes(category)
      : !CATEGORY_EXPENSE.includes(category)

    if (isCategoryNotCompareToTransaction) {
      return next(
        new BadRequest(`This transaction type have no ${category} category`),
      )
    }

    req.body.timestamp = timestamp
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = createTransactionGuard
