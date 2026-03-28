# Schedly - Professional Meeting Scheduling Platform

A modern, full-stack meeting scheduling application with authentication, event management, and booking system.

## ✨ Features

- **User Authentication**: Secure login & registration with JWT
- **Event Management**: Create and manage multiple meeting types
- **Smart Booking**: Book meetings with date/time selection
- **Responsive Design**: Beautiful UI with gradient backgrounds and animations
- **User Dashboard**: Manage events, view bookings, copy booking links
- **Landing Page**: Professional introduction page

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## 🚀 Installation & Setup

### 1. Database Setup

Run the SQL schema to create tables:

```sql
-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Types Table
CREATE TABLE IF NOT EXISTS event_types (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Availability Table
CREATE TABLE IF NOT EXISTS availability (
  id VARCHAR(36) PRIMARY KEY,
  event_type_id VARCHAR(36) NOT NULL,
  day_of_week INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE
);

-- Bookings Table
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

-- Meetings Table
CREATE TABLE IF NOT EXISTS meetings (
  id VARCHAR(36) PRIMARY KEY,
  booking_id VARCHAR(36) NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
```

### 2. Server Setup

```bash
cd server

# Create .env file
# Add your database credentials:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=calendly_clone
# JWT_SECRET=your_secret_key

# Install dependencies
npm install

# Start the server
npm run dev
```

### 3. Client Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Authentication

### Demo Account

- Email: `test@example.com`
- Password: `password123`

### How to Register

1. Click "Get Started" on the landing page
2. Fill in your name, email, and password
3. Click "Create Account"
4. You'll be automatically logged in and redirected to dashboard

## 📱 Usage

### Creating an Event Type

1. Go to Dashboard
2. Fill in event title and duration
3. Click "Create Event"
4. Copy the booking link to share

### Booking an Event

1. Click "Book Now" on any event card
2. Select a date
3. Select a time slot
4. Enter your name and email
5. Confirm booking

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Responsive grid layouts
- Glass morphism effects
- Lucide React icons
- Tailwind CSS styling

## 📁 Project Structure

```
Calendly_clone/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx      (Public landing page)
│   │   │   ├── Login.jsx        (Login page)
│   │   │   ├── Register.jsx     (Registration page)
│   │   │   ├── Dashboard.jsx    (User dashboard)
│   │   │   └── Booking.jsx      (Booking page)
│   │   ├── App.jsx              (Main app with routing)
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/
    ├── routes/
    │   ├── auth.js              (Login/Register routes)
    │   ├── events.js            (Event management)
    │   ├── bookings.js          (Booking routes)
    │   ├── availability.js      (Availability routes)
    │   └── meetings.js          (Meetings routes)
    ├── middleware/
    │   └── auth.js              (JWT verification)
    ├── db.js                    (Database connection)
    ├── index.js                 (Express app)
    ├── package.json
    ├── .env.example
    └── schema.sql               (Database schema)
```

## 🔑 Key Dependencies

### Client

- React 19
- React Router DOM 7
- Axios (HTTP client)
- Tailwind CSS
- Lucide React (Icons)
- Vite (Build tool)

### Server

- Express.js
- MySQL2
- jsonwebtoken (JWT)
- bcryptjs (Password hashing)
- CORS
- UUID

## 🛠️ API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Events

- `POST /events` - Create event (protected)
- `GET /events` - Get user's events (protected)
- `DELETE /events/:id` - Delete event (protected)

### Bookings

- `POST /bookings` - Create booking
- `GET /bookings` - Get bookings

### Meetings

- `GET /meetings` - Get all meetings

## 🔒 Security Features

- JWT authentication tokens
- Password hashing with bcryptjs
- Protected routes
- CORS enabled
- Token refresh support

## 🚀 Deployment

### Client (Vercel/Netlify)

```bash
cd client
npm run build
```

### Server (Heroku/Railway)

```bash
npm install
npm start
```

Update API endpoint in client environment variables for production.

## 📝 License

This project is for educational purposes.

## 👨‍💻 Author

Created as a placement assignment project.

## 📞 Support

For issues or questions, please check the code or contact the developer.
