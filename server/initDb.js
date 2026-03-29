const mysql = require('mysql2')

// Create a connection without specifying a database to create it first
const connectionForDbCreation = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Prince@12093',
})

const dbName = process.env.DB_NAME || 'calendly_clone'

// Create database if it doesn't exist
connectionForDbCreation.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
  if (err) {
    console.error('❌ Error creating database:', err.message)
    console.error('Database config:', {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      database: dbName
    })
  } else {
    console.log(`✅ Database ${dbName} ready`)
  }
  
  connectionForDbCreation.end()

  // Now create tables using the db pool (which is already exported)
  const pool = require('./db')

  const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS event_types (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      duration INT NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS availability (
      id VARCHAR(36) PRIMARY KEY,
      event_type_id VARCHAR(36) NOT NULL,
      day_of_week INT NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS bookings (
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
    );

    CREATE TABLE IF NOT EXISTS meetings (
      id VARCHAR(36) PRIMARY KEY,
      booking_id VARCHAR(36) NOT NULL,
      status VARCHAR(50) DEFAULT 'scheduled',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
    );
  `

  // Split and execute each statement
  const statements = schema.split(';').filter(s => s.trim())
  let executed = 0

  statements.forEach(statement => {
    pool.query(statement, (err) => {
      if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') {
        console.error('❌ Error creating table:', err.message)
      } else if (!err) {
        console.log(`✅ Table created/verified`)
      }
      executed++
      if (executed === statements.length) {
        console.log('✅ All database tables ready')
        // Don't close the pool - it's needed for the app!
      }
    })
  })
})

module.exports = connectionForDbCreation
