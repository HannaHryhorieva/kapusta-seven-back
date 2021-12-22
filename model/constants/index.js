const CATEGORY_EXPENSE = [
  'Транспорт',
  'Продукты',
  'Здоровье',
  'Алкоголь',
  'Развлечения',
  'Всё для дома',
  'Техника',
  'Коммуналка, связь',
  'Спорт, хобби',
  'Образование',
  'Прочее',
]

const CATEGORY_INCOME = ['ЗП', 'Доп. доход']

const CATEGORY_ENUM = [...CATEGORY_INCOME, ...CATEGORY_EXPENSE]

module.exports = { CATEGORY_EXPENSE, CATEGORY_INCOME, CATEGORY_ENUM }
