import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Check,
  UserPlus,
  Sparkles,
  Share2,
  MonitorSmartphone,
  CheckCircle,
  Star,
  Shield,
  Zap,
  Timer,
  Smartphone,
  ExternalLink,
} from 'lucide-react'
import SchedlyLogo from '../components/SchedlyLogo'
import FAQItem from '../components/FAQItem'
const FLOW = [
  {
    step: '01',
    title: 'Register',
    desc: 'Spin up a workspace in under a minute—no desktop installers or IT tickets.',
    detail: 'Your profile powers every booking link you share—name, email, and account settings stay in sync.',
    icon: UserPlus,
  },
  {
    step: '02',
    title: 'Create your event types',
    desc: 'Define titles, durations, and descriptions so guests know exactly what they are booking.',
    detail: 'Schedly generates clean public URLs (`/book/...`) and keeps your dashboard organized as you scale.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Share one resilient link',
    desc: 'Drop the booking link into email signatures, LinkedIn, or your team wiki—one source of truth.',
    detail: 'Updates propagate automatically: change the event type, and returning guests always see the latest version.',
    icon: Share2,
  },
  {
    step: '04',
    title: 'Guests self-serve time',
    desc: 'Visitors pick from live availability; overlaps and double-bookings are blocked server-side.',
    detail: 'Confirmation details stay in one place so coordinators spend less time on calendar ping-pong.',
    icon: MonitorSmartphone,
  },
]

const HOW_IT_WORKS_HIGHLIGHTS = [
  {
    icon: Timer,
    title: '~2 minute setup',
    text: 'From empty account to a shareable booking page without touching a command line.',
  },
  {
    icon: Shield,
    title: 'Guardrailed by design',
    text: 'Passwords are hashed, JWTs expire, and availability rules are enforced on the server—not the browser.',
  },
  {
    icon: Zap,
    title: 'Operational clarity',
    text: 'Dashboard snapshots show active links and event health so teams always know what is live.',
  },
]

const HOW_IT_WORKS_STATS = [
  { value: '4', label: 'Guided milestones' },
  { value: '1', label: 'Link per event' },
  { value: '24/7', label: 'Self-serve booking' },
]

const REVIEWS = [
  {
    name: 'Priya Sharma',
    role: 'UX Consultant',
    text: 'Schedly cut my scheduling noise. Clients use one bold link—my demo finally feels premium.',
    rating: 5,
  },
  {
    name: 'James O’Neill',
    role: 'CS Student',
    text: 'Big headings, clear CTAs, copy-to-clipboard URLs. Exactly what our placement brief asked for.',
    rating: 5,
  },
  {
    name: 'Elena Ruiz',
    role: 'Recruiter',
    text: 'Plans, reviews, and FAQ in one place—easy to present in five minutes.',
    rating: 5,
  },
]

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    sub: 'Perfect for individuals',
    href: '/register?plan=starter',
    cta: 'Get started',
    feat: ['1 Event Type', 'Basic Scheduling', 'Email Support', 'Time zones'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    sub: 'Growing professionals',
    href: '/register?plan=pro',
    cta: 'Start free trial',
    feat: ['5 Event Types', 'Advanced scheduling', 'Priority email', 'Reminders'],
    highlight: true,
  },
  {
    name: 'Business',
    price: '$29',
    period: '/month',
    sub: 'Teams & companies',
    href: '/register?plan=business',
    cta: 'Start free trial',
    feat: ['Unlimited types', 'Team tools', '24/7 phone', 'Custom branding'],
    highlight: false,
    borderAccent: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'Large organizations',
    href: 'mailto:enterprise@schedly.demo',
    cta: 'Contact sales',
    external: true,
    feat: ['Everything in Business', 'API access', 'Dedicated AM', 'SLA'],
    highlight: false,
  },
]

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why Schedly', href: '#why-schedly' },
  { label: 'Plans', href: '#plans' },
  { label: 'Apps', href: '#apps' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

/** Replace hrefs with your real listing IDs when apps are published. */
const STORE_INSTALL_LINKS = [
  {
    id: 'play',
    title: 'Google Play',
    subtitle: 'Android phones & tablets',
    href: 'https://play.google.com/store',
    className: 'bg-[#01875f] hover:bg-[#016b4d] ring-1 ring-black/10',
  },
  {
    id: 'ios',
    title: 'App Store',
    subtitle: 'iPhone & iPad',
    href: 'https://apps.apple.com',
    className: 'bg-slate-900 hover:bg-slate-800 ring-1 ring-white/10',
  },
]

const WHY_FEATURES = [
  {
    icon: Calendar,
    title: 'Easy scheduling',
    desc: 'Shareable event types, public booking pages, and smart conflict checks—without the clutter.',
  },
  {
    icon: Clock,
    title: 'Save real time',
    desc: 'One link replaces ten emails. Guests pick a slot while you stay focused on real work.',
  },
  {
    icon: Users,
    title: 'Built to impress',
    desc: 'Calendly-style polish—clear hierarchy, bold CTAs, and a flow that feels production-ready.',
  },
]

function Landing() {
  const { hash } = useLocation()

  useEffect(() => {
    const raw = (hash || window.location.hash).replace(/^#/, '')
    if (!raw) return
    const allowed = ['plans', 'how-it-works', 'why-schedly', 'faq', 'reviews', 'apps']
    if (!allowed.includes(raw)) return
    requestAnimationFrame(() => {
      document.getElementById(raw)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [hash])

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 border-b-[5px] border-slate-300/90 bg-white/95 shadow-md backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5 sm:py-3.5 lg:px-8">
          <SchedlyLogo
            showTagline
            variant="lg"
            wordmarkClassName="text-xl sm:text-2xl"
            taglineClassName="text-[10px] font-semibold uppercase tracking-wide text-calendly sm:text-[11px]"
          />
          <div className="order-3 hidden w-full items-center justify-center gap-1 lg:order-none lg:flex lg:w-auto lg:gap-1.5 xl:gap-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-base font-semibold tracking-tight text-calendly-ink antialiased transition hover:bg-blue-50 hover:text-calendly focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calendly/40 lg:px-3.5 lg:py-2.5 xl:text-lg"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-lg px-3.5 py-2 text-base font-bold tracking-tight text-calendly-ink transition hover:bg-slate-100 sm:px-4 sm:py-2.5"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-calendly px-5 py-2.5 text-base font-extrabold tracking-tight text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20 transition hover:bg-calendly-hover hover:shadow-lg sm:px-6 sm:py-3"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,107,255,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-14">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-calendly">Smart scheduling</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-calendly-ink md:text-5xl lg:text-[3.25rem]">
                Schedule smarter,
                <span className="mt-2 block bg-gradient-to-r from-blue-600 via-calendly to-indigo-600 bg-clip-text text-transparent">
                  not harder
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base font-medium leading-[1.65] text-calendly-muted md:text-lg">
                Share booking links, save time, and run a polished scheduling experience—clear visuals, calm layout,
                zero clutter.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-5">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-2xl bg-calendly px-7 py-3 text-base font-extrabold tracking-tight text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/25 transition hover:bg-calendly-hover hover:shadow-xl md:px-8 md:py-3.5 md:text-lg"
                >
                  Get started free <ArrowRight className="h-5 w-5 shrink-0 md:h-6 md:w-6" strokeWidth={2.5} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-2xl border-[3px] border-slate-300 bg-white px-7 py-3 text-base font-extrabold tracking-tight text-calendly-ink transition hover:border-calendly hover:bg-blue-50/80 md:px-8 md:py-3.5 md:text-lg"
                >
                  Sign in
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
                <span className="w-full text-sm font-bold text-calendly-muted sm:w-auto md:text-base">Jump to:</span>
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border-2 border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold tracking-tight text-calendly-ink shadow-sm transition hover:border-calendly hover:bg-white hover:shadow-md md:px-4 md:py-2.5 md:text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <p className="mt-8 text-sm font-medium text-calendly-muted md:text-base">
                No credit card required to get started.
              </p>
            </div>

            <div className="relative min-w-0 lg:pt-2">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-100/80 via-indigo-50/60 to-slate-100/80 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 transition hover:shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-[#0b3558] to-[#0d4a7a] px-6 py-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-300">Home</p>
                    <p className="text-lg font-semibold text-white">Scheduling overview</p>
                  </div>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                </div>
                <div className="grid grid-cols-3 gap-px border-b border-slate-100 bg-slate-100">
                  {[
                    { label: 'Event types', value: '3', tone: 'text-calendly' },
                    { label: 'Active links', value: '3', tone: 'text-calendly-ink' },
                    { label: 'This week', value: '—', tone: 'text-calendly-muted' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white px-4 py-4 text-center">
                      <p className={`text-2xl font-bold ${s.tone}`}>{s.value}</p>
                      <p className="mt-1 text-xs font-medium text-calendly-muted">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2.5 p-5 sm:p-6">
                  <div className="flex cursor-pointer gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/90 to-white p-3.5 transition sm:p-4 hover:shadow-md active:scale-[0.99]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-calendly text-white shadow-md">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-calendly-ink">30 min meeting</p>
                      <p className="mt-0.5 text-sm text-calendly-muted">Public /book/… link</p>
                    </div>
                    <Check className="h-6 w-6 shrink-0 text-emerald-500" strokeWidth={2.5} />
                  </div>
                  <div className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-3.5 transition sm:p-4 hover:border-calendly/25 hover:shadow-md active:scale-[0.99]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-calendly-ink">
                      <Users className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-calendly-ink">Team intro</p>
                      <p className="mt-0.5 text-sm text-calendly-muted">Copy link · preview</p>
                    </div>
                  </div>
                  <div className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-3.5 transition sm:p-4 hover:border-calendly/25 hover:shadow-md active:scale-[0.99]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-calendly-ink">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-calendly-ink">Discovery call</p>
                      <p className="mt-0.5 text-sm text-calendly-muted">Guests pick date & time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-t border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/80 pb-16 pt-16 md:pb-20 md:pt-20 lg:pt-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between xl:gap-16">
            <div className="max-w-3xl lg:pt-1">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-calendly">Workflow</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-calendly-ink md:mt-5 md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                How it works
              </h2>
              <p className="mt-6 text-lg font-medium leading-[1.65] text-calendly-muted md:text-xl">
                Four deliberate steps take you from a blank account to a customer-ready scheduling surface. Each card
                below expands on what your team actually does in that moment—so stakeholders see a real platform, not
                placeholder lorem ipsum.
              </p>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-3 lg:max-w-lg lg:shrink-0 xl:max-w-xl">
              {HOW_IT_WORKS_STATS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200/90 bg-white/90 px-5 py-6 text-center shadow-sm shadow-slate-200/40 sm:px-6"
                >
                  <p className="text-2xl font-extrabold text-calendly-ink md:text-3xl">{item.value}</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase leading-snug tracking-wide text-calendly-muted sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6 lg:mt-14">
            {HOW_IT_WORKS_HIGHLIGHTS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-200/30 sm:p-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-calendly">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-calendly-ink md:text-lg">{item.title}</p>
                    <p className="mt-3 text-sm font-medium leading-[1.6] text-calendly-muted md:text-base">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-7">
            {FLOW.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.step}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/40 transition duration-300 hover:-translate-y-1 hover:border-calendly/35 hover:shadow-lg sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-5xl font-bold leading-none text-slate-100 transition duration-300 group-hover:text-blue-100">
                      {s.step}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-calendly-ink/80">
                      Milestone
                    </span>
                  </div>
                  <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-calendly to-blue-600 text-white shadow-md transition duration-300 group-hover:scale-[1.03]">
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-calendly-ink">{s.title}</h3>
                  <p className="mt-3 text-base font-medium leading-relaxed text-calendly-muted">{s.desc}</p>
                  <p className="mt-4 border-t border-slate-100 pt-4 text-sm font-medium leading-relaxed text-calendly-muted/95 md:text-[0.95rem]">
                    {s.detail}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-14 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-9 shadow-inner shadow-slate-200/40 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-10 lg:mt-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-calendly">Next step</p>
              <p className="mt-2 text-xl font-bold text-calendly-ink md:text-2xl">Ready to put Schedly in front of your team?</p>
              <p className="mt-2 max-w-2xl text-base font-medium text-calendly-muted">
                Create an account, add your first event type, and paste the booking link into the next email you send—it
                is the fastest way to prove the workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:shrink-0 sm:flex-col sm:items-stretch lg:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-calendly px-6 py-3 text-base font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:bg-calendly-hover"
              >
                Start free
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-300 bg-white px-6 py-3 text-base font-extrabold text-calendly-ink transition hover:border-calendly hover:bg-blue-50/80"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-schedly"
        className="relative scroll-mt-24 overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white via-slate-50/80 to-white py-16 md:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-calendly/25 via-blue-400/10 to-transparent blur-3xl animate-float-slow" />
        <div
          className="pointer-events-none absolute -right-32 bottom-20 h-[380px] w-[380px] rounded-full bg-gradient-to-tl from-indigo-400/20 via-violet-300/10 to-transparent blur-3xl animate-float-slow"
          style={{ animationDelay: '2.5s' }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[min(90vw,1200px)] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-calendly/15 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="animate-fade-in-up text-sm font-bold uppercase tracking-[0.25em] text-calendly"
              style={{ animationDelay: '0ms' }}
            >
              Why Schedly
            </p>
            <h2
              className="animate-fade-in-up mt-4 text-4xl font-bold tracking-tight text-calendly-ink md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
              style={{ animationDelay: '80ms' }}
            >
              Scheduling that feels{' '}
              <span className="bg-gradient-to-r from-calendly via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                premium
              </span>
              , not patched together
            </h2>
            <p
              className="animate-fade-in-up mt-6 text-lg leading-relaxed text-calendly-muted md:text-xl"
              style={{ animationDelay: '160ms' }}
            >
              Purpose-built flows, bold typography, and motion that guides the eye—so your demo reads as a real product.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {WHY_FEATURES.map((f, i) => {
              const Icon = f.icon
              const orbStyles = [
                'bg-gradient-to-br from-calendly/30 to-blue-400/20',
                'bg-gradient-to-br from-indigo-400/25 to-calendly/20',
                'bg-gradient-to-br from-violet-400/20 to-indigo-500/20',
              ]
              const iconStyles = [
                'bg-gradient-to-br from-blue-500 to-calendly shadow-lg shadow-blue-500/30',
                'bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/25',
                'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25',
              ]
              return (
                <div
                  key={f.title}
                  className="group relative animate-fade-in-up overflow-hidden rounded-3xl border border-slate-200/90 bg-white/80 p-8 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] backdrop-blur-md transition duration-500 ease-out hover:-translate-y-3 hover:border-calendly/35 hover:shadow-glow-soft"
                  style={{ animationDelay: `${220 + i * 110}ms` }}
                >
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-2xl transition duration-700 group-hover:opacity-70 group-hover:blur-3xl ${orbStyles[i]}`}
                  />
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl text-white transition duration-500 group-hover:scale-110 group-hover:rotate-3 ${iconStyles[i]}`}
                  >
                    <Icon className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <h3 className="relative mt-7 text-xl font-bold text-calendly-ink md:text-2xl">{f.title}</h3>
                  <p className="relative mt-3 text-base leading-relaxed text-calendly-muted">{f.desc}</p>
                  <div className="relative mt-8 h-1 w-12 rounded-full bg-gradient-to-r from-calendly to-indigo-500 transition-all duration-500 group-hover:w-full group-hover:opacity-80" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="plans" className="relative scroll-mt-24 overflow-hidden border-b border-slate-100 py-16 md:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,#f1f5f9_0%,#ffffff_35%,#eff6ff_70%,#f8fafc_100%)]" />
        <div className="pointer-events-none absolute -left-48 top-0 h-[min(600px,80vh)] w-[min(600px,80vw)] rounded-full bg-calendly/[0.11] blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-400/10 blur-[90px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className="animate-fade-in-up text-sm font-bold uppercase tracking-[0.25em] text-calendly"
              style={{ animationDelay: '0ms' }}
            >
              Subscriptions
            </p>
            <h2
              className="animate-fade-in-up mt-3 text-4xl font-bold tracking-tight text-calendly-ink md:text-5xl"
              style={{ animationDelay: '60ms' }}
            >
              Plans &amp; pricing
            </h2>
            <p
              className="animate-fade-in-up mx-auto mt-4 max-w-2xl text-lg text-calendly-muted md:text-xl"
              style={{ animationDelay: '120ms' }}
            >
              Choose a tier that fits you—upgrade or change anytime.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p, i) => (
              <div
                key={p.name}
                style={{ animationDelay: `${180 + i * 95}ms` }}
                className={`animate-fade-in-up relative flex flex-col rounded-3xl border p-7 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.1)] transition duration-500 ease-out hover:-translate-y-2 hover:shadow-xl ${
                  p.highlight
                    ? 'z-10 border-calendly/80 bg-gradient-to-b from-calendly to-blue-700 text-white shadow-glow-blue ring-2 ring-white/30 lg:scale-[1.04]'
                    : p.borderAccent
                      ? 'border-2 border-calendly/40 bg-white hover:border-calendly/70'
                      : 'border-slate-200/90 bg-white/95 hover:border-calendly/25'
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-calendly-ink shadow-lg">
                    Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold ${p.highlight ? '' : 'text-calendly-ink'}`}>{p.name}</h3>
                <p className={`mt-2 text-sm font-medium ${p.highlight ? 'text-blue-100' : 'text-calendly-muted'}`}>
                  {p.sub}
                </p>
                <div className={p.highlight ? 'my-7 border-b border-white/15 pb-7' : 'my-6'}>
                  <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">{p.price}</span>
                  {p.period && (
                    <span className={`text-lg font-semibold ${p.highlight ? 'text-blue-100' : 'text-calendly-muted'}`}>
                      {p.period}
                    </span>
                  )}
                </div>
                {p.highlight && <div className="-mt-1 mb-5 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />}
                {p.external ? (
                  <a
                    href={p.href}
                    className={`mb-6 block rounded-2xl border-2 border-transparent py-3.5 text-center text-base font-extrabold tracking-tight transition duration-300 hover:scale-[1.02] ${
                      p.highlight
                        ? 'bg-white text-calendly shadow-md hover:bg-slate-50'
                        : 'bg-calendly-ink text-white hover:bg-slate-800'
                    }`}
                  >
                    {p.cta}
                  </a>
                ) : (
                  <Link
                    to={p.href}
                    className={`mb-6 block rounded-2xl border-2 border-transparent py-3.5 text-center text-base font-extrabold tracking-tight transition duration-300 hover:scale-[1.02] ${
                      p.highlight
                        ? 'bg-white text-calendly shadow-md hover:bg-slate-50'
                        : 'bg-calendly text-white shadow-md shadow-blue-500/20 hover:bg-calendly-hover'
                    }`}
                  >
                    {p.cta}
                  </Link>
                )}
                <ul className="space-y-3 text-sm font-medium">
                  {p.feat.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <CheckCircle
                        className={`mt-0.5 h-5 w-5 shrink-0 ${p.highlight ? 'text-amber-300' : 'text-emerald-500'}`}
                        strokeWidth={2}
                      />
                      <span className={p.highlight ? 'text-blue-50' : 'text-calendly-muted'}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-24 border-b border-slate-100 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-calendly-ink md:text-4xl">Reviews</h2>
            <p className="mt-3 text-lg text-calendly-muted">What people say about the experience.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-calendly/25 hover:shadow-md"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 text-base font-semibold leading-relaxed text-calendly-ink">“{r.text}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-bold text-calendly-ink">{r.name}</span>
                  <span className="font-medium text-calendly-muted"> — {r.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-white py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-calendly-ink md:text-4xl">FAQ</h2>
            <p className="mt-3 text-lg text-calendly-muted">Straight answers—no fluff.</p>
          </div>
          <div className="mt-10 space-y-3">
            <FAQItem
              question="Can I upgrade or downgrade anytime?"
              answer="Yes. Upgrades apply immediately; downgrades typically at the end of your billing cycle."
            />
            <FAQItem
              question="What's included in the free plan?"
              answer="Starter includes one event type, core scheduling, email support, and timezone-aware booking."
            />
            <FAQItem
              question="Is there a free trial on paid plans?"
              answer="Classic pattern: 14 days with no card—this UI describes that story for coursework."
            />
            <FAQItem
              question="Is my data secure?"
              answer="Use HTTPS in production, bcrypt for passwords, and rotate JWT secrets—see the server code."
            />
          </div>
        </div>
      </section>

      <section
        id="apps"
        className="scroll-mt-24 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white py-14 md:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-calendly/10 text-calendly">
              <Smartphone className="h-7 w-7" strokeWidth={2} />
            </div>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-calendly">Get the app</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-calendly-ink md:text-4xl">
              Install from the Play Store, App Store, or use the web
            </h2>
            <p className="mt-4 text-lg font-medium leading-relaxed text-calendly-muted md:text-xl">
              Take Schedly with you—manage event types, copy booking links, and stay on top of confirmations. Your account
              is the same everywhere; sign in once and pick the surface you prefer.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            {STORE_INSTALL_LINKS.map((store) => (
              <a
                key={store.id}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-w-[240px] flex-1 items-center justify-center gap-3 rounded-2xl px-6 py-4 text-left text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:flex-none sm:py-5 ${store.className}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider opacity-90">Get it on</p>
                  <p className="text-lg font-extrabold leading-tight tracking-tight">{store.title}</p>
                  <p className="mt-0.5 text-xs font-medium opacity-90">{store.subtitle}</p>
                </div>
                <ExternalLink className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
              </a>
            ))}
            <Link
              to="/register"
              className="flex min-w-[240px] flex-1 items-center justify-center gap-3 rounded-2xl border-[3px] border-calendly/40 bg-white px-6 py-4 text-calendly-ink shadow-md transition hover:-translate-y-0.5 hover:border-calendly hover:shadow-lg sm:flex-none sm:py-5"
            >
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-calendly">No install</p>
                <p className="text-lg font-extrabold leading-tight tracking-tight">Use in browser</p>
                <p className="mt-0.5 text-xs font-medium text-calendly-muted">Works on any device</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-calendly" strokeWidth={2.5} />
            </Link>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-medium leading-relaxed text-calendly-muted">
            Prefer not to install? Use Schedly in the browser—it is responsive and works on phones and desktops alike.
          </p>
        </div>
      </section>

      <footer className="border-t-[4px] border-slate-200 bg-slate-50/80 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
            <SchedlyLogo to="/" variant="sm" />
            <a
              href="mailto:support@schedly.demo"
              className="inline-flex items-center justify-center rounded-2xl bg-calendly px-8 py-3.5 text-base font-extrabold tracking-tight text-white shadow-lg shadow-blue-500/20 transition hover:bg-calendly-hover"
            >
              Contact support
            </a>
          </div>
          <p className="text-center text-sm font-medium text-calendly-muted">
            © {new Date().getFullYear()} Schedly
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
