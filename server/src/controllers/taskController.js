const Task = require('../models/Task')

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.status(200).json({ success: true, data: tasks })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, category, priority, dueDate, tags } = req.body

    const task = await Task.create({
      title,
      category,
      priority,
      dueDate,
      tags,
      user: req.user.id,
    })

    res.status(201).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id)

    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }

    // Check for user ownership
    if (task.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }

    // Check for user ownership
    if (task.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    await task.deleteOne()

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle task done status
// @route   PATCH /api/tasks/:id/toggle
// @access  Private
const toggleTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      res.status(404)
      throw new Error('Task not found')
    }

    // Check for user ownership
    if (task.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    task.done = !task.done
    await task.save()

    res.status(200).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
}
