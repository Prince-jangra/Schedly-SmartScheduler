import { useId } from 'react'
import { Link } from 'react-router-dom'

const SIZES = {
  sm: { box: 'h-8 w-8', svg: 'h-4 w-4' },
  md: { box: 'h-10 w-10', svg: 'h-5 w-5' },
  lg: { box: 'h-12 w-12', svg: 'h-6 w-6' },
}

/**
 * Schedly wordmark + gradient “S” mark (unique curve, not a generic letter in a circle).
 */
export default function SchedlyLogo({
  to = '/',
  variant = 'md',
  showWordmark = true,
  showTagline = false,
  /** Override default wordmark sizing (avoids conflicting Tailwind utilities) */
  wordmarkClassName = '',
  taglineClassName = '',
  /** Light logo on dark backgrounds (e.g. footer) */
  invert = false,
  className = '',
}) {
  const gid = useId().replace(/:/g, '')
  const { box, svg } = SIZES[variant] || SIZES.md

  const mark = (
    <div className="relative shrink-0">
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 opacity-35 blur-md" />
      <div
        className={`relative flex ${box} items-center justify-center rounded-xl border-2 shadow-md ${
          invert
            ? 'border-white/40 bg-white/10 ring-1 ring-white/20'
            : 'border-blue-600 bg-white ring-1 ring-blue-500/20'
        }`}
      >
        <svg className={svg} viewBox="0 0 32 32" fill="none" aria-hidden>
          <defs>
            <linearGradient id={`schedly-grad-${gid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path
            d="M 22 9 Q 26 9 26 12 Q 26 14 24 15 L 10 15 Q 8 15 8 17 Q 8 19 10 19 L 24 19 Q 26 20 26 22 Q 26 25 22 25 Q 18 25 16 23"
            fill={`url(#schedly-grad-${gid})`}
            stroke="#1d4ed8"
            strokeWidth="0.55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )

  const defaultWordmark = `text-lg font-bold tracking-tight sm:text-xl ${invert ? 'text-white' : 'text-calendly-ink'}`
  const defaultTagline = `text-[11px] font-semibold uppercase tracking-wide sm:text-xs ${
    invert ? 'text-blue-200/90' : 'text-calendly'
  }`

  const wordmark = showWordmark && (
    <div className="flex min-w-0 flex-col leading-tight">
      <span className={wordmarkClassName ? `${wordmarkClassName} font-bold tracking-tight ${invert ? 'text-white' : 'text-calendly-ink'}` : defaultWordmark}>
        Schedly
      </span>
      {showTagline && (
        <span className={taglineClassName || defaultTagline}>Smart Scheduling</span>
      )}
    </div>
  )

  const inner = (
    <>
      {mark}
      {wordmark}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={`inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-calendly focus-visible:ring-offset-2 rounded-lg ${className}`}
      >
        {inner}
      </Link>
    )
  }

  return <div className={`inline-flex items-center gap-2.5 ${className}`}>{inner}</div>
}
