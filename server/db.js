const mysql = require('mysql2')

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Prince@12093',
  database: process.env.DB_NAME || 'calendly_clone',
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
})

module.exports = pool
