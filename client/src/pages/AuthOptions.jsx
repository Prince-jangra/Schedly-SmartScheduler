import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import SchedlyLogo from '../components/SchedlyLogo'

function AuthOptions() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
      <header className="border-b border-slate-200/80 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <SchedlyLogo showTagline />
          <div className="flex gap-2">
            <Link
              to="/#plans"
              className="rounded-full px-4 py-2 text-sm font-semibold text-calendly hover:bg-blue-50"
            >
              Plans & pricing
            </Link>
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-calendly-ink hover:bg-slate-50"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-10 shadow-card">
          <h1 className="text-center text-2xl font-semibold text-calendly-ink">Join Schedly</h1>
          <p className="mt-2 text-center text-sm text-calendly-muted">
            Register to create events, generate shareable links, and manage bookings.
          </p>

          <Link
            to="/register"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-calendly py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-calendly-hover"
          >
            <Mail className="h-4 w-4" />
            Continue with email (register)
          </Link>

          <p className="mt-8 text-center text-sm text-calendly-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-calendly hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default AuthOptions
