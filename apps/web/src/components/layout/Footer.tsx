import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container-page py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-600">SMART</span>
            <span className="text-lg font-medium text-neutral-600">SEARCH JOB</span>
          </div>
          <p className="text-sm text-neutral-600">
            {t('common.appName')} - AI-powered international job search and application platform.
          </p>
          <Link
            to="/"
            className="text-sm text-neutral-600 hover:text-primary-600"
          >
            {t('nav.home')}
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 text-center">
            © {currentYear} {t('common.appName')}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
