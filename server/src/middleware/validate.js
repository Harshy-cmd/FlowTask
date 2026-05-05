const { validationResult } = require('express-validator')

const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400)
    // Send back just the first error message or all of them depending on preference
    // For simplicity, we'll map them to a clear string
    const extractedErrors = errors.array().map(err => err.msg)
    throw new Error(extractedErrors.join(', '))
  }
  next()
}

module.exports = {
  validateRequest
}
