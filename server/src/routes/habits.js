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
const { protect } = require('../middleware/auth')
const { validateRequest } = require('../middleware/validate')

// All habit routes require authentication
router.use(protect)

router
  .route('/')
  .get(getHabits)
  .post(
    [
      check('name', 'Name is required').not().isEmpty(),
      validateRequest
    ],
    createHabit
  )

router
  .route('/:id')
  .put(updateHabit)
  .delete(deleteHabit)

router.route('/:id/toggle').patch(toggleHabit)

module.exports = router
