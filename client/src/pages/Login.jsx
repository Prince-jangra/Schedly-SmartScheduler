import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { Mail, Lock, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { API_URL } from '../config'
import SchedlyLogo from '../components/SchedlyLogo'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const redirectTimer = useRef(null)

  useEffect(() => {
    return () => {
      if (redirectTimer.current) window.clearTimeout(redirectTimer.current)
    }
  }, [])

  const urlError = searchParams.get('error')
  const displayedError = error || urlError || ''

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      login(response.data.token, response.data.user)
      setSuccess(true)
      setLoading(false)
      redirectTimer.current = window.setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 1100)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f8f9fb] p-4">
      {success && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
          role="alertdialog"
          aria-live="polite"
          aria-label="Login successful"
        >
          <div className="w-full max-w-sm rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-2xl shadow-emerald-500/10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" strokeWidth={2} />
            </div>
            <p className="mt-5 text-2xl font-bold text-calendly-ink">Login successful</p>
            <p className="mt-2 text-lg font-medium text-calendly-muted">Taking you to your dashboard…</p>
            <Loader2 className="mx-auto mt-6 h-8 w-8 animate-spin text-calendly" aria-hidden />
          </div>
        </div>
      )}

      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-center">
          <SchedlyLogo showTagline variant="lg" />
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card sm:p-10">
          <h1 className="text-center text-3xl font-bold tracking-tight text-calendly-ink sm:text-4xl">Sign in</h1>
          <p className="mt-3 text-center text-base font-medium text-calendly-muted sm:text-lg">
            Welcome back to your Schedly dashboard
          </p>

          {displayedError && (
            <div className="mt-6 flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:p-5">
              <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
              <p className="text-base font-medium leading-relaxed text-red-800 sm:text-lg">{displayedError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-calendly-muted sm:text-base">Email address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 sm:h-6 sm:w-6" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-3.5 pl-12 pr-3 text-base text-calendly-ink focus:border-calendly focus:outline-none focus:ring-2 focus:ring-calendly/20 sm:py-4 sm:pl-14 sm:text-lg"
                  placeholder="you@company.com"
                  required
                  disabled={success}
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
                  disabled={success}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-calendly py-3.5 text-base font-semibold text-white hover:bg-calendly-hover disabled:opacity-60 sm:py-4 sm:text-lg"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-base text-calendly-muted sm:text-lg">
            New here?{' '}
            <Link to="/register" className="font-semibold text-calendly hover:underline">
              Register
            </Link>
            {' · '}
            <Link to="/#plans" className="font-semibold text-calendly hover:underline">
              Plans & pricing
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
