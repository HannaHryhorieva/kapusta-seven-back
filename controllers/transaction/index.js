const create = require('./create')
const getAll = require('./getAll')
const remove = require('./remove')
const byYear = require('./byYear')

module.exports = { transactionController: { create, getAll, remove, byYear } }
