import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

/**
 * If the user is not authenticated, redirect to /login and preserve
 * the current location so we can return after sign-in.
 */
export function useRequireAuth() {
  const { status } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (status === 'unauthenticated') {
      const current = location.pathname + location.search
      const to = current === '/login' ? '/login' : `/login?redirect=${encodeURIComponent(current)}`
      navigate(to, { replace: true })
    }
  }, [status, navigate, location.pathname, location.search])

  return status === 'authenticated'
}