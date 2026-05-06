import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './store/authContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Habits from './pages/Habits'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Register from './pages/Register'
import GuestModal from './components/GuestModal'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GuestModal />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/habits" element={<Habits />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
