import { useTranslation } from 'react-i18next'

export function LoadingScreen() {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/95">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-6 animate-pulse-glow rounded-full bg-primary-400/20 blur-2xl" />
          <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-primary-400/25 border-t-primary-400" />
        </div>
        <p className="text-neutral-300">{t('loading.description')}</p>
      </div>
    </div>
  )
}
