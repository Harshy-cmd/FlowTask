const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} = require('../controllers/taskController')
const { protect } = require('../middleware/auth')
const { validateRequest } = require('../middleware/validate')

// All task routes require authentication
router.use(protect)

router
  .route('/')
  .get(getTasks)
  .post(
    [
      check('title', 'Title is required').not().isEmpty(),
      validateRequest
    ],
    createTask
  )

router
  .route('/:id')
  .put(updateTask)
  .delete(deleteTask)

router.route('/:id/toggle').patch(toggleTask)

module.exports = router
