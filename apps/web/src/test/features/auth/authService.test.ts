import { describe, expect, it, vi } from 'vitest'

const { mockSupabase } = vi.hoisted(() => ({
  mockSupabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
      getSession: vi.fn(),
      getUser: vi.fn(),
      onAuthStateChange: vi.fn(),
      resend: vi.fn(),
    },
  },
}))

vi.mock('@/lib/supabase', () => ({
  supabase: mockSupabase,
}))

import {
  getCurrentSession,
  getCurrentUser,
  onAuthStateChange,
  resendVerificationEmail,
  sendPasswordResetEmail,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
  updateUserPassword,
} from '@/features/auth/services/authService'

describe('authService', () => {
  it('signInWithEmail delegates to supabase', async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({ data: {}, error: null })
    const res = await signInWithEmail({ email: 'a@b.co', password: 'pass' })
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'a@b.co',
      password: 'pass',
    })
    expect(res.error).toBeNull()
  })

  it('signUpWithEmail delegates to supabase', async () => {
    mockSupabase.auth.signUp.mockResolvedValue({ data: {}, error: null })
    const res = await signUpWithEmail({ email: 'a@b.co', password: 'pass' })
    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'a@b.co',
      password: 'pass',
    })
    expect(res.error).toBeNull()
  })

  it('signOutUser delegates to supabase', async () => {
    mockSupabase.auth.signOut.mockResolvedValue({ error: null })
    const res = await signOutUser()
    expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(1)
    expect(res.error).toBeNull()
  })

  it('sendPasswordResetEmail delegates', async () => {
    mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({ data: {}, error: null })
    const res = await sendPasswordResetEmail('a@b.co')
    expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith('a@b.co')
    expect(res.error).toBeNull()
  })

  it('updateUserPassword delegates', async () => {
    mockSupabase.auth.updateUser.mockResolvedValue({ data: {}, error: null })
    const res = await updateUserPassword({ password: 'NewPass123' })
    expect(mockSupabase.auth.updateUser).toHaveBeenCalledWith({ password: 'NewPass123' })
    expect(res.error).toBeNull()
  })

  it('getCurrentSession and getCurrentUser delegate', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } })
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } })
    await getCurrentSession()
    await getCurrentUser()
    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1)
    expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1)
  })

  it('onAuthStateChange delegates', () => {
    const cb = () => undefined
    onAuthStateChange(cb)
    expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalled()
  })

  it('resendVerificationEmail delegates', async () => {
    mockSupabase.auth.resend.mockResolvedValue({ data: {}, error: null })
    const res = await resendVerificationEmail('a@b.co')
    expect(mockSupabase.auth.resend).toHaveBeenCalledWith({
      type: 'signup',
      email: 'a@b.co',
    })
    expect(res.error).toBeNull()
  })
})