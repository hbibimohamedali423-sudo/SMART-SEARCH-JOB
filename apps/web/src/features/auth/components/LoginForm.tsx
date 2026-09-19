import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { PasswordField } from './PasswordField'
import { useAuth } from '../hooks/useAuth'
import { getAuthErrorMessageKey } from '../services/authService'
import { loginSchema, type LoginFormValues } from '../validation/authSchemas'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { t } = useTranslation()
  const { signIn } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  async function onSubmit(values: LoginFormValues) {
    setFormError(null)
    const result = await signIn({ email: values.email, password: values.password })
    if (result.error) {
      setFormError(t(getAuthErrorMessageKey(result.error)))
      return
    }
    onSuccess?.()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <Label htmlFor="login-email">{t('auth.login.email')}</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            error={Boolean(errors.email)}
            className="mt-1.5"
            placeholder={t('auth.login.emailPlaceholder')}
            {...register('email')}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-error-400" data-testid="field-error-email">
              {t(`auth.errors.${errors.email.message ?? 'general'}`)}
            </p>
          ) : null}
        </div>

        <PasswordField
          name="password"
          label={t('auth.login.password')}
          autoComplete="current-password"
        />

        {formError ? (
          <p className="rounded-lg border border-error-500/25 bg-error-500/[0.06] px-3 py-2 text-xs text-error-400" data-testid="form-error">
            {formError}
          </p>
        ) : null}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          {t('auth.login.submit')}
        </Button>
      </form>
    </FormProvider>
  )
}