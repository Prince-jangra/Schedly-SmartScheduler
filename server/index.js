require('dotenv').config()
const express = require('express')
const cors = require('cors')

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

// ✅ Health check
app.get('/health', (_req, res) => {
  res.json({ ok: true })
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
})