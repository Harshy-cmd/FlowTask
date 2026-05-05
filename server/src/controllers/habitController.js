const Habit = require('../models/Habit')

// Helper function to get today's date string
const getTodayStr = () => new Date().toISOString().split('T')[0]

// @desc    Get all habits for user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user.id })
    res.status(200).json({ success: true, data: habits })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res, next) => {
  try {
    const { name, icon, category, frequency } = req.body

    const habit = await Habit.create({
      name,
      icon,
      category,
      frequency,
      user: req.user.id,
    })

    res.status(201).json({ success: true, data: habit })
  } catch (error) {
    next(error)
  }
}

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res, next) => {
  try {
    let habit = await Habit.findById(req.params.id)

    if (!habit) {
      res.status(404)
      throw new Error('Habit not found')
    }

    if (habit.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({ success: true, data: habit })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id)

    if (!habit) {
      res.status(404)
      throw new Error('Habit not found')
    }

    if (habit.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    await habit.deleteOne()

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle habit done status for today
// @route   PATCH /api/habits/:id/toggle
// @access  Private
const toggleHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id)

    if (!habit) {
      res.status(404)
      throw new Error('Habit not found')
    }

    if (habit.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    const today = getTodayStr()
    const index = habit.completedDates.indexOf(today)

    if (index === -1) {
      // Habit is not completed today, so mark as completed
      habit.completedDates.push(today)
      habit.streak += 1
    } else {
      // Habit was completed today, so undo completion
      habit.completedDates.splice(index, 1)
      habit.streak = Math.max(0, habit.streak - 1)
    }

    await habit.save()

    res.status(200).json({ success: true, data: habit })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleHabit,
}
