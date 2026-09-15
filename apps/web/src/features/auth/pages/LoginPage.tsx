import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  function handleSuccess() {
    const redirect = searchParams.get('redirect')
    navigate(redirect && redirect.startsWith('/') ? redirect : '/', { replace: true })
  }

  return (
    <div className="container-page py-16">
      <div className="mx-auto w-full max-w-md">
        <Card className="border-white/[0.08] bg-night-900/60 shadow-soft backdrop-blur-xl">
          <CardHeader>
            <CardTitle>{t('auth.login.title')}</CardTitle>
            <CardDescription>{t('auth.login.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSuccess={handleSuccess} />
            <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-5 text-sm">
              <p className="text-neutral-400">
                {t('auth.login.noAccount')}{' '}
                <Link to="/signup" className="text-primary-300 hover:text-primary-200">
                  {t('auth.login.signUpLink')}
                </Link>
              </p>
              <p className="text-neutral-400">
                {t('auth.login.forgotPassword')}{' '}
                <Link to="/forgot-password" className="text-primary-300 hover:text-primary-200">
                  {t('auth.login.forgotLink')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}