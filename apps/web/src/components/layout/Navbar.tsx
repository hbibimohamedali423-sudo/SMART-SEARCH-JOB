import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '@/components/navigation/LanguageSelector'
import { BoltIcon } from '@/components/ui/icons'

export function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()

  const navLinks = [
    { href: '/', label: t('nav.home') },
  ]

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container-page">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-white/[0.08] bg-night-900/70 px-4 shadow-medium backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-turquoise-500 shadow-glow-cyan transition-transform duration-300 group-hover:scale-105">
                <BoltIcon className="h-5 w-5 text-night-950" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                SMART<span className="text-primary-300">SEARCH</span>
                <span className="ml-1 text-white/50">JOB</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.href
                      ? 'bg-white/[0.08] text-white'
                      : 'text-neutral-400 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  )
}
