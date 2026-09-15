import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'
import { AuthProvider } from '@/features/auth/context/AuthProvider'

const { mockSupabase } = vi.hoisted(() => ({
  mockSupabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
  },
}))

vi.mock('@/lib/supabase', () => ({
  supabase: mockSupabase,
}))

function renderPage() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/reset-password']}>
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/" element={<div data-testid="home-page">Home</div>} />
          <Route path="/forgot-password" element={<div data-testid="forgot-page">Forgot</div>} />
          <Route path="/login" element={<div data-testid="login-page">Login</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

function makeSubscription() {
  return { data: { subscription: { unsubscribe: vi.fn() } } }
}

function makeSession(user: Record<string, unknown>) {
  return { data: { session: { user } }, error: null }
}

describe('ResetPasswordPage recovery gate', () => {
  it('redirects a regular authenticated user away (no recovery session)', async () => {
    mockSupabase.auth.getSession.mockResolvedValue(
      makeSession({ id: 'u1', email: 'user@example.com', email_confirmed_at: '2026-01-01' })
    )
    mockSupabase.auth.onAuthStateChange.mockReturnValue(makeSubscription())

    renderPage()

    const home = await screen.findByTestId('home-page')
    expect(home).toBeInTheDocument()
  })

  it('shows the reset form only for a recovery session', async () => {
    // Initial load yields no session; then the SDK fires PASSWORD_RECOVERY.
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })

    let listener: ((event: string, session: unknown) => void) | undefined
    mockSupabase.auth.onAuthStateChange.mockImplementation((cb: typeof listener) => {
      listener = cb
      return makeSubscription()
    })

    renderPage()

    // Simulate Supabase firing PASSWORD_RECOVERY with a session.
    act(() => {
      listener?.('PASSWORD_RECOVERY', {
        user: { id: 'u2', email: 'recover@example.com', email_confirmed_at: null },
      })
    })

    const heading = await screen.findByText('Set a new password')
    expect(heading).toBeInTheDocument()
  })

  it('shows the invalid/expired link state for an unauthenticated user', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    mockSupabase.auth.onAuthStateChange.mockReturnValue(makeSubscription())

    renderPage()

    const invalidTitle = await screen.findByText('Reset link invalid or expired')
    expect(invalidTitle).toBeInTheDocument()
  })
})