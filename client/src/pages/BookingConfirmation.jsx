import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CalendarCheck2, Mail, Globe, Clock, Check } from 'lucide-react'
import SchedlyLogo from '../components/SchedlyLogo'

function BookingConfirmation() {
  const { state } = useLocation()

  const details = useMemo(
    () => ({
      eventTitle: state?.eventTitle || 'Meeting',
      hostName: state?.hostName || 'Host',
      date: state?.date || '',
      time: state?.time || '',
      duration: state?.duration || '',
      timezone: state?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      email: state?.email || '',
      sendConfirmationEmail: Boolean(state?.sendConfirmationEmail),
    }),
    [state]
  )

  const formattedDate = details.date
    ? new Date(`${details.date}T12:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Date not available'

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <SchedlyLogo to="/" variant="sm" showTagline />
          <Link to="/" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card sm:p-10">
          <div className="mb-6 flex items-center justify-start">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-60" />
              <span className="absolute inline-flex h-[84%] w-[84%] animate-pulse rounded-full border border-emerald-300/70" />
              <CalendarCheck2 className="relative z-10 h-8 w-8 text-emerald-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Email Invitation Sent</h1>
          <p className="mt-2 text-base text-slate-600">
            Your meeting is scheduled with <span className="font-semibold text-slate-800">{details.hostName}</span>.
          </p>

          <div className="mt-8 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm sm:text-base">
            <p className="font-semibold text-slate-800">{details.eventTitle}</p>
            <p className="flex items-center gap-2 text-slate-700">
              <Clock className="h-4 w-4" />
              <span>{details.time}{details.duration ? ` · ${details.duration} min` : ''}</span>
            </p>
            <p className="text-slate-700">{formattedDate}</p>
            <p className="flex items-center gap-2 text-slate-700">
              <Globe className="h-4 w-4" />
              <span>{details.timezone}</span>
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
            <p className="flex items-center gap-2 text-sm sm:text-base text-slate-700">
              <Mail className="h-4 w-4" />
              <span>
                {details.sendConfirmationEmail
                  ? `Invitation email sent to ${details.email}`
                  : 'Meeting created. Invitation email was not requested.'}
              </span>
            </p>
            {details.sendConfirmationEmail && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:text-sm">
                <Check className="h-4 w-4 animate-bounce" />
                <span>Email invitation sent</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" className="rounded-xl bg-calendly px-5 py-3 text-sm font-semibold text-white hover:bg-calendly-hover">
              Done
            </Link>
            <Link to="/dashboard" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Go to dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BookingConfirmation
