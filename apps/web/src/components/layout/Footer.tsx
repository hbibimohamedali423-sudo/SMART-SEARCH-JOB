import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BoltIcon } from '@/components/ui/icons'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.06] bg-night-950/60 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />
      <div className="container-page py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-turquoise-500">
                <BoltIcon className="h-5 w-5 text-night-950" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                SMART<span className="text-primary-300">SEARCH</span>
                <span className="ml-1 text-white/50">JOB</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-neutral-300">
              {t('footer.platform')}
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-300"
                >
                  {t('footer.products.home')}
                </Link>
              </li>
              <li>
                <span className="text-sm text-neutral-600">{t('footer.products.profile')}</span>
              </li>
              <li>
                <span className="text-sm text-neutral-600">{t('footer.products.matching')}</span>
              </li>
              <li>
                <span className="text-sm text-neutral-600">{t('footer.products.applications')}</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-neutral-300">
              {t('footer.resources')}
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <span className="text-sm text-neutral-600">{t('footer.resourcesList.help')}</span>
              </li>
              <li>
                <span className="text-sm text-neutral-600">{t('footer.resourcesList.contact')}</span>
              </li>
              <li>
                <span className="text-sm text-neutral-600">{t('footer.resourcesList.privacy')}</span>
              </li>
              <li>
                <span className="text-sm text-neutral-600">{t('footer.resourcesList.terms')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © {currentYear} {t('common.appName')}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-400/20 bg-primary-400/[0.07] px-3 py-1 text-xs font-medium text-primary-300">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary-400" />
              {t('footer.statusLive')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
