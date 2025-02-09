import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean
  children: JSX.Element
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return children
}

export default ProtectedRoute
