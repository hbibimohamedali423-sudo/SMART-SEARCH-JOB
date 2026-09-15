import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { sendPasswordResetEmail } from '../services/authService'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../validation/authSchemas'

interface RequestResetFormProps {
  onSent?: () => void
}

export function RequestResetForm({ onSent }: RequestResetFormProps) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  })

  async function onSubmit(values: ForgotPasswordFormValues) {
    setStatus('idle')
    setFormError(null)
    // Deliberately never disclose whether the account exists.
    const { error } = await sendPasswordResetEmail(values.email)
    if (error) {
      setFormError(error.message)
      setStatus('error')
      return
    }
    setStatus('sent')
    onSent?.()
  }

  if (status === 'sent') {
    return (
      <div
        className="rounded-xl border border-success-500/25 bg-success-500/[0.06] p-4 text-sm"
        role="status"
        data-testid="reset-sent"
      >
        <p className="font-medium text-success-400">{t('auth.forgot.resetEmailSent')}</p>
        <p className="mt-1 text-neutral-400">{t('auth.forgot.checkInbox')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="reset-email">{t('auth.forgot.email')}</Label>
        <Input
          id="reset-email"
          type="email"
          autoComplete="email"
          error={Boolean(errors.email)}
          className="mt-1.5"
          placeholder={t('auth.forgot.emailPlaceholder')}
          {...register('email')}
        />
        {errors.email ? (
          <p className="mt-1.5 text-xs text-error-400" data-testid="field-error-email">
            {t(`auth.errors.${errors.email.message ?? 'general'}`)}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p className="rounded-lg border border-error-500/25 bg-error-500/[0.06] px-3 py-2 text-xs text-error-400" data-testid="form-error">
          {formError}
        </p>
      ) : null}

      <Button type="submit" className="w-full" loading={isSubmitting}>
        {t('auth.forgot.submit')}
      </Button>
    </form>
  )
}