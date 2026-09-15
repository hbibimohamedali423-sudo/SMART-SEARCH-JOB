import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
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

function ProtectedContent() {
  return <div data-testid="protected-content">Secret</div>
}

function VerifyPage() {
  const [params] = useSearchParams()
  return (
    <div data-testid="verify-page">
      <span data-testid="verify-email">{params.get('email') ?? '(no email)'}</span>
    </div>
  )
}

function renderWithProvider(initialPath: string) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div data-testid="login-page">Login</div>} />
          <Route path="/verify-email" element={<VerifyPage />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}

function makeSession(user: Record<string, unknown>) {
  return { data: { session: { user } }, error: null }
}

describe('ProtectedRoute', () => {
  it('renders content when the user is authenticated', async () => {
    mockSupabase.auth.getSession.mockResolvedValue(
      makeSession({ id: 'u1', email: 'a@b.co', email_confirmed_at: '2026-01-01' })
    )
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    })

    renderWithProvider('/protected')

    const content = await screen.findByTestId('protected-content')
    expect(content).toBeInTheDocument()
  })

  it('redirects to /login when the user is not authenticated', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    })

    renderWithProvider('/protected')

    const loginPage = await screen.findByTestId('login-page')
    expect(loginPage).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('blocks an authenticated user whose email is not verified and sends them to /verify-email', async () => {
    mockSupabase.auth.getSession.mockResolvedValue(
      makeSession({ id: 'u2', email: 'unverified@example.com', email_confirmed_at: null })
    )
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    })

    renderWithProvider('/protected')

    const verifyPage = await screen.findByTestId('verify-page')
    expect(verifyPage).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
    expect(screen.getByTestId('verify-email').textContent).toBe('unverified@example.com')
  })
})