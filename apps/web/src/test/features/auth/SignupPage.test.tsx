import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SignupPage } from '@/features/auth/pages/SignupPage'
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
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<div data-testid="home-page">Home</div>} />
          <Route path="/login" element={<div data-testid="login-page">Login</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

function makeSubscription() {
  return { data: { subscription: { unsubscribe: vi.fn() } } }
}

describe('SignupPage flow', () => {
  it('navigates to Home when signup succeeds without needing verification (confirmation disabled)', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    mockSupabase.auth.onAuthStateChange.mockReturnValue(makeSubscription())
    // Confirmation disabled: session is returned, so no verification is needed.
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: { id: 'u1', email_confirmed_at: null }, session: { user: { id: 'u1' } } },
      error: null,
    })

    renderPage()

    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Password'), 'StrongPass123')
    await user.type(screen.getByLabelText('Confirm password'), 'StrongPass123')
    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    const home = await screen.findByTestId('home-page')
    expect(home).toBeInTheDocument()
  })

  it('shows the verification card when signup needs email confirmation', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    mockSupabase.auth.onAuthStateChange.mockReturnValue(makeSubscription())
    // Confirmation enabled: no session returned -> needs verification.
    mockSupabase.auth.signUp.mockResolvedValue({
      data: { user: { id: 'u1', email_confirmed_at: null }, session: null },
      error: null,
    })

    renderPage()

    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Password'), 'StrongPass123')
    await user.type(screen.getByLabelText('Confirm password'), 'StrongPass123')
    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    await waitFor(() => {
      // The title appears both as the card heading and inside the notice.
      expect(screen.getAllByText('Verify your email').length).toBeGreaterThan(0)
    })
  })
})