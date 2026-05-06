import { Link } from 'react-router-dom'
import {
  CheckCircle2, Circle, ArrowRight, TrendingUp, Flame,
  Target, Star, Zap, Clock, ChevronRight, LayoutDashboard
} from 'lucide-react'
import { useApp } from '../store/appStore'
import { useAuth } from '../store/authContext'

const quotes = [
  "The secret of getting ahead is getting started.",
  "Focus on being productive instead of busy.",
  "Small daily improvements lead to stunning results.",
  "Done is better than perfect.",
]

function StatCard({ label, value, sub, icon, accent }) {
  const Icon = icon;
  return (
    <div className="bg-white/60 border border-[#064734]/10 rounded-2xl p-5 flex items-center gap-4 card-hover">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon size={22} className="text-[#064734]" />
      </div>
      <div>
        <div className="text-2xl font-bold text-[#064734]">{value}</div>
        <div className="text-sm font-medium text-[#064734]/70">{label}</div>
        {sub && <div className="text-xs text-[#064734]/40 mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { tasks, habits, completedTasks, totalTasks, completedHabits, totalHabits, toggleTask } = useApp()
  const { user } = useAuth()

  const taskProgress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
  const habitProgress = totalHabits ? Math.round((completedHabits / totalHabits) * 100) : 0
  const topStreak = Math.max(...habits.map(h => h.streak))
  const quote = quotes[new Date().getDay() % quotes.length]

  const priorityColor = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Hero greeting */}
      <div className="relative bg-[#064734] rounded-3xl p-8 overflow-hidden">
        {/* bg blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0a6b4e] rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />
        <div className="absolute bottom-0 left-32 w-48 h-48 bg-[#0d8a62] rounded-full translate-y-1/2 opacity-20" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[#E0FFC2] rounded-full flex items-center justify-center">
                  <span className="text-[#064734] text-xs">☀️</span>
                </div>
                <span className="text-[#E0FFC2]/70 text-sm">Good morning!</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#E0FFC2] leading-tight">
                Ready to crush it,<br />{user?.name?.split(' ')[0] || 'User'}? 🚀
              </h1>
              <p className="text-[#E0FFC2]/60 mt-3 text-sm max-w-sm italic">"{quote}"</p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="bg-[#E0FFC2]/10 border border-[#E0FFC2]/20 rounded-2xl p-4 text-center min-w-[100px]">
                <div className="text-3xl font-bold text-[#E0FFC2]">{completedTasks}</div>
                <div className="text-[#E0FFC2]/60 text-xs mt-1">Tasks Done</div>
              </div>
              <div className="bg-[#E0FFC2]/10 border border-[#E0FFC2]/20 rounded-2xl p-4 text-center min-w-[100px]">
                <div className="text-3xl font-bold text-[#E0FFC2]">{completedHabits}</div>
                <div className="text-[#E0FFC2]/60 text-xs mt-1">Habits Done</div>
              </div>
              <div className="bg-[#E0FFC2]/10 border border-[#E0FFC2]/20 rounded-2xl p-4 text-center min-w-[100px]">
                <div className="text-3xl font-bold text-[#E0FFC2]">{topStreak}</div>
                <div className="text-[#E0FFC2]/60 text-xs mt-1">Best Streak</div>
              </div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#E0FFC2]/70 text-xs">Today's overall progress</span>
              <span className="text-[#E0FFC2] font-bold text-xs">{Math.round((taskProgress + habitProgress) / 2)}%</span>
            </div>
            <div className="w-full bg-[#E0FFC2]/20 rounded-full h-2">
              <div
                className="bg-[#E0FFC2] h-2 rounded-full progress-bar"
                style={{ width: `${Math.round((taskProgress + habitProgress) / 2)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tasks Today" value={`${completedTasks}/${totalTasks}`} sub="completed" icon={CheckCircle2} accent="bg-[#E0FFC2]" />
        <StatCard label="Habit Streak" value={`${topStreak} days`} sub="best streak" icon={Flame} accent="bg-orange-100" />
        <StatCard label="Habits Done" value={`${completedHabits}/${totalHabits}`} sub="today" icon={Target} accent="bg-blue-100" />
        <StatCard label="Focus Score" value="87%" sub="this week" icon={Zap} accent="bg-purple-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's Tasks */}
        <div className="lg:col-span-2 bg-white/60 border border-[#064734]/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-[#064734] text-lg">Today's Tasks</h3>
              <p className="text-[#064734]/50 text-xs mt-0.5">{completedTasks} of {totalTasks} completed</p>
            </div>
            <Link to="/tasks" className="flex items-center gap-1 text-[#064734] text-sm font-medium hover:gap-2 transition-all">
              View all <ChevronRight size={16} />
            </Link>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#064734]/10 rounded-full h-2 mb-5">
            <div
              className="bg-[#064734] h-2 rounded-full progress-bar"
              style={{ width: `${taskProgress}%` }}
            />
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 6).map(task => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer group ${
                  task.done ? 'opacity-60' : 'hover:bg-[#064734]/5'
                }`}
                onClick={() => toggleTask(task.id)}
              >
                <button className="flex-shrink-0">
                  {task.done
                    ? <CheckCircle2 size={20} className="text-[#064734]" />
                    : <Circle size={20} className="text-[#064734]/30 group-hover:text-[#064734]/60" />
                  }
                </button>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${task.done ? 'line-through text-[#064734]/40' : 'text-[#064734]'}`}>
                    {task.title}
                  </div>
                  <div className="text-xs text-[#064734]/40 flex items-center gap-1 mt-0.5">
                    <Clock size={10} /> {task.dueDate}
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor[task.priority]}`}>
                  {task.priority}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#064734]/10 text-[#064734] font-medium">
                  {task.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Habits snapshot */}
        <div className="bg-white/60 border border-[#064734]/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-[#064734] text-lg">Habits</h3>
              <p className="text-[#064734]/50 text-xs mt-0.5">{completedHabits}/{totalHabits} today</p>
            </div>
            <Link to="/habits" className="flex items-center gap-1 text-[#064734] text-sm font-medium">
              All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {habits.map(habit => (
              <div key={habit.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E0FFC2] flex items-center justify-center text-lg flex-shrink-0">
                  {habit.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#064734] truncate">{habit.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Flame size={10} className="text-orange-500" />
                    <span className="text-xs text-[#064734]/50">{habit.streak} day streak</span>
                  </div>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  habit.completedToday ? 'bg-[#064734]' : 'bg-[#064734]/10'
                }`}>
                  {habit.completedToday && <CheckCircle2 size={14} className="text-[#E0FFC2]" />}
                </div>
              </div>
            ))}
          </div>

          {/* Habit progress ring visualization */}
          <div className="mt-5 pt-5 border-t border-[#064734]/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#064734]/50">Completion rate</span>
              <span className="text-lg font-bold text-[#064734]">{habitProgress}%</span>
            </div>
            <div className="w-full bg-[#064734]/10 rounded-full h-2 mt-2">
              <div
                className="bg-[#064734] h-2 rounded-full progress-bar"
                style={{ width: `${habitProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: '/tasks', label: 'Add a Task', desc: 'Capture what needs doing', icon: CheckCircle2, color: 'bg-[#064734] text-[#E0FFC2]' },
          { to: '/habits', label: 'Check Habits', desc: 'Build your streaks', icon: Flame, color: 'bg-[#064734] text-[#E0FFC2]' },
          { to: '/analytics', label: 'View Progress', desc: 'See your productivity', icon: TrendingUp, color: 'bg-[#064734] text-[#E0FFC2]' },
        ].map((item) => {
          const Icon = item.icon;
          return (
          <Link
            key={item.to}
            to={item.to}
            className={`${item.color} rounded-2xl p-5 flex items-center gap-4 card-hover group`}
          >
            <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
              <Icon size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{item.label}</div>
              <div className="text-xs opacity-60 mt-0.5">{item.desc}</div>
            </div>
            <ArrowRight size={16} className="opacity-60 group-hover:translate-x-1 transition-transform" />
          </Link>
        )})}
      </div>
    </div>
  )
}
