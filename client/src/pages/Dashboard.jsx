import { useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus,
  Trash2,
  LogOut,
  Menu,
  ExternalLink,
  Check,
  Copy,
  LayoutDashboard,
  Link2,
  CalendarDays,
} from 'lucide-react'
import { API_URL } from '../config'
import SchedlyLogo from '../components/SchedlyLogo'
import { useAuth } from '../context/AuthContext'

// ——— constants ———

const COPY_FEEDBACK_MS = 2200

const WEEKDAY_LABELS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// ——— small pure helpers (easy to test / scan) ———

function greetingForHour(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

/** Monday–Sunday week containing the given instant (local time). */
function getWeekDaysContaining(anchor = new Date()) {
  const day = anchor.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const monday = new Date(anchor)
  monday.setDate(anchor.getDate() + mondayOffset)
  monday.setHours(0, 0, 0, 0)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

function calendarDayKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

/** Shown next to the user name in the header (“recent” context cue). */
function formatTodayForProfile(date = new Date()) {
  const formatted = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
  return `Today · ${formatted}`
}

function Dashboard() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()

  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  const now = new Date()
  const greeting = greetingForHour(now.getHours())
  const todayKey = calendarDayKey(now)
  const todayProfileLabel = formatTodayForProfile(now)

  const bookingUrl = useCallback(
    (eventId) => `${window.location.origin}/book/${eventId}`,
    []
  )

  const weekDays = getWeekDaysContaining(now)

  const avgDuration = useMemo(() => {
    if (!events.length) return null
    const sum = events.reduce((acc, e) => acc + (Number(e.duration) || 0), 0)
    return Math.round(sum / events.length)
  }, [events])

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setEvents(response.data)
    } catch (err) {
      console.error('Error fetching events:', err)
    }
  }, [token])

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(userData)
    fetchEvents()
  }, [token, navigate, fetchEvents])

  useEffect(() => {
    if (!copiedId) return
    const t = window.setTimeout(() => setCopiedId(null), COPY_FEEDBACK_MS)
    return () => window.clearTimeout(t)
  }, [copiedId])

  const createEvent = async (e) => {
    e.preventDefault()
    if (!title || !duration) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      await axios.post(
        `${API_URL}/events`,
        { title, duration },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTitle('')
      setDuration('')
      fetchEvents()
    } catch {
      alert('Error creating event')
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (eventId) => {
    if (!window.confirm('Delete this event type?')) return
    try {
      await axios.delete(`${API_URL}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchEvents()
    } catch {
      alert('Error deleting event')
    }
  }

  const copyLink = async (eventId) => {
    const link = bookingUrl(eventId)
    try {
      await navigator.clipboard.writeText(link)
      setCopiedId(eventId)
    } catch {
      alert('Could not copy. Select the link manually.')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const firstName = user?.name?.split?.(' ')?.[0] || 'there'

  /* ——— render ——— */

  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200/90 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex min-h-[4.5rem] items-center border-b border-slate-100 px-5 py-3">
          <SchedlyLogo to="/dashboard" variant="md" showTagline />
        </div>
        <nav className="flex-1 space-y-1.5 p-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3.5 text-lg font-semibold text-calendly"
          >
            <LayoutDashboard className="h-7 w-7 shrink-0" />
            Home
          </Link>
          <a
            href="#events"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-lg font-semibold text-calendly-ink transition hover:bg-slate-50"
          >
            <Link2 className="h-7 w-7 shrink-0 text-calendly" />
            Your events
          </a>
          <Link
            to="/#faq"
            className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-lg font-semibold text-calendly-ink transition hover:bg-slate-50"
            onClick={() => setSidebarOpen(false)}
          >
            <CalendarDays className="h-7 w-7 shrink-0 text-calendly" />
            Help & FAQ
          </Link>
        </nav>
        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-3.5 text-lg font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
          <div className="flex min-h-[4.25rem] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="rounded-lg p-2 text-calendly-ink hover:bg-slate-100 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <p className="hidden min-w-0 truncate text-lg font-semibold text-calendly-ink sm:block">
                {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 rounded-full border border-slate-200/80 bg-slate-50/90 px-3 py-2 pr-5 sm:flex">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-calendly text-lg font-bold text-white">
                  {user?.name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div className="min-w-0">
                  <span className="block max-w-[220px] truncate text-lg font-semibold text-calendly-ink">
                    {user?.name}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-slate-500 sm:text-sm">{todayProfileLabel}</span>
                </div>
              </div>
              <div className="relative sm:hidden">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="rounded-lg p-2 text-calendly-ink hover:bg-slate-100"
                  aria-expanded={menuOpen}
                >
                  <span className="sr-only">Account</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-calendly text-lg font-bold text-white">
                    {user?.name?.[0]?.toUpperCase() ?? '?'}
                  </div>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                    <p className="border-b border-slate-100 px-4 py-2.5 text-xs font-medium leading-snug text-slate-600">
                      {todayProfileLabel}
                    </p>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-3.5 text-left text-base font-semibold text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden items-center gap-2 rounded-full px-5 py-3 text-base font-semibold text-slate-600 hover:bg-slate-100 hover:text-calendly-ink sm:flex"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Sign out
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-bold tracking-tight text-calendly-ink sm:text-4xl">
                  {greeting}, {firstName}
                </h1>
                <p className="mt-2 text-base leading-relaxed text-slate-700 sm:text-lg">
                  Create event types and copy booking links for guests.
                </p>
              </div>

              {/* Calendar replaces old Types/Avg squares; stats sit under the week */}
              <div className="w-full shrink-0 lg:w-[min(100%,22rem)]">
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                  <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <CalendarDays className="h-5 w-5 shrink-0 text-calendly" aria-hidden />
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-600 sm:text-sm">This week</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {weekDays.map((d, i) => {
                      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
                      const isToday = key === todayKey
                      const dayLabel = WEEKDAY_LABELS_SHORT[i]
                      return (
                        <div
                          key={key}
                          className={`flex min-h-[3rem] flex-col items-center justify-center rounded-md px-0.5 py-1 sm:min-h-[3.25rem] ${
                            isToday
                              ? 'bg-calendly text-white shadow-sm ring-1 ring-calendly/30'
                              : 'bg-slate-50 text-calendly-ink'
                          }`}
                        >
                          <span
                            className={`max-w-full truncate text-[9px] font-bold leading-none sm:text-[11px] ${isToday ? 'text-blue-100' : 'text-slate-500'}`}
                          >
                            {dayLabel}
                          </span>
                          <span className="mt-0.5 text-xs font-bold tabular-nums sm:text-sm">{d.getDate()}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                    <div className="flex flex-1 flex-col items-center text-center">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Types</span>
                      <span className="text-xl font-bold tabular-nums text-calendly-ink sm:text-2xl">{events.length}</span>
                    </div>
                    <div className="h-10 w-px shrink-0 bg-slate-200" />
                    <div className="flex flex-1 flex-col items-center text-center">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Avg</span>
                      <span className="text-xl font-bold tabular-nums text-calendly-ink sm:text-2xl">
                        {avgDuration != null ? `${avgDuration}m` : '—'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="events" className="scroll-mt-20 mt-7">
              <h2 className="text-lg font-bold text-calendly-ink sm:text-xl">New event</h2>
              <form
                onSubmit={createEvent}
                className="mt-3 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end sm:gap-4"
              >
                <div className="min-w-0 flex-1 sm:min-w-[260px]">
                  <label className="mb-1.5 block text-sm font-bold text-slate-700 sm:text-base">Name</label>
                  <input
                    type="text"
                    placeholder="e.g. 30 minute meeting"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-calendly-ink placeholder:text-slate-500 focus:border-calendly focus:outline-none focus:ring-2 focus:ring-calendly/20 sm:py-3 sm:text-lg"
                    required
                  />
                </div>
                <div className="w-full sm:w-32">
                  <label className="mb-1.5 block text-sm font-bold text-slate-700 sm:text-base">Mins</label>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    placeholder="30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-calendly-ink placeholder:text-slate-500 focus:border-calendly focus:outline-none focus:ring-2 focus:ring-calendly/20 sm:py-3 sm:text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-calendly px-6 py-2.5 text-base font-bold text-white shadow-sm transition hover:bg-calendly-hover disabled:opacity-60 sm:shrink-0 sm:py-3"
                >
                  <Plus className="h-5 w-5" />
                  {loading ? '…' : 'Create'}
                </button>
              </form>

              <h2 className="mb-3 mt-7 text-lg font-bold text-calendly-ink sm:text-xl">Your events</h2>

              {events.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center shadow-sm">
                  <CalendarDays className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="mt-3 text-base font-semibold text-calendly-ink sm:text-lg">No events yet</p>
                  <p className="mt-1 text-sm text-slate-600 sm:text-base">Use the form above.</p>
                </div>
              ) : (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                  {events.map((ev) => (
                    <li
                      key={ev.id}
                      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-calendly/30 hover:shadow-md sm:p-5"
                    >
                      <h3 className="line-clamp-3 min-h-[2.75rem] text-base font-bold leading-snug text-calendly-ink sm:min-h-[3.25rem] sm:text-lg">
                        {ev.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-600 sm:text-base">{ev.duration} min</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => copyLink(ev.id)}
                          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-bold sm:flex-initial sm:min-w-[6.5rem] sm:px-4 sm:text-base ${
                            copiedId === ev.id
                              ? 'bg-emerald-600 text-white'
                              : 'bg-calendly text-white hover:bg-calendly-hover'
                          }`}
                        >
                          {copiedId === ev.id ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                          {copiedId === ev.id ? 'Copied' : 'Copy'}
                        </button>
                        <Link
                          to={`/book/${ev.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 border-calendly/40 px-3 py-2.5 text-sm font-bold text-calendly hover:bg-blue-50 sm:flex-initial sm:min-w-[6.5rem] sm:px-4 sm:text-base"
                        >
                          <ExternalLink className="h-5 w-5" />
                          Open
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteEvent(ev.id)}
                          className="inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-2.5 text-red-700 hover:bg-red-100"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      <input
                        readOnly
                        value={bookingUrl(ev.id)}
                        title={bookingUrl(ev.id)}
                        className="mt-3 w-full break-all rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-xs leading-snug text-calendly-ink sm:text-sm"
                        onFocus={(e) => e.target.select()}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="mt-7 text-center text-sm text-slate-600 sm:text-base">
              Need help?{' '}
              <Link to="/#faq" className="font-semibold text-calendly hover:underline">
                FAQ
              </Link>
              <span className="text-slate-300"> · </span>
              <Link to="/#plans" className="font-semibold text-calendly hover:underline">
                Plans & pricing
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
