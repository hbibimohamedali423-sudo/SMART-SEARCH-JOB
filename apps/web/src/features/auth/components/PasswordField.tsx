import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

interface PasswordFieldProps {
  name: 'password' | 'confirmPassword'
  label: string
  autoComplete?: string
}

export function PasswordField({ name, label, autoComplete }: PasswordFieldProps) {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const [show, setShow] = useState(false)

  const error = errors[name]

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative mt-1.5">
        <Input
          id={name}
          type={show ? 'text' : 'password'}
          autoComplete={autoComplete}
          error={Boolean(error)}
          className="pr-12"
          {...register(name)}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-0 top-0 flex h-full items-center px-3.5 text-xs font-medium text-neutral-400 transition-colors hover:text-primary-300"
          aria-label={show ? t('auth.hidePassword') : t('auth.showPassword')}
        >
          {show ? t('auth.hidePassword') : t('auth.showPassword')}
        </button>
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-error-400" data-testid={`field-error-${name}`}>
          {t(`auth.errors.${error.message ?? 'general'}`)}
        </p>
      ) : null}
    </div>
  )
}