import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, TrendingDown, Target, Flame, CheckCircle2, Zap, Award, Calendar } from 'lucide-react'
import { useApp } from '../store/appStore'

const weeklyTaskData = [
  { day: 'Mon', completed: 5, total: 7 },
  { day: 'Tue', completed: 8, total: 9 },
  { day: 'Wed', completed: 4, total: 6 },
  { day: 'Thu', completed: 7, total: 8 },
  { day: 'Fri', completed: 6, total: 7 },
  { day: 'Sat', completed: 3, total: 4 },
  { day: 'Sun', completed: 5, total: 6 },
]

const monthlyData = [
  { week: 'W1', tasks: 28, habits: 35 },
  { week: 'W2', tasks: 32, habits: 38 },
  { week: 'W3', tasks: 25, habits: 30 },
  { week: 'W4', tasks: 38, habits: 42 },
]

const focusData = [
  { hour: '6am', score: 20 },
  { hour: '8am', score: 65 },
  { hour: '10am', score: 85 },
  { hour: '12pm', score: 55 },
  { hour: '2pm', score: 70 },
  { hour: '4pm', score: 80 },
  { hour: '6pm', score: 45 },
  { hour: '8pm', score: 30 },
]

const categoryBreakdown = [
  { name: 'Work', value: 40, color: '#064734' },
  { name: 'Health', value: 25, color: '#0a6b4e' },
  { name: 'Learning', value: 20, color: '#0d8a62' },
  { name: 'Personal', value: 15, color: '#E0FFC2' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#064734] text-[#E0FFC2] rounded-xl px-3 py-2 text-xs shadow-lg">
        <div className="font-bold mb-1">{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            {p.name}: <span className="font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function MetricCard({ label, value, change, positive, icon, sub }) {
  const Icon = icon;
  return (
    <div className="bg-white/60 border border-[#064734]/10 rounded-2xl p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-[#E0FFC2] rounded-xl flex items-center justify-center">
          <Icon size={18} className="text-[#064734]" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-[#064734]">{value}</div>
      <div className="text-sm font-medium text-[#064734]/70 mt-1">{label}</div>
      {sub && <div className="text-xs text-[#064734]/40 mt-0.5">{sub}</div>}
    </div>
  )
}

function InsightCard({ title, value, desc, color, icon }) {
  return (
    <div className={`${color} rounded-2xl p-5`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-bold text-lg">{value}</div>
      <div className="font-semibold text-sm mt-1">{title}</div>
      <div className="text-xs opacity-70 mt-1">{desc}</div>
    </div>
  )
}

export default function Analytics() {
  const { habits, completedTasks, totalTasks, completedHabits, totalHabits } = useApp()

  const taskRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
  const habitRate = totalHabits ? Math.round((completedHabits / totalHabits) * 100) : 0
  const bestStreak = Math.max(...habits.map(h => h.streak))

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#064734]">Analytics</h1>
          <p className="text-[#064734]/50 text-sm mt-0.5">Your productivity proof — backed by data</p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-white/60 border border-[#064734]/10 rounded-xl px-4 py-2">
          <Calendar size={14} className="text-[#064734]/50" />
          <span className="text-sm text-[#064734]/70 font-medium">April 2026</span>
        </div>
      </div>

      {/* Hero score */}
      <div className="bg-[#064734] rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0a6b4e] rounded-full -translate-y-1/2 translate-x-1/3 opacity-30" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1">
            <div className="text-[#E0FFC2]/60 text-sm mb-1">Overall Productivity Score</div>
            <div className="text-7xl font-black text-[#E0FFC2]">
              {Math.round((taskRate + habitRate) / 2)}
              <span className="text-3xl text-[#E0FFC2]/50">/100</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <TrendingUp size={16} className="text-green-400" />
              <span className="text-green-400 text-sm font-medium">+12% from last week</span>
            </div>
            <p className="text-[#E0FFC2]/50 text-sm mt-2">You're in the top 15% of productive users this week! 🎉</p>
          </div>

          <div className="flex gap-6">
            <div className="text-center">
              <div className="w-20 h-20 relative mx-auto">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(224,255,194,0.1)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#E0FFC2" strokeWidth="3"
                    strokeDasharray={`${taskRate} ${100 - taskRate}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#E0FFC2] font-bold text-sm">{taskRate}%</span>
                </div>
              </div>
              <div className="text-[#E0FFC2]/60 text-xs mt-1">Tasks</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 relative mx-auto">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(224,255,194,0.1)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#E0FFC2" strokeWidth="3"
                    strokeDasharray={`${habitRate} ${100 - habitRate}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#E0FFC2] font-bold text-sm">{habitRate}%</span>
                </div>
              </div>
              <div className="text-[#E0FFC2]/60 text-xs mt-1">Habits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Task Completion" value={`${taskRate}%`} change="+8%" positive icon={CheckCircle2} sub="this week" />
        <MetricCard label="Best Streak" value={`${bestStreak}d`} change="+3d" positive icon={Flame} sub="days in a row" />
        <MetricCard label="Focus Hours" value="24.5h" change="+2.1h" positive icon={Zap} sub="this week" />
        <MetricCard label="Habits Missed" value="4" change="-6" positive icon={Target} sub="vs last week" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Weekly task completion */}
        <div className="bg-white/60 border border-[#064734]/10 rounded-2xl p-6">
          <h3 className="font-bold text-[#064734] mb-1">Weekly Task Completion</h3>
          <p className="text-xs text-[#064734]/40 mb-5">Completed vs Total tasks per day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyTaskData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#06473410" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#06473470' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#06473470' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" fill="#E0FFC2" radius={[4, 4, 0, 0]} name="Total" />
              <Bar dataKey="completed" fill="#064734" radius={[4, 4, 0, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Focus time by hour */}
        <div className="bg-white/60 border border-[#064734]/10 rounded-2xl p-6">
          <h3 className="font-bold text-[#064734] mb-1">Focus Time Distribution</h3>
          <p className="text-xs text-[#064734]/40 mb-5">When you're most productive</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={focusData}>
              <defs>
                <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#064734" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#064734" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#06473410" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#06473470' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#06473470' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" stroke="#064734" strokeWidth={2.5} fill="url(#focusGrad)" name="Focus Score" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly trend + Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Monthly trend */}
        <div className="lg:col-span-2 bg-white/60 border border-[#064734]/10 rounded-2xl p-6">
          <h3 className="font-bold text-[#064734] mb-1">Monthly Trends</h3>
          <p className="text-xs text-[#064734]/40 mb-5">Tasks & Habits over 4 weeks</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="tasksGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#064734" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#064734" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="habitsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d8a62" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0d8a62" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#06473410" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#06473470' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#06473470' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#06473490' }} />
              <Area type="monotone" dataKey="tasks" stroke="#064734" strokeWidth={2} fill="url(#tasksGrad)" name="Tasks" />
              <Area type="monotone" dataKey="habits" stroke="#0d8a62" strokeWidth={2} fill="url(#habitsGrad)" name="Habits" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="bg-white/60 border border-[#064734]/10 rounded-2xl p-6">
          <h3 className="font-bold text-[#064734] mb-1">By Category</h3>
          <p className="text-xs text-[#064734]/40 mb-5">Task distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%" cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ background: '#064734', border: 'none', borderRadius: '12px', color: '#E0FFC2', fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryBreakdown.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-[#064734]/70">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-[#064734]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <h3 className="font-bold text-[#064734] mb-4 flex items-center gap-2">
          <Award size={18} /> Smart Insights
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <InsightCard
            icon="🔥"
            title="On Fire!"
            value="21-day streak"
            desc="Drink 2L Water — keep it going!"
            color="bg-orange-50 border border-orange-200 text-orange-800"
          />
          <InsightCard
            icon="⚡"
            title="Power Hour"
            value="10am – 12pm"
            desc="Your peak focus window. Schedule hard tasks here."
            color="bg-blue-50 border border-blue-200 text-blue-800"
          />
          <InsightCard
            icon="📈"
            title="Best Day"
            value="Tuesday"
            desc="You complete 89% of tasks on Tuesdays."
            color="bg-purple-50 border border-purple-200 text-purple-800"
          />
          <InsightCard
            icon="🎯"
            title="Close to Goal"
            value="83% done"
            desc="Just 2 more tasks to hit your daily goal!"
            color="bg-[#E0FFC2] border border-[#064734]/20 text-[#064734]"
          />
        </div>
      </div>

      {/* Streak leaderboard */}
      <div className="bg-white/60 border border-[#064734]/10 rounded-2xl p-6">
        <h3 className="font-bold text-[#064734] mb-4 flex items-center gap-2">
          <Flame size={18} className="text-orange-500" /> Habit Streaks Leaderboard
        </h3>
        <div className="space-y-3">
          {[...habits].sort((a, b) => b.streak - a.streak).map((habit, i) => (
            <div key={habit.id} className="flex items-center gap-4">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                i === 0 ? 'bg-yellow-400 text-white' :
                i === 1 ? 'bg-gray-300 text-gray-700' :
                i === 2 ? 'bg-orange-400 text-white' :
                'bg-[#064734]/10 text-[#064734]/50'
              }`}>
                {i + 1}
              </div>
              <div className="text-lg">{habit.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[#064734]">{habit.name}</div>
                <div className="w-full bg-[#064734]/10 rounded-full h-1.5 mt-1.5">
                  <div
                    className="bg-[#064734] h-1.5 rounded-full progress-bar"
                    style={{ width: `${Math.min(100, (habit.streak / 30) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Flame size={14} className="text-orange-500" />
                <span className="font-bold text-[#064734] text-sm">{habit.streak}d</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
