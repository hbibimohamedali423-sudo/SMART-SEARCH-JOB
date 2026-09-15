import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { PasswordField } from './PasswordField'
import { useAuth } from '../hooks/useAuth'
import { signupSchema, type SignupFormValues } from '../validation/authSchemas'

interface SignupFormProps {
  onSuccess?: (needsEmailVerification: boolean, email: string) => void
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const { t } = useTranslation()
  const { signUp } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
    mode: 'onTouched',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  async function onSubmit(values: SignupFormValues) {
    setFormError(null)
    const result = await signUp({ email: values.email, password: values.password })
    if (result.error) {
      setFormError(result.error)
      return
    }
    onSuccess?.(Boolean(result.needsEmailVerification), values.email)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <Label htmlFor="signup-email">{t('auth.signup.email')}</Label>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            error={Boolean(errors.email)}
            className="mt-1.5"
            placeholder={t('auth.signup.emailPlaceholder')}
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
          label={t('auth.signup.password')}
          autoComplete="new-password"
        />

        <PasswordField
          name="confirmPassword"
          label={t('auth.signup.confirmPassword')}
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
          {t('auth.signup.submit')}
        </Button>
      </form>
    </FormProvider>
  )
}