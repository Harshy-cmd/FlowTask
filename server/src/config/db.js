const mongoose = require('mongoose')

const connectDB = async () => {
  const uri = process.env.MONGO_URI

  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables')
  }

  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }

  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected:', mongoose.connection.host)
  })

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message)
  })

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected')
  })

  // Graceful shutdown
  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('MongoDB connection closed on app termination')
    process.exit(0)
  })

  await mongoose.connect(uri, options)
}

module.exports = connectDB
