import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'
import { useAuth } from '../hooks/useAuth'
import { ResetPasswordForm } from '../components/ResetPasswordForm'

export function ResetPasswordPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { status, isRecoverySession } = useAuth()
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    // A regular (non-recovery) authenticated session must not be able to use
    // /reset-password as a normal password-change page.
    if (status === 'authenticated' && !isRecoverySession) {
      navigate('/', { replace: true })
    }
  }, [status, isRecoverySession, navigate])

  function handleSuccess() {
    setCompleted(true)
  }

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (completed) {
    return (
      <div className="container-page py-16">
        <div className="mx-auto w-full max-w-md">
          <Card className="border-white/[0.08] bg-night-900/60 shadow-soft backdrop-blur-xl">
            <CardHeader>
              <CardTitle>{t('auth.reset.successTitle')}</CardTitle>
              <CardDescription>{t('auth.reset.successDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                to="/login"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-turquoise-500 px-4 text-sm font-semibold text-night-950 transition-all hover:shadow-glow-cyan"
              >
                {t('auth.reset.backToLogin')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Not authenticated: the recovery link is invalid or expired.
  if (status === 'unauthenticated') {
    return (
      <div className="container-page py-16">
        <div className="mx-auto w-full max-w-md">
          <Card className="border-white/[0.08] bg-night-900/60 shadow-soft backdrop-blur-xl">
            <CardHeader>
              <CardTitle>{t('auth.reset.invalidTitle')}</CardTitle>
              <CardDescription>{t('auth.reset.invalidDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/forgot-password"
                className="block text-center text-sm text-primary-300 transition-colors hover:text-primary-200"
              >
                {t('auth.reset.requestNewLink')}
              </Link>
              <Link
                to="/login"
                className="block text-center text-sm text-neutral-400 transition-colors hover:text-primary-300"
              >
                {t('auth.reset.backToLogin')}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-16">
      <div className="mx-auto w-full max-w-md">
        <Card className="border-white/[0.08] bg-night-900/60 shadow-soft backdrop-blur-xl">
          <CardHeader>
            <CardTitle>{t('auth.reset.title')}</CardTitle>
            <CardDescription>{t('auth.reset.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm onSuccess={handleSuccess} />
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="mt-6 text-sm text-neutral-400 transition-colors hover:text-primary-300"
            >
              {t('auth.reset.cancel')}
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}