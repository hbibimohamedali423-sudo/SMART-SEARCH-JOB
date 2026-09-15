import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { resendVerificationEmail } from '../services/authService'

interface EmailVerificationNoticeProps {
  email?: string
}

export function EmailVerificationNotice({ email }: EmailVerificationNoticeProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  // Allow a passed-in email (e.g. the one used at signup) to resend even
  // when the user has no active session yet.
  const targetEmail = email ?? user?.email ?? ''

  async function handleResend() {
    if (!targetEmail || status === 'sending') return
    setStatus('sending')
    const { error } = await resendVerificationEmail(targetEmail)
    if (error) {
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  return (
    <div
      className="rounded-xl border border-warning-500/25 bg-warning-500/[0.06] p-4 text-sm"
      role="alert"
      data-testid="email-verification-notice"
    >
      <p className="font-medium text-warning-300">{t('auth.verification.title')}</p>
      <p className="mt-1 text-neutral-400">{t('auth.verification.description')}</p>

      {status === 'sent' ? (
        <p className="mt-2 text-success-400">{t('auth.verification.resent')}</p>
      ) : (
        <Button
          type="button"
          variant="link"
          size="sm"
          className="mt-2 h-auto px-0"
          loading={status === 'sending'}
          onClick={handleResend}
        >
          {t('auth.verification.resend')}
        </Button>
      )}

      {status === 'error' ? (
        <p className="mt-2 text-error-400">{t('auth.verification.resendError')}</p>
      ) : null}
    </div>
  )
}