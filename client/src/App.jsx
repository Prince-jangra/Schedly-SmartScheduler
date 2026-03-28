import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Booking from './pages/Booking'
import BookingConfirmation from './pages/BookingConfirmation'
import GetStarted from './pages/GetStarted'
import ExploreScheduling from './pages/ExploreScheduling'
import AuthOptions from './pages/AuthOptions'
import { useAuth } from './context/AuthContext'

function App() {
  const { token } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/get-started" element={token ? <Navigate to="/dashboard" /> : <GetStarted />} />
      <Route path="/explore" element={<ExploreScheduling />} />
      <Route path="/subscriptions" element={<Navigate to="/#plans" replace />} />
      <Route path="/install" element={<Navigate to="/" replace />} />
      <Route path="/auth" element={token ? <Navigate to="/dashboard" /> : <AuthOptions />} />
      <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/book/:id" element={<Booking />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
