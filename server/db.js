const mysql = require('mysql2')

// Validate environment variables
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  console.error('❌ CRITICAL: Missing database environment variables!')
  console.error('   DB_HOST:', process.env.DB_HOST || '❌ NOT SET')
  console.error('   DB_USER:', process.env.DB_USER || '❌ NOT SET')
  console.error('   DB_PASSWORD:', process.env.DB_PASSWORD ? '✓ SET' : '❌ NOT SET')
  console.error('   DB_NAME:', process.env.DB_NAME || '❌ NOT SET')
  console.error('Please set all database environment variables!')
  process.exit(1)
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
  enableKeepAlive: true,
})

pool.on('error', (err) => {
  console.error('❌ Database pool error:', err.message, err.code)
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('   → Database connection was closed')
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
    console.error('   → Database had a fatal error')
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_CLOSE') {
    console.error('   → Database connection was manually closed')
  }
})

module.exports = pool
