const dotenv = require('dotenv')
dotenv.config()

const connectDB = require('./config/db')
const app = require('./app')

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`\n🌿 FlowTask API running on http://localhost:${PORT}`)
      console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`)
      console.log(`   Health check: http://localhost:${PORT}/api/health\n`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err.message)
    process.exit(1)
  }
}

startServer()
