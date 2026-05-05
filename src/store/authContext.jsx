import { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('flowtask_user')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      if (response.data.success) {
        localStorage.setItem('flowtask_user', JSON.stringify(response.data.data))
        setUser(response.data.data)
        navigate('/')
        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'An error occurred during login',
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password })
      if (response.data.success) {
        localStorage.setItem('flowtask_user', JSON.stringify(response.data.data))
        setUser(response.data.data)
        navigate('/')
        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'An error occurred during registration',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('flowtask_user')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
