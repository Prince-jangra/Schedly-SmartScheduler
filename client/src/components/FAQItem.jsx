import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-calendly-ink">{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-calendly-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-calendly-muted">{answer}</p>}
    </div>
  )
}

export default FAQItem
