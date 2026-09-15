import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { RequestResetForm } from '../components/RequestResetForm'

export function ForgotPasswordPage() {
  const { t } = useTranslation()

  return (
    <div className="container-page py-16">
      <div className="mx-auto w-full max-w-md">
        <Card className="border-white/[0.08] bg-night-900/60 shadow-soft backdrop-blur-xl">
          <CardHeader>
            <CardTitle>{t('auth.forgot.title')}</CardTitle>
            <CardDescription>{t('auth.forgot.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <RequestResetForm />
            <p className="mt-6 border-t border-white/[0.06] pt-5 text-sm text-neutral-400">
              {t('auth.forgot.backToLogin')}{' '}
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