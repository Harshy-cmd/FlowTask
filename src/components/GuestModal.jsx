import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Lock } from 'lucide-react'

export default function GuestModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleRestricted = () => setIsOpen(true)
    window.addEventListener('guest-restricted', handleRestricted)
    return () => window.removeEventListener('guest-restricted', handleRestricted)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-fade-in backdrop-blur-sm">
      <div className="bg-[#E0FFC2] rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-[#064734]/50 hover:text-[#064734] transition-colors p-2"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 bg-[#064734]/10 rounded-full flex items-center justify-center mb-4">
            <Lock size={32} className="text-[#064734]" />
          </div>
          <h3 className="text-2xl font-bold text-[#064734] mb-2">Feature Restricted</h3>
          <p className="text-[#064734]/70 mb-6">
            Create an account to use this feature and save your progress permanently.
          </p>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-[#E0FFC2] bg-[#064734] hover:bg-[#0a6b4e] focus:outline-none transition-colors"
          >
            Create an Account
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-3 w-full py-3 px-4 text-sm font-semibold text-[#064734] hover:bg-[#064734]/5 rounded-xl transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  )
}
