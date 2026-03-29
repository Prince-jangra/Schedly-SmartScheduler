const mysql = require('mysql2')

console.log('🔄 Initializing database...')

// Validate required environment variables
const requiredVars = ['DB_HOST', 'DB_USER', 'DB_NAME']
const missingVars = requiredVars.filter(v => !process.env[v])

if (missingVars.length > 0) {
  console.error('❌ FATAL: Missing environment variables:', missingVars.join(', '))
  process.exit(1)
}

// Create initial connection to create database
const adminConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
})

const dbName = process.env.DB_NAME || 'calendly_clone'

console.log('📡 Connecting to MySQL server...')

adminConnection.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err.message)
    console.error('   Check your DB_HOST, DB_USER, and DB_PASSWORD')
    process.exit(1)
  }

  console.log('✅ Connected to MySQL server')

  // Create database
  const createDbQuery = `CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`
  
  console.log(`📁 Creating database '${dbName}'...`)
  adminConnection.query(createDbQuery, (err) => {
    if (err) {
      console.error('❌ Failed to create database:', err.message)
      adminConnection.end()
      process.exit(1)
    }

    console.log(`✅ Database '${dbName}' ready`)
    adminConnection.end()

    // Now connect to the database and create tables
    setTimeout(() => {
      createTables()
    }, 500)
  })
})

function createTables() {
  const pool = require('./db')

  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS event_types (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      duration INT NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS availability (
      id VARCHAR(36) PRIMARY KEY,
      event_type_id VARCHAR(36) NOT NULL,
      day_of_week INT NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(36) PRIMARY KEY,
      event_type_id VARCHAR(36) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      status VARCHAR(50) DEFAULT 'booked',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS meetings (
      id VARCHAR(36) PRIMARY KEY,
      booking_id VARCHAR(36) NOT NULL,
      status VARCHAR(50) DEFAULT 'scheduled',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
    )`,
  ]

  let completed = 0
  let errors = []

  console.log('📊 Creating tables...')

  tables.forEach((tableQuery, index) => {
    pool.query(tableQuery, (err) => {
      completed++

      if (err) {
        if (err.code !== 'ER_TABLE_EXISTS_ERROR') {
          console.error(`❌ Error creating table ${index + 1}:`, err.message)
          errors.push(err)
        } else {
          console.log(`✓ Table ${index + 1} already exists`)
        }
      } else {
        console.log(`✅ Table ${index + 1} created/verified`)
      }

      if (completed === tables.length) {
        if (errors.length === 0) {
          console.log('\n✨ DATABASE INITIALIZATION COMPLETE')
          console.log('   ✅ All tables ready')
          console.log('   ✅ Ready to accept connections\n')
        } else {
          console.error('\n⚠️  Some tables had errors, but initialization continuing')
        }
        // Don't close pool - it's needed by the app
      }
    })
  })
}

module.exports = {}
