const Habit = require('../models/Habit')

// Helper function to get today's date string
const getTodayStr = () => new Date().toISOString().split('T')[0]

// @desc    Get all habits for user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res, next) => {
  try {
    if (req.user && req.user.isGuest) {
      const today = new Date()
      const d1 = new Date(today); d1.setDate(d1.getDate() - 1);
      const d2 = new Date(today); d2.setDate(d2.getDate() - 2);
      const d3 = new Date(today); d3.setDate(d3.getDate() - 3);
      
      return res.status(200).json({
        success: true,
        data: [
          { _id: 'h1', id: 'h1', name: 'Drink Water', icon: '💧', category: 'Health', frequency: 'daily', streak: 3, completedDates: [d1.toISOString().split('T')[0], d2.toISOString().split('T')[0], d3.toISOString().split('T')[0]] },
          { _id: 'h2', id: 'h2', name: 'Read 10 pages', icon: '📚', category: 'Learning', frequency: 'daily', streak: 0, completedDates: [] },
          { _id: 'h3', id: 'h3', name: 'Morning Walk', icon: '🏃', category: 'Fitness', frequency: 'daily', streak: 1, completedDates: [d1.toISOString().split('T')[0]] }
        ]
      })
    }

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
