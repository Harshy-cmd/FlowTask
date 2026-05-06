const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabit,
} = require('../controllers/habitController')
const { protect, restrictGuest } = require('../middleware/auth')
const { validateRequest } = require('../middleware/validate')

// All habit routes require authentication
router.use(protect)

router
  .route('/')
  .get(getHabits)
  .post(
    restrictGuest,
    [
      check('name', 'Name is required').not().isEmpty(),
      validateRequest
    ],
    createHabit
  )

router
  .route('/:id')
  .put(restrictGuest, updateHabit)
  .delete(restrictGuest, deleteHabit)

router.route('/:id/toggle').patch(restrictGuest, toggleHabit)

module.exports = router
