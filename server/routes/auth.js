const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const db = require('../db')
const JWT_SECRET = require('../jwtSecret')

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  console.log('📝 Registration attempt:', { name, email, timestamp: new Date().toISOString() })

  if (!name || !email || !password) {
    console.log('❌ Missing required fields')
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }
  if (confirmPassword != null && password !== confirmPassword) {
    console.log('❌ Passwords do not match')
    return res.status(400).json({ message: 'Passwords do not match' })
  }

  db.query('SELECT id FROM users WHERE email = ?', [email], (err, existing) => {
    if (err) {
      console.error('❌ Database error on user check:', err.message, err.code)
      return res.status(500).json({ message: 'Database error. Please try again.', detail: err.message })
    }
    if (existing && existing.length > 0) {
      console.log('❌ Email already registered:', email)
      return res.status(400).json({ message: 'Email already registered' })
    }

    const id = uuidv4()
    const hash = bcrypt.hashSync(password, 10)

    console.log('🔐 Creating user:', { id, email })

    db.query(
      'INSERT INTO users (id, name, email, password, created_at) VALUES (?,?,?,?,NOW())',
      [id, name, email, hash],
      (insertErr) => {
        if (insertErr) {
          console.error('❌ Database error on user insert:', insertErr.message, insertErr.code)
          return res.status(500).json({ message: 'Could not create account. Email may already exist.', detail: insertErr.message })
        }

        console.log('✅ User created successfully:', email)

        const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '7d' })
        res.json({
          token,
          user: { id, name, email },
        })
      }
    )
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Server error' })
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = rows[0]
    if (!user.password || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  })
})

module.exports = router
