const sortTransactionsByType = (data) =>
  data.reduce(
    (acc, item) => {
      const type = item.isIncome ? 'income' : 'expense'
      return { ...acc, [type]: [...acc[type], item] }
    },
    { income: [], expense: [] }
  )

const prepareTransactionsByMonth = (data) =>
  data.reduce(
    (acc, item) => ({
      ...acc,
      [item.month]: {
        data: [...(acc[item.month]?.data || []), item],
        total: (acc[item.month]?.total || 0) + item.amount,
      },
    }),
    {}
  )

const prepareTransactionByCategory = (data) =>
  data.reduce(
    (acc, item) => ({
      [item.category]: {
        data: [...(acc[item.category]?.data || []), item],
        total: (acc[item.category]?.total || 0) + item.amount,
      },
    }),
    {}
  )

module.exports = {
  transactionsUtils: {
    sortTransactionsByType,
    prepareTransactionsByMonth,
    prepareTransactionByCategory,
  },
}
