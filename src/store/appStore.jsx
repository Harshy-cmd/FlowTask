import { useState, createContext, useContext } from 'react'

const initialTasks = [
  { id: 1, title: 'Design new dashboard layout', category: 'Work', priority: 'high', done: false, dueDate: '2026-04-22', tags: ['design', 'ui'] },
  { id: 2, title: 'Morning workout session', category: 'Health', priority: 'medium', done: true, dueDate: '2026-04-20', tags: ['fitness'] },
  { id: 3, title: 'Read "Atomic Habits" chapter 4', category: 'Learning', priority: 'low', done: false, dueDate: '2026-04-21', tags: ['books'] },
  { id: 4, title: 'Weekly team standup', category: 'Work', priority: 'high', done: true, dueDate: '2026-04-20', tags: ['meeting'] },
  { id: 5, title: 'Grocery shopping', category: 'Personal', priority: 'medium', done: false, dueDate: '2026-04-21', tags: ['errands'] },
  { id: 6, title: 'Code review for feature branch', category: 'Work', priority: 'high', done: false, dueDate: '2026-04-22', tags: ['dev'] },
  { id: 7, title: 'Meditate 10 minutes', category: 'Health', priority: 'low', done: true, dueDate: '2026-04-20', tags: ['wellness'] },
  { id: 8, title: 'Update portfolio website', category: 'Personal', priority: 'medium', done: false, dueDate: '2026-04-25', tags: ['dev', 'design'] },
]

const initialHabits = [
  { id: 1, name: 'Morning Meditation', icon: '🧘', streak: 12, completedToday: true, frequency: 'daily', category: 'Wellness', history: [1,1,1,1,1,0,1,1,1,1,1,1,1,1], color: '#064734' },
  { id: 2, name: 'Read 30 minutes', icon: '📚', streak: 7, completedToday: false, frequency: 'daily', category: 'Learning', history: [1,1,0,1,1,1,1,1,1,0,1,1,1,1], color: '#064734' },
  { id: 3, name: 'Drink 2L Water', icon: '💧', streak: 21, completedToday: true, frequency: 'daily', category: 'Health', history: [1,1,1,1,1,1,1,1,1,1,1,1,1,1], color: '#064734' },
  { id: 4, name: 'Exercise 30min', icon: '🏋️', streak: 5, completedToday: false, frequency: 'daily', category: 'Health', history: [1,1,1,0,1,1,1,0,1,1,1,1,1,0], color: '#064734' },
  { id: 5, name: 'No Social Media', icon: '📵', streak: 3, completedToday: true, frequency: 'daily', category: 'Wellness', history: [0,1,0,1,1,0,1,1,1,0,1,0,1,1], color: '#064734' },
  { id: 6, name: 'Journaling', icon: '✍️', streak: 9, completedToday: false, frequency: 'daily', category: 'Wellness', history: [1,1,1,1,0,1,1,1,1,0,1,1,1,1], color: '#064734' },
]

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [habits, setHabits] = useState(initialHabits)

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now(), done: false }])
  }

  const addHabit = (habit) => {
    setHabits(prev => [...prev, {
      ...habit,
      id: Date.now(),
      streak: 0,
      completedToday: false,
      frequency: habit.frequency || 'daily',
      color: '#064734',
      history: Array(14).fill(0),
    }])
  }

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const toggleHabit = (id) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h
      const wasCompleted = h.completedToday
      return {
        ...h,
        completedToday: !wasCompleted,
        streak: wasCompleted ? Math.max(0, h.streak - 1) : h.streak + 1,
      }
    }))
  }

  const completedTasks = tasks.filter(t => t.done).length
  const totalTasks = tasks.length
  const completedHabits = habits.filter(h => h.completedToday).length
  const totalHabits = habits.length

  return (
    <AppContext.Provider value={{
      tasks, habits,
      addTask, toggleTask, deleteTask,
      addHabit, deleteHabit, toggleHabit,
      completedTasks, totalTasks,
      completedHabits, totalHabits,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
