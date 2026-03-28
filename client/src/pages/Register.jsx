import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { User, Mail, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { API_URL } from '../config'
import SchedlyLogo from '../components/SchedlyLogo'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
      })

      setSuccess('Account created. Redirecting…')
      login(response.data.token, response.data.user)
      setTimeout(() => navigate('/dashboard', { replace: true }), 1200)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fb] p-4">
      <div className="mb-8 flex justify-center">
        <SchedlyLogo showTagline variant="lg" />
      </div>

      <div className="w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card sm:p-10">
        <h1 className="text-center text-3xl font-bold tracking-tight text-calendly-ink sm:text-4xl">Register</h1>
        <p className="mt-3 text-center text-base font-medium text-calendly-muted sm:text-lg">
          Create your Schedly account—then generate booking links
        </p>

        {error && (
          <div className="mt-6 flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:p-5">
            <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
            <p className="text-base font-medium leading-relaxed text-red-800 sm:text-lg">{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-6 flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
            <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
            <p className="text-base font-medium leading-relaxed text-emerald-900 sm:text-lg">{success}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-calendly-muted sm:text-base">Full name</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 sm:h-6 sm:w-6" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-3.5 pl-12 pr-3 text-base text-calendly-ink focus:border-calendly focus:outline-none focus:ring-2 focus:ring-calendly/20 sm:py-4 sm:pl-14 sm:text-lg"
                placeholder="Jordan Lee"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-calendly-muted sm:text-base">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 sm:h-6 sm:w-6" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-3.5 pl-12 pr-3 text-base text-calendly-ink focus:border-calendly focus:outline-none focus:ring-2 focus:ring-calendly/20 sm:py-4 sm:pl-14 sm:text-lg"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-calendly-muted sm:text-base">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 sm:h-6 sm:w-6" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-3.5 pl-12 pr-3 text-base text-calendly-ink focus:border-calendly focus:outline-none focus:ring-2 focus:ring-calendly/20 sm:py-4 sm:pl-14 sm:text-lg"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-calendly-muted sm:text-base">Confirm password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 sm:h-6 sm:w-6" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-3.5 pl-12 pr-3 text-base text-calendly-ink focus:border-calendly focus:outline-none focus:ring-2 focus:ring-calendly/20 sm:py-4 sm:pl-14 sm:text-lg"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-calendly py-3.5 text-base font-semibold text-white hover:bg-calendly-hover disabled:opacity-60 sm:py-4 sm:text-lg"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />}
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="mt-8 text-center text-base text-calendly-muted sm:text-lg">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-calendly hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
