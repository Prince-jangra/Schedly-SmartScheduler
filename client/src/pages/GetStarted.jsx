import { Navigate } from 'react-router-dom'

/** Legacy route: marketing content lives on home */
export default function GetStarted() {
  return <Navigate to="/" replace />
}
