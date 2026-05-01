import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, Repeat2, BarChart3, Leaf, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { AppProvider } from '../store/appStore'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/habits', label: 'Habits', icon: Repeat2 },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#E0FFC2] flex">
        {/* Sidebar */}
        <aside className={`
          fixed left-0 top-0 h-full z-40 w-64 bg-[#064734] flex flex-col
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-[#0a6b4e]">
            <div className="w-9 h-9 bg-[#E0FFC2] rounded-xl flex items-center justify-center">
              <Leaf size={20} className="text-[#064734]" />
            </div>
            <div>
              <div className="text-[#E0FFC2] font-bold text-lg leading-none">FlowTask</div>
              <div className="text-[#E0FFC2]/50 text-xs mt-0.5">Your productivity hub</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E0FFC2] text-[#064734] shadow-lg'
                      : 'text-[#E0FFC2]/70 hover:bg-[#0a6b4e] hover:text-[#E0FFC2]'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* User section */}
          <div className="px-4 py-6 border-t border-[#0a6b4e]">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a6b4e]">
              <div className="w-8 h-8 rounded-full bg-[#E0FFC2] flex items-center justify-center text-[#064734] font-bold text-sm">
                A
              </div>
              <div>
                <div className="text-[#E0FFC2] text-sm font-medium">Alex Johnson</div>
                <div className="text-[#E0FFC2]/50 text-xs">Pro Member</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-20 bg-[#E0FFC2]/80 backdrop-blur-sm border-b border-[#064734]/10 px-6 py-4 flex items-center justify-between">
            <button
              className="lg:hidden p-2 rounded-xl bg-[#064734]/10 text-[#064734]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden lg:block">
              <h2 className="font-semibold text-[#064734] text-lg">
                {navItems.find(n => n.to === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-sm text-[#064734]/60">Sun, Apr 20 · 2026</div>
              <div className="w-8 h-8 rounded-full bg-[#064734] flex items-center justify-center text-[#E0FFC2] font-bold text-sm">
                A
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </AppProvider>
  )
}
