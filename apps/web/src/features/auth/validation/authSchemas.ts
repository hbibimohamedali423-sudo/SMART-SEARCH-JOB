import { z } from 'zod'

export const signupSchema = z
  .object({
    email: z.string().trim().min(1, 'emailRequired').email('emailInvalid'),
    password: z
      .string()
      .min(8, 'passwordMin')
      .max(128, 'passwordMax')
      .regex(/[a-z]/, 'passwordLower')
      .regex(/[A-Z]/, 'passwordUpper')
      .regex(/\d/, 'passwordNumber'),
    confirmPassword: z.string().min(1, 'confirmPasswordRequired'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'emailRequired').email('emailInvalid'),
  password: z.string().min(1, 'passwordRequired'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, 'emailRequired').email('emailInvalid'),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'passwordMin')
      .max(128, 'passwordMax')
      .regex(/[a-z]/, 'passwordLower')
      .regex(/[A-Z]/, 'passwordUpper')
      .regex(/\d/, 'passwordNumber'),
    confirmPassword: z.string().min(1, 'confirmPasswordRequired'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword'],
  })

export type SignupFormValues = z.infer<typeof signupSchema>
export type LoginFormValues = z.infer<typeof loginSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>