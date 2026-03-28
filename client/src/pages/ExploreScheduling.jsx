import { Navigate, useLocation } from 'react-router-dom'

/** Legacy marketing URL — content lives on the home page. */
const HASH_MAP = {
  '#subscriptions': '/#plans',
  '#install': '/',
  '#faq': '/#faq',
  '#reviews': '/#reviews',
}

export default function ExploreScheduling() {
  const { hash } = useLocation()
  if (!hash) {
    return <Navigate to="/" replace />
  }
  const mapped = HASH_MAP[hash]
  if (mapped !== undefined) {
    return <Navigate to={mapped} replace />
  }
  const id = hash.replace(/^#/, '')
  const allowed = ['plans', 'how-it-works', 'faq', 'reviews']
  if (allowed.includes(id)) {
    return <Navigate to={`/#${id}`} replace />
  }
  return <Navigate to="/" replace />
}
