import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { useAuth } from '../store/authContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()

  if (user) {
    return <Navigate to="/" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await login(email, password)
    if (!result.success) {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#E0FFC2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-[#064734] rounded-2xl flex items-center justify-center">
            <Leaf size={28} className="text-[#E0FFC2]" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#064734]">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-[#064734]/70">
          Or{' '}
          <Link to="/register" className="font-medium text-[#0a6b4e] hover:text-[#064734]">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 py-8 px-4 shadow sm:rounded-3xl sm:px-10 border border-[#064734]/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#064734]"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#064734]/20 rounded-xl shadow-sm placeholder-[#064734]/30 focus:outline-none focus:ring-[#064734] focus:border-[#064734] sm:text-sm bg-white/60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#064734]"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[#064734]/20 rounded-xl shadow-sm placeholder-[#064734]/30 focus:outline-none focus:ring-[#064734] focus:border-[#064734] sm:text-sm bg-white/60"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-[#E0FFC2] bg-[#064734] hover:bg-[#0a6b4e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#064734] disabled:opacity-70 transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
