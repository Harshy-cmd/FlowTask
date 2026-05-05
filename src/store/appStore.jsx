import { useState, createContext, useContext, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from './authContext'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [habits, setHabits] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchTasks()
      fetchHabits()
    } else {
      setTasks([])
      setHabits([])
    }
  }, [user])

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks')
      if (response.data.success) setTasks(response.data.data)
    } catch (error) {
      console.error('Failed to fetch tasks', error)
    }
  }

  const fetchHabits = async () => {
    try {
      const response = await api.get('/habits')
      if (response.data.success) {
        // Map backend habits to frontend shape
        const mappedHabits = response.data.data.map(h => {
          const today = new Date().toISOString().split('T')[0]
          const completedToday = h.completedDates.includes(today)
          
          // Generate 14-day history array [0,1,1...] based on completedDates
          const history = Array(14).fill(0)
          const todayDate = new Date(today)
          
          for (let i = 0; i < 14; i++) {
            const d = new Date(todayDate)
            d.setDate(d.getDate() - (13 - i))
            const dateStr = d.toISOString().split('T')[0]
            if (h.completedDates.includes(dateStr)) {
              history[i] = 1
            }
          }

          return {
            ...h,
            id: h._id,
            completedToday,
            history
          }
        })
        setHabits(mappedHabits)
      }
    } catch (error) {
      console.error('Failed to fetch habits', error)
    }
  }

  const addTask = async (task) => {
    try {
      const response = await api.post('/tasks', task)
      if (response.data.success) setTasks(prev => [...prev, response.data.data])
    } catch (error) {
      console.error('Failed to add task', error)
    }
  }

  const addHabit = async (habit) => {
    try {
      const response = await api.post('/habits', habit)
      if (response.data.success) {
        // We just fetch all to keep it simple, or we could map it
        fetchHabits()
      }
    } catch (error) {
      console.error('Failed to add habit', error)
    }
  }

  const deleteHabit = async (id) => {
    try {
      await api.delete(`/habits/${id}`)
      setHabits(prev => prev.filter(h => h.id !== id))
    } catch (error) {
      console.error('Failed to delete habit', error)
    }
  }

  const toggleTask = async (id) => {
    try {
      // Optimistic update
      setTasks(prev => prev.map(t => t._id === id ? { ...t, done: !t.done } : t))
      await api.patch(`/tasks/${id}/toggle`)
    } catch (error) {
      console.error('Failed to toggle task', error)
      fetchTasks() // revert on error
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(t => t._id !== id))
    } catch (error) {
      console.error('Failed to delete task', error)
    }
  }

  const toggleHabit = async (id) => {
    try {
      // Optomistic update for better UX
      setHabits(prev => prev.map(h => {
        if (h.id !== id) return h
        const wasCompleted = h.completedToday
        
        const newHistory = [...h.history]
        newHistory[13] = wasCompleted ? 0 : 1

        return {
          ...h,
          completedToday: !wasCompleted,
          streak: wasCompleted ? Math.max(0, h.streak - 1) : h.streak + 1,
          history: newHistory
        }
      }))
      
      await api.patch(`/habits/${id}/toggle`)
    } catch (error) {
      console.error('Failed to toggle habit', error)
      fetchHabits() // revert on error
    }
  }

  // To support component using t.id instead of t._id
  const tasksWithId = tasks.map(t => ({ ...t, id: t._id }))

  const completedTasks = tasksWithId.filter(t => t.done).length
  const totalTasks = tasksWithId.length
  const completedHabits = habits.filter(h => h.completedToday).length
  const totalHabits = habits.length

  return (
    <AppContext.Provider value={{
      tasks: tasksWithId, habits,
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
