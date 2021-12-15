const create = require('./create')
const getAll = require('./getAll')
const remove = require('./remove')
const byYear = require('./byYear')
const byCategory = require('./byCategory')
const byMonth = require('./byMonth')

module.exports = {
  transactionController: {
    create,
    getAll,
    remove,
    byYear,
    byCategory,
    byMonth,
  },
}
