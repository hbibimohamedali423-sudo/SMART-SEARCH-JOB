import { describe, expect, it } from 'vitest'
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from '@/features/auth/validation/authSchemas'

describe('auth schemas', () => {
  describe('signupSchema', () => {
    it('accepts a valid signup payload', () => {
      const result = signupSchema.safeParse({
        email: 'user@example.com',
        password: 'StrongPass123',
        confirmPassword: 'StrongPass123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects an invalid email', () => {
      const result = signupSchema.safeParse({
        email: 'not-an-email',
        password: 'StrongPass123',
        confirmPassword: 'StrongPass123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('emailInvalid')
      }
    })

    it('rejects a short password', () => {
      const result = signupSchema.safeParse({
        email: 'user@example.com',
        password: 'Sh1',
        confirmPassword: 'Sh1',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('passwordMin')
      }
    })

    it('rejects a password without uppercase letter', () => {
      const result = signupSchema.safeParse({
        email: 'user@example.com',
        password: 'strongpass123',
        confirmPassword: 'strongpass123',
      })
      expect(result.success).toBe(false)
    })

    it('rejects a password without a number', () => {
      const result = signupSchema.safeParse({
        email: 'user@example.com',
        password: 'StrongPass',
        confirmPassword: 'StrongPass',
      })
      expect(result.success).toBe(false)
    })

    it('rejects a mismatched confirmation password', () => {
      const result = signupSchema.safeParse({
        email: 'user@example.com',
        password: 'StrongPass123',
        confirmPassword: 'StrongPass124',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const issue = result.error.issues.find((i) => i.path[0] === 'confirmPassword')
        expect(issue?.message).toBe('passwordMismatch')
      }
    })
  })

  describe('loginSchema', () => {
    it('accepts a valid login payload', () => {
      const result = loginSchema.safeParse({
        email: 'user@example.com',
        password: 'whatever123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects a missing password', () => {
      const result = loginSchema.safeParse({ email: 'user@example.com', password: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('passwordRequired')
      }
    })

    it('rejects an invalid email', () => {
      const result = loginSchema.safeParse({ email: 'bad', password: 'x' })
      expect(result.success).toBe(false)
    })
  })

  describe('forgotPasswordSchema', () => {
    it('accepts a valid email', () => {
      const result = forgotPasswordSchema.safeParse({ email: 'user@example.com' })
      expect(result.success).toBe(true)
    })

    it('rejects empty email', () => {
      const result = forgotPasswordSchema.safeParse({ email: '' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('emailRequired')
      }
    })
  })

  describe('resetPasswordSchema', () => {
    it('accepts a valid new password', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'NewPass123',
        confirmPassword: 'NewPass123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects mismatched confirmation', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'NewPass123',
        confirmPassword: 'NewPass124',
      })
      expect(result.success).toBe(false)
    })

    it('rejects a weak password', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'weak',
        confirmPassword: 'weak',
      })
      expect(result.success).toBe(false)
    })
  })
})