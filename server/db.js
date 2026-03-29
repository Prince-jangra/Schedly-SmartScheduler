const mysql = require('mysql2')

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'calendly_clone',
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
})

pool.on('error', (err) => {
  console.error('❌ Database pool error:', err.message)
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.')
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
    console.error('Database had a fatal error.')
  }
  if (err.code === 'PROTOCOL_ENQUEUE_AFTER_CLOSE') {
    console.error('Database connection was manually closed.')
  }
})

module.exports = pool
