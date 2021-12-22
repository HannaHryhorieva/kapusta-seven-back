module.exports = (schema) => {
  const validationMiddleware = (req, _, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      error.status = 400
      next(error)
    }
    next()
  }

  return validationMiddleware
}
