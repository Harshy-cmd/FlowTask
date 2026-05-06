const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Handle guest bypass
      if (decoded.isGuest) {
        req.user = { _id: 'guest', name: 'Guest User', isGuest: true }
        return next()
      }

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        res.status(401)
        throw new Error('Not authorized, user not found')
      }

      next()
    } catch (error) {
      res.status(401)
      next(new Error('Not authorized, token failed'))
    }
  }

  if (!token) {
    res.status(401)
    next(new Error('Not authorized, no token'))
  }
}

const restrictGuest = (req, res, next) => {
  if (req.user && req.user.isGuest) {
    res.status(403)
    return next(new Error('Guest users are not allowed to perform this action. Create an account to save your progress.'))
  }
  next()
}

module.exports = { protect, restrictGuest }
