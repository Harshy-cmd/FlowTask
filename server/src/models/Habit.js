const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a habit name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    icon: {
      type: String,
      default: '🎯',
    },
    category: {
      type: String,
      enum: ['Wellness', 'Health', 'Learning', 'Fitness', 'Mindfulness', 'All'],
      default: 'Wellness',
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly'],
      default: 'daily',
    },
    streak: {
      type: Number,
      default: 0,
    },
    completedDates: {
      type: [String], // Array of YYYY-MM-DD strings
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Habit', habitSchema)
