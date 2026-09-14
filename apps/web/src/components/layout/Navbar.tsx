import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '@/components/navigation/LanguageSelector'

export function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()

  const navLinks = [
    { href: '/', label: t('nav.home') },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary-600">SMART</span>
              <span className="text-xl font-medium text-neutral-600">SEARCH JOB</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    location.pathname === link.href
                      ? 'text-primary-600'
                      : 'text-neutral-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  )
}
