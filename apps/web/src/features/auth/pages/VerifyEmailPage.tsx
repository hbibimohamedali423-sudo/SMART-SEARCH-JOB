import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { EmailVerificationNotice } from '../components/EmailVerificationNotice'

export function VerifyEmailPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  // Users without a session (e.g. just signed up, or redirected from a
  // protected route before confirming their email) can still resend the
  // verification email when the email is carried via ?email=...
  const email = searchParams.get('email') ?? undefined

  return (
    <div className="container-page py-16">
      <div className="mx-auto w-full max-w-md">
        <Card className="border-white/[0.08] bg-night-900/60 shadow-soft backdrop-blur-xl">
          <CardHeader>
            <CardTitle>{t('auth.verification.title')}</CardTitle>
            <CardDescription>{t('auth.verification.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <EmailVerificationNotice email={email} />
            <p className="text-sm text-neutral-400">
              {t('auth.verification.backToLogin')}{' '}
              <Link to="/login" className="text-primary-300 hover:text-primary-200">
                {t('auth.login.signInLink')}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}