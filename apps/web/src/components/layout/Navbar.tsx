import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '@/components/navigation/LanguageSelector'
import { BoltIcon, UserIcon } from '@/components/ui/icons'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { status, user, signOut } = useAuth()

  const navLinks = [
    { href: '/', label: t('nav.home') },
  ]

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

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
            {status === 'loading' ? (
              <span className="h-10 w-24 rounded-lg bg-white/[0.05]" aria-hidden />
            ) : status === 'authenticated' && user ? (
              <>
                <div className="hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 sm:flex">
                  <UserIcon className="h-4 w-4 text-primary-300" />
                  <span className="max-w-[160px] truncate text-sm font-medium text-neutral-300">
                    {user.email ?? t('nav.user')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-white/[0.08] px-4 py-2 text-sm font-medium text-neutral-300 transition-all duration-200 hover:bg-white/[0.14] hover:text-white"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-300 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-gradient-to-br from-primary-400 to-turquoise-500 px-4 py-2 text-sm font-semibold text-night-950 transition-all duration-200 hover:shadow-glow-cyan hover:brightness-110"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  )
}
