import { useState } from 'react'
import { Flame, CheckCircle2, Circle, Plus, Trophy, Target, Zap, X, TrendingUp } from 'lucide-react'
import { useApp } from '../store/appStore'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const EMOJI_OPTIONS = ['🧘', '📚', '💧', '🏋️', '📵', '✍️', '🥗', '🏃', '🎯', '💤', '🌱', '🎵']
const CATEGORIES = ['Wellness', 'Health', 'Learning', 'Fitness', 'Mindfulness']

function HabitCard({ habit, onToggle }) {
  const completionRate = habit.history.length
    ? Math.round((habit.history.filter(Boolean).length / habit.history.length) * 100)
    : 0

  return (
    <div className={`bg-white/60 border rounded-2xl p-5 card-hover transition-all ${
      habit.completedToday
        ? 'border-[#064734]/30 bg-[#E0FFC2]/80'
        : 'border-[#064734]/10'
    }`}>
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
            habit.completedToday ? 'bg-[#064734]' : 'bg-[#E0FFC2]'
          }`}>
            {habit.icon}
          </div>
          <div>
            <div className="font-semibold text-[#064734] text-sm">{habit.name}</div>
            <div className="text-xs text-[#064734]/50 mt-0.5">{habit.category}</div>
          </div>
        </div>
        <button
          onClick={() => onToggle(habit.id)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            habit.completedToday
              ? 'bg-[#064734] text-[#E0FFC2] shadow-md'
              : 'bg-[#064734]/10 text-[#064734]/40 hover:bg-[#064734]/20'
          }`}
        >
          {habit.completedToday
            ? <CheckCircle2 size={18} />
            : <Circle size={18} />
          }
        </button>
      </div>

      {/* Streak badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-lg px-2.5 py-1">
          <Flame size={13} className="text-orange-500 streak-fire" />
          <span className="text-xs font-bold text-orange-600">{habit.streak} day streak</span>
        </div>
        <div className="text-xs text-[#064734]/50">{completionRate}% rate</div>
      </div>

      {/* Weekly heatmap */}
      <div>
        <div className="text-xs text-[#064734]/40 mb-2 font-medium">Last 14 days</div>
        <div className="flex gap-1.5">
          {habit.history.slice(-14).map((done, i) => (
            <div
              key={i}
              className={`flex-1 h-5 rounded-sm transition-all ${
                done ? 'bg-[#064734]' : 'bg-[#064734]/10'
              }`}
              title={done ? 'Completed' : 'Missed'}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#064734]/30">14d ago</span>
          <span className="text-[10px] text-[#064734]/30">today</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="w-full bg-[#064734]/10 rounded-full h-1.5">
          <div
            className="bg-[#064734] h-1.5 rounded-full progress-bar"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function AddHabitModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: '',
    icon: '🎯',
    category: 'Wellness',
    frequency: 'daily',
  })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onAdd(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#E0FFC2] rounded-2xl w-full max-w-md shadow-2xl border border-[#064734]/20 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#064734]/10">
          <h2 className="font-bold text-[#064734] text-lg">New Habit</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#064734]/10">
            <X size={18} className="text-[#064734]" />
          </button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#064734]/70 mb-1.5 block uppercase tracking-wide">Habit Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Morning walk"
              className="w-full bg-white/70 border border-[#064734]/20 rounded-xl px-4 py-3 text-sm text-[#064734] placeholder:text-[#064734]/30 focus:outline-none focus:border-[#064734]"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#064734]/70 mb-2 block uppercase tracking-wide">Pick an Emoji</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setForm(p => ({ ...p, icon: emoji }))}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                    form.icon === emoji
                      ? 'bg-[#064734] scale-110'
                      : 'bg-white/70 hover:bg-white'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#064734]/70 mb-1.5 block uppercase tracking-wide">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="w-full bg-white/70 border border-[#064734]/20 rounded-xl px-3 py-3 text-sm text-[#064734] focus:outline-none focus:border-[#064734]"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#064734]/20 text-[#064734] text-sm font-medium hover:bg-[#064734]/5">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#064734] text-[#E0FFC2] text-sm font-semibold hover:bg-[#0a6b4e] transition-colors"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Habits() {
  const { habits, toggleHabit, addHabit, completedHabits, totalHabits } = useApp()
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...new Set(habits.map(h => h.category))]
  const filtered = filter === 'All' ? habits : habits.filter(h => h.category === filter)

  const completionRate = totalHabits ? Math.round((completedHabits / totalHabits) * 100) : 0
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0)
  const bestStreak = Math.max(...habits.map(h => h.streak))
  const perfectDays = 7 // hardcoded for demo

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#064734]">Habits</h1>
          <p className="text-[#064734]/50 text-sm mt-0.5">Build consistency, one day at a time</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#064734] text-[#E0FFC2] rounded-xl font-semibold text-sm hover:bg-[#0a6b4e] transition-colors"
        >
          <Plus size={18} /> New Habit
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Rate", value: `${completionRate}%`, icon: Target, sub: `${completedHabits}/${totalHabits} habits`, color: 'bg-[#064734] text-[#E0FFC2]' },
          { label: 'Best Streak', value: `${bestStreak}d`, icon: Flame, sub: 'days in a row', color: 'bg-orange-500 text-white' },
          { label: 'Total Streaks', value: totalStreak, icon: Zap, sub: 'combined days', color: 'bg-purple-600 text-white' },
          { label: 'Perfect Days', value: perfectDays, icon: Trophy, sub: 'this month', color: 'bg-yellow-500 text-white' },
        ].map((item) => {
          const Icon = item.icon;
          return (
          <div key={item.label} className={`${item.color} rounded-2xl p-5 flex items-center gap-3 card-hover`}>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon size={18} />
            </div>
            <div>
              <div className="text-2xl font-bold leading-none">{item.value}</div>
              <div className="text-xs opacity-70 mt-1">{item.label}</div>
              <div className="text-xs opacity-50 mt-0.5">{item.sub}</div>
            </div>
          </div>
        )})}
      </div>

      {/* Daily overview for this week */}
      <div className="bg-white/60 border border-[#064734]/10 rounded-2xl p-6">
        <h3 className="font-bold text-[#064734] mb-4">This Week Overview</h3>
        <div className="flex gap-3">
          {DAYS.map((day, i) => {
            const dayCompletions = habits.filter(h => h.history[h.history.length - 7 + i]).length
            const pct = totalHabits ? (dayCompletions / totalHabits) * 100 : 0
            const isToday = i === 6
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs font-medium text-[#064734]/50">{day}</div>
                <div className="w-full bg-[#064734]/10 rounded-full overflow-hidden" style={{ height: '80px', display: 'flex', alignItems: 'flex-end' }}>
                  <div
                    className={`w-full rounded-b-full transition-all ${isToday ? 'bg-[#064734]' : 'bg-[#064734]/50'}`}
                    style={{ height: `${Math.max(5, pct)}%` }}
                  />
                </div>
                <div className={`text-xs font-bold ${isToday ? 'text-[#064734]' : 'text-[#064734]/40'}`}>
                  {Math.round(pct)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === c
                ? 'bg-[#064734] text-[#E0FFC2]'
                : 'bg-white/60 border border-[#064734]/10 text-[#064734]/60 hover:border-[#064734]/30'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Today's check-in banner */}
      <div className="bg-[#064734] rounded-2xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E0FFC2]/10 rounded-xl flex items-center justify-center">
            <TrendingUp size={18} className="text-[#E0FFC2]" />
          </div>
          <div>
            <div className="font-semibold text-[#E0FFC2] text-sm">Today's Check-in</div>
            <div className="text-[#E0FFC2]/60 text-xs">Click a habit to mark it done!</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#E0FFC2]">{completedHabits}<span className="text-[#E0FFC2]/40 text-base">/{totalHabits}</span></div>
          <div className="text-[#E0FFC2]/50 text-xs">completed</div>
        </div>
      </div>

      {/* Habits grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(habit => (
          <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} />
        ))}
      </div>

      {showModal && <AddHabitModal onAdd={addHabit} onClose={() => setShowModal(false)} />}
    </div>
  )
}
