const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middleware/errorHandler')

const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/tasks')
const habitRoutes = require('./routes/habits')

const app = express()

// ─── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // allow curl / Postman (no origin) + allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`))
      }
    },
    credentials: true,
  })
)

// ─── BODY PARSING ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))

// ─── LOGGING ──────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
}

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'FlowTask API is running 🌿' })
})

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/habits', habitRoutes)

// ─── 404 HANDLER ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use(errorHandler)

module.exports = app
