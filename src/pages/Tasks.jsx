import { useState } from 'react'
import {
  Plus, Search, Filter, CheckCircle2, Circle, Trash2, Clock,
  Flag, Tag, X, ChevronDown, SortAsc, MoreHorizontal, Zap
} from 'lucide-react'
import { useApp } from '../store/appStore'

const CATEGORIES = ['All', 'Work', 'Health', 'Learning', 'Personal']
const PRIORITIES = ['all', 'high', 'medium', 'low']

const priorityColor = {
  high: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  low: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
}

const categoryColor = {
  Work: 'bg-blue-100 text-blue-700',
  Health: 'bg-emerald-100 text-emerald-700',
  Learning: 'bg-purple-100 text-purple-700',
  Personal: 'bg-orange-100 text-orange-700',
}

function AddTaskModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: '',
    category: 'Work',
    priority: 'medium',
    dueDate: '',
    tags: '',
  })

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd({
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#E0FFC2] rounded-2xl w-full max-w-md shadow-2xl border border-[#064734]/20 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#064734]/10">
          <h2 className="font-bold text-[#064734] text-lg">New Task</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#064734]/10">
            <X size={18} className="text-[#064734]" />
          </button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#064734]/70 mb-1.5 block uppercase tracking-wide">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="What needs to be done?"
              className="w-full bg-white/70 border border-[#064734]/20 rounded-xl px-4 py-3 text-sm text-[#064734] placeholder:text-[#064734]/30 focus:outline-none focus:border-[#064734] focus:bg-white transition-all"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#064734]/70 mb-1.5 block uppercase tracking-wide">Category</label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full bg-white/70 border border-[#064734]/20 rounded-xl px-3 py-3 text-sm text-[#064734] focus:outline-none focus:border-[#064734]"
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#064734]/70 mb-1.5 block uppercase tracking-wide">Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}
                className="w-full bg-white/70 border border-[#064734]/20 rounded-xl px-3 py-3 text-sm text-[#064734] focus:outline-none focus:border-[#064734]"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#064734]/70 mb-1.5 block uppercase tracking-wide">Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
              className="w-full bg-white/70 border border-[#064734]/20 rounded-xl px-4 py-3 text-sm text-[#064734] focus:outline-none focus:border-[#064734]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#064734]/70 mb-1.5 block uppercase tracking-wide">Tags (comma separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
              placeholder="e.g. design, urgent"
              className="w-full bg-white/70 border border-[#064734]/20 rounded-xl px-4 py-3 text-sm text-[#064734] placeholder:text-[#064734]/30 focus:outline-none focus:border-[#064734]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#064734]/20 text-[#064734] text-sm font-medium hover:bg-[#064734]/5 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-[#064734] text-[#E0FFC2] text-sm font-semibold hover:bg-[#0a6b4e] transition-colors">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function TaskItem({ task, onToggle, onDelete }) {
  const [showMenu, setShowMenu] = useState(false)
  const pc = priorityColor[task.priority]
  const cc = categoryColor[task.category] || 'bg-gray-100 text-gray-700'

  return (
    <div className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
      task.done
        ? 'bg-white/30 border-[#064734]/5 opacity-60'
        : 'bg-white/60 border-[#064734]/10 hover:border-[#064734]/20 hover:shadow-sm'
    }`}>
      <button onClick={() => onToggle(task.id)} className="mt-0.5 flex-shrink-0">
        {task.done
          ? <CheckCircle2 size={22} className="text-[#064734]" />
          : <Circle size={22} className="text-[#064734]/25 hover:text-[#064734]/60 transition-colors" />
        }
      </button>

      <div className="flex-1 min-w-0">
        <div className={`font-medium text-sm ${task.done ? 'line-through text-[#064734]/40' : 'text-[#064734]'}`}>
          {task.title}
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pc.bg} ${pc.text}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${pc.dot}`} />
            {task.priority}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cc}`}>
            {task.category}
          </span>
          {task.dueDate && (
            <span className="text-xs text-[#064734]/40 flex items-center gap-1">
              <Clock size={10} /> {task.dueDate}
            </span>
          )}
          {task.tags?.map(tag => (
            <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-[#064734]/8 text-[#064734]/60">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex-shrink-0">
        <button
          onClick={() => setShowMenu(v => !v)}
          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[#064734]/10 transition-all"
        >
          <MoreHorizontal size={16} className="text-[#064734]/50" />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-8 bg-white border border-[#064734]/10 rounded-xl shadow-lg py-1 z-10 min-w-[120px]">
            <button
              onClick={() => { onDelete(task.id); setShowMenu(false) }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Tasks() {
  const { tasks, addTask, toggleTask, deleteTask, completedTasks, totalTasks } = useApp()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [priority, setPriority] = useState('all')
  const [showDone, setShowDone] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('all') // all | today | upcoming

  const filtered = tasks.filter(t => {
    if (!showDone && t.done) return false
    if (category !== 'All' && t.category !== category) return false
    if (priority !== 'all' && t.priority !== priority) return false
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
    if (activeTab === 'today') return t.dueDate === '2026-04-20'
    if (activeTab === 'upcoming') return t.dueDate > '2026-04-20'
    return true
  })

  const pending = filtered.filter(t => !t.done)
  const done = filtered.filter(t => t.done)
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#064734]">Tasks</h1>
          <p className="text-[#064734]/50 text-sm mt-0.5">{completedTasks} of {totalTasks} completed today</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#064734] text-[#E0FFC2] rounded-xl font-semibold text-sm hover:bg-[#0a6b4e] transition-colors"
        >
          <Plus size={18} /> New Task
        </button>
      </div>

      {/* Progress */}
      <div className="bg-[#064734] rounded-2xl p-5 text-[#E0FFC2]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#E0FFC2]" />
            <span className="text-sm font-medium">Today's Progress</span>
          </div>
          <span className="font-bold text-lg">{progress}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-[#E0FFC2] h-3 rounded-full progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-[#E0FFC2]/60">
          <span>{completedTasks} done</span>
          <span>{totalTasks - completedTasks} remaining</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/40 p-1 rounded-xl w-fit">
        {[
          { key: 'all', label: 'All Tasks' },
          { key: 'today', label: 'Today' },
          { key: 'upcoming', label: 'Upcoming' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-[#064734] text-[#E0FFC2] shadow-sm'
                : 'text-[#064734]/60 hover:text-[#064734]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/60 border border-[#064734]/10 rounded-xl px-4 py-2.5 flex-1 min-w-[200px]">
          <Search size={16} className="text-[#064734]/40 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="bg-transparent text-sm text-[#064734] placeholder:text-[#064734]/30 focus:outline-none w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                category === c
                  ? 'bg-[#064734] text-[#E0FFC2]'
                  : 'bg-white/60 border border-[#064734]/10 text-[#064734]/60 hover:border-[#064734]/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {PRIORITIES.map(p => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                priority === p
                  ? 'bg-[#064734] text-[#E0FFC2]'
                  : 'bg-white/60 border border-[#064734]/10 text-[#064734]/60 hover:border-[#064734]/30'
              }`}
            >
              <Flag size={10} className="inline mr-1" />{p}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowDone(v => !v)}
          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            showDone
              ? 'bg-[#064734]/10 text-[#064734]'
              : 'bg-white/60 border border-[#064734]/10 text-[#064734]/60'
          }`}
        >
          {showDone ? 'Hide' : 'Show'} done
        </button>
      </div>

      {/* Task lists */}
      <div className="space-y-6">
        {/* Pending */}
        <div>
          <h3 className="text-xs font-bold text-[#064734]/50 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#064734] inline-block" />
            Pending ({pending.length})
          </h3>
          {pending.length === 0 ? (
            <div className="text-center py-10 bg-white/40 rounded-2xl border border-[#064734]/5">
              <CheckCircle2 size={32} className="text-[#064734]/20 mx-auto mb-2" />
              <p className="text-[#064734]/40 text-sm">All clear! No pending tasks.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map(task => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </div>
          )}
        </div>

        {/* Done */}
        {showDone && done.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-[#064734]/50 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Completed ({done.length})
            </h3>
            <div className="space-y-3">
              {done.map(task => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && <AddTaskModal onAdd={addTask} onClose={() => setShowModal(false)} />}
    </div>
  )
}
