import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { Clock, User, Mail, Loader2, Globe, ChevronLeft } from 'lucide-react'
import { API_URL } from '../config'
import SchedlyLogo from '../components/SchedlyLogo'

const TIME_SLOTS = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00']

const BASE_TIMEZONE_OPTIONS = [
  'Asia/Kolkata',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Singapore',
  'UTC',
]

function addMinutesToTime(timeStr, mins) {
  const parts = timeStr.split(':').map(Number)
  const h = parts[0] ?? 0
  const m = parts[1] ?? 0
  const total = h * 60 + m + mins
  const nh = Math.floor(total / 60) % 24
  const nm = total % 60
  return `${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}:00`
}

function formatTime12(isoTime) {
  const [hour, minute] = isoTime.split(':').map(Number)
  const d = new Date()
  d.setHours(hour, minute || 0, 0, 0)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [eventError, setEventError] = useState('')
  const [bookedSlots, setBookedSlots] = useState([])
  const [date, setDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [timezone, setTimezone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC')
  const [sendConfirmationEmail, setSendConfirmationEmail] = useState(true)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  const timezoneOptions = useMemo(() => {
    return BASE_TIMEZONE_OPTIONS.includes(timezone) ? BASE_TIMEZONE_OPTIONS : [timezone, ...BASE_TIMEZONE_OPTIONS]
  }, [timezone])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setPageLoading(true)
      setEventError('')
      try {
        const [evRes, bookRes] = await Promise.all([
          axios.get(`${API_URL}/event-types/${id}`),
          axios.get(`${API_URL}/bookings/event/${id}`),
        ])
        if (cancelled) return
        setEvent(evRes.data)
        setBookedSlots(bookRes.data)
      } catch (err) {
        if (!cancelled) {
          setEventError(err.response?.data?.message || 'Event could not be loaded.')
          setEvent(null)
        }
      } finally {
        if (!cancelled) setPageLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  const isBooked = (time) => bookedSlots.some((b) => b.date === date && b.start_time === time && b.status === 'booked')

  const endTime = useMemo(() => {
    if (!selectedTime || !event?.duration) return ''
    return addMinutesToTime(selectedTime, Number(event.duration))
  }, [selectedTime, event])

  const bookSlot = async () => {
    if (!date || !selectedTime || !name || !email || !event) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      await axios.post(`${API_URL}/bookings`, {
        event_type_id: id,
        name,
        email,
        date,
        start_time: selectedTime,
        end_time: endTime || addMinutesToTime(selectedTime, Number(event.duration)),
        timezone,
        send_confirmation_email: sendConfirmationEmail,
      })

      navigate('/booking-confirmation', {
        replace: true,
        state: {
          eventTitle: event.title,
          hostName: event.host_name,
          date,
          time: formatTime12(selectedTime),
          duration: event.duration,
          timezone,
          email,
          sendConfirmationEmail,
        },
      })
    } catch (err) {
      alert(err.response?.data?.message || 'Could not complete booking.')
    } finally {
      setLoading(false)
    }
  }

  const hostInitial = event?.host_name?.trim()?.[0]?.toUpperCase() ?? '?'

  if (pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <Loader2 className="h-10 w-10 animate-spin text-schedly" />
      </div>
    )
  }

  if (eventError || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fb] px-4 text-center">
        <p className="text-base font-medium text-schedly-ink">{eventError || 'Event not found.'}</p>
        <Link to="/" className="mt-6 text-sm font-semibold text-schedly hover:underline">
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg p-2 text-schedly-muted hover:bg-slate-100 hover:text-schedly-ink"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <SchedlyLogo to="/" variant="sm" showTagline />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card lg:flex lg:min-h-[580px]">
          <aside className="border-b border-slate-200/80 p-8 lg:w-[340px] lg:shrink-0 lg:border-b-0 lg:border-r lg:border-slate-200/80">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-schedly text-xl font-semibold text-white">
              {hostInitial}
            </div>
            <p className="mt-4 text-base font-medium text-schedly-ink">{event.host_name}</p>
            <h1 className="mt-2 text-2xl font-bold leading-tight text-schedly-ink">{event.title}</h1>
            <div className="mt-6 space-y-3 text-base text-schedly-muted">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-schedly" />
                <span>{event.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-schedly" />
                <span>{timezone}</span>
              </div>
            </div>
          </aside>

          <div className="border-b border-slate-200/80 p-8 lg:flex-1 lg:border-b-0 lg:border-r lg:border-slate-200/80">
            <h2 className="text-3xl font-semibold text-schedly-ink">Select a date</h2>
            <p className="mt-1 text-base text-schedly-muted">Choose a day for your meeting.</p>
            <div className="mt-6">
              <label className="sr-only" htmlFor="booking-date">Date</label>
              <input
                id="booking-date"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                className="w-full max-w-xs rounded-lg border border-slate-300 px-4 py-3 text-lg text-schedly-ink shadow-sm focus:border-schedly focus:outline-none focus:ring-2 focus:ring-schedly/20"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                  setSelectedTime('')
                }}
              />
            </div>
            {date && (
              <p className="mt-4 text-base text-schedly-muted">
                {new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>

          <div className="p-8 lg:w-[400px] lg:shrink-0">
            <h2 className="text-3xl font-semibold text-schedly-ink">{date ? 'Select a time' : 'Time'}</h2>
            {!date && <p className="mt-2 text-base text-schedly-muted">Pick a date first to see open slots.</p>}

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-semibold text-schedly-muted">Time zone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-schedly-ink focus:border-schedly focus:outline-none focus:ring-2 focus:ring-schedly/20"
              >
                {timezoneOptions.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            {date && (
              <div className="mt-4 max-h-[130px] space-y-2 overflow-y-auto pr-1">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    disabled={isBooked(t)}
                    onClick={() => setSelectedTime(t)}
                    className={`flex w-full items-center justify-center rounded-lg border py-2.5 text-base font-semibold transition ${
                      selectedTime === t
                        ? 'border-calendly bg-calendly text-white'
                        : isBooked(t)
                          ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400'
                          : 'border-slate-200 text-slate-800 hover:border-calendly hover:bg-blue-50/50'
                    }`}
                  >
                    {formatTime12(t)}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 border-t border-slate-100 pt-7">
              <h3 className="text-xl font-semibold text-schedly-ink">Enter details</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-schedly-muted">Name</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-base text-schedly-ink focus:border-schedly focus:outline-none focus:ring-2 focus:ring-schedly/20"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-schedly-muted">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-base text-schedly-ink focus:border-schedly focus:outline-none focus:ring-2 focus:ring-schedly/20"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={sendConfirmationEmail}
                    onChange={(e) => setSendConfirmationEmail(e.target.checked)}
                    className="h-4 w-4 accent-schedly"
                  />
                  <span className="text-sm font-medium text-schedly-ink">Send confirmation email</span>
                </label>
              </div>

              <div className="mt-5 bg-white pt-1">
                <button
                  type="button"
                  onClick={bookSlot}
                  disabled={loading || !date || !selectedTime || !name || !email}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-calendly py-3 text-base font-semibold text-white transition hover:bg-calendly-hover disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? 'Scheduling...' : 'Schedule Meeting'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
