require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./initDb') // Initialize database on server start

const authRoutes = require('./routes/auth')
const eventRoutes = require('./routes/events')
const bookingRoutes = require('./routes/bookings')
const eventTypeRoutes = require('./routes/eventTypes')

const app = express()

// ✅ CORS FIX (works for both local + production)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://schedly-smart-scheduler.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

// ✅ Middleware
app.use(express.json())

// ✅ Health check with diagnostics
app.get('/health', (req, res) => {
  const pool = require('./db')
  
  pool.query('SELECT 1', (err) => {
    if (err) {
      console.error('Database connection error:', err)
      return res.status(500).json({ 
        ok: false, 
        message: 'Database connection failed',
        error: err.message,
        env: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_NAME,
          hasPassword: !!process.env.DB_PASSWORD
        }
      })
    }
    
    res.json({ 
      ok: true,
      database: 'connected',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    })
  })
})

// ✅ Routes
app.use('/auth', authRoutes)
app.use('/events', eventRoutes)
app.use('/bookings', bookingRoutes)
app.use('/event-types', eventTypeRoutes)

// ✅ 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// ✅ Start server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📄 Database: ${process.env.DB_NAME || 'calendly_clone'}`)
  console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? '✓ Set' : '✗ Missing'}`)
})