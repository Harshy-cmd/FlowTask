const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { register, login, getMe, guestLogin } = require('../controllers/authController')
const { protect } = require('../middleware/auth')
const { validateRequest } = require('../middleware/validate')

router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    validateRequest
  ],
  register
)

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    validateRequest
  ],
  login
)

router.get('/me', protect, getMe)

router.post('/guest', guestLogin)

module.exports = router
