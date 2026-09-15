import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'
import { useAuth } from '@/features/auth/hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * Guards a route for authenticated users. While the initial session
 * is loading we show the app loading screen to avoid a redirect flash.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status, isEmailVerified, user } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (status === 'unauthenticated') {
    const redirect =
      location.pathname + location.search === '/login'
        ? '/login'
        : `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`
    return <Navigate to={redirect} replace />
  }

  // Authenticated but email not confirmed: block access to protected areas
  // and point to the verification page, carrying the email when available.
  if (!isEmailVerified) {
    const email = user?.email
    const to = email
      ? `/verify-email?email=${encodeURIComponent(email)}`
      : '/verify-email'
    return <Navigate to={to} replace />
  }

  return <>{children}</>
}