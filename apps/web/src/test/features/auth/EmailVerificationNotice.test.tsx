import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmailVerificationNotice } from '@/features/auth/components/EmailVerificationNotice'
import { AuthProvider } from '@/features/auth/context/AuthProvider'

const { mockSupabase } = vi.hoisted(() => ({
  mockSupabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      resend: vi.fn(),
    },
  },
}))

vi.mock('@/lib/supabase', () => ({
  supabase: mockSupabase,
}))

function makeSubscription() {
  return { data: { subscription: { unsubscribe: vi.fn() } } }
}

describe('EmailVerificationNotice resend (B3)', () => {
  it('can resend using a passed email even when there is no active session', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    mockSupabase.auth.onAuthStateChange.mockReturnValue(makeSubscription())
    mockSupabase.auth.resend.mockResolvedValue({ data: {}, error: null })

    render(
      <AuthProvider>
        <EmailVerificationNotice email="just-signed-up@example.com" />
      </AuthProvider>
    )

    const resendButton = await screen.findByRole('button', { name: 'Resend verification email' })
    await userEvent.click(resendButton)

    await waitFor(() => {
      expect(mockSupabase.auth.resend).toHaveBeenCalledWith({
        type: 'signup',
        email: 'just-signed-up@example.com',
        options: {
          emailRedirectTo: window.location.origin,
        },
      })
    })
  })
})