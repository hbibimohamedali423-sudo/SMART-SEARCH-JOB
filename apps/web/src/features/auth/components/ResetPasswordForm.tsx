import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { PasswordField } from './PasswordField'
import { useAuth } from '../hooks/useAuth'
import { updateUserPassword } from '../services/authService'
import { resetPasswordSchema, type ResetPasswordFormValues } from '../validation/authSchemas'

interface ResetPasswordFormProps {
  onSuccess?: () => void
}

export function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onTouched',
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: ResetPasswordFormValues) {
    if (!user) return
    setFormError(null)

    const { error } = await updateUserPassword({ password: values.password })
    if (error) {
      setFormError(error.message)
      return
    }
    onSuccess?.()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <PasswordField
          name="password"
          label={t('auth.reset.newPassword')}
          autoComplete="new-password"
        />
        <PasswordField
          name="confirmPassword"
          label={t('auth.reset.confirmPassword')}
          autoComplete="new-password"
        />

        <ul className="space-y-1 text-xs text-neutral-500">
          <li>{t('auth.errors.passwordMin')}</li>
          <li>{t('auth.errors.passwordUpper')}</li>
          <li>{t('auth.errors.passwordNumber')}</li>
        </ul>

        {formError ? (
          <p className="rounded-lg border border-error-500/25 bg-error-500/[0.06] px-3 py-2 text-xs text-error-400" data-testid="form-error">
            {formError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          {t('auth.reset.submit')}
        </Button>
      </form>
    </FormProvider>
  )
}