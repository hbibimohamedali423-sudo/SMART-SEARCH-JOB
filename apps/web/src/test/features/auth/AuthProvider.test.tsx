import { act } from 'react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthContext, AuthProvider } from '@/features/auth/context/AuthProvider'

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

import { useAuth } from '@/features/auth/hooks/useAuth'

function Probe() {
  const { status, user, isRecoverySession } = useAuth()
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="email">{user?.email ?? 'none'}</span>
      <span data-testid="recovery">{isRecoverySession ? 'recovery' : 'normal'}</span>
    </div>
  )
}

function makeSubscription() {
  return { data: { subscription: { unsubscribe: vi.fn() } } }
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSupabase.auth.onAuthStateChange.mockReturnValue(makeSubscription())
  })

  it('starts in loading state then becomes unauthenticated when no session exists', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    )

    expect(screen.getByTestId('status').textContent).toBe('loading')

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('unauthenticated')
    })
    expect(screen.getByTestId('email').textContent).toBe('none')
  })

  it('becomes authenticated when a session exists', async () => {
    const fakeUser = {
      id: 'u1',
      email: 'user@example.com',
      email_confirmed_at: '2026-01-01T00:00:00Z',
    }
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: { user: fakeUser } },
      error: null,
    })

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('authenticated')
    })
    expect(screen.getByTestId('email').textContent).toBe('user@example.com')
    expect(screen.getByTestId('recovery').textContent).toBe('normal')
  })

  it('updates auth state when onAuthStateChange fires', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    let listener: ((event: string, session: unknown) => void) | undefined
    mockSupabase.auth.onAuthStateChange.mockImplementation((cb: typeof listener) => {
      listener = cb
      return makeSubscription()
    })

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('unauthenticated')
    })

    const fakeUser = { id: 'u2', email: 'later@example.com', email_confirmed_at: null }
    act(() => {
      listener?.('SIGNED_IN', { user: fakeUser })
    })

    await waitFor(() => {
      expect(screen.getByTestId('email').textContent).toBe('later@example.com')
    })
    expect(screen.getByTestId('recovery').textContent).toBe('normal')
  })

  it('tracks a PASSWORD_RECOVERY event as a recovery session', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    let listener: ((event: string, session: unknown) => void) | undefined
    mockSupabase.auth.onAuthStateChange.mockImplementation((cb: typeof listener) => {
      listener = cb
      return makeSubscription()
    })

    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('unauthenticated')
    })

    const fakeUser = { id: 'u3', email: 'recover@example.com', email_confirmed_at: null }
    act(() => {
      listener?.('PASSWORD_RECOVERY', { user: fakeUser })
    })

    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe('authenticated')
    })
    expect(screen.getByTestId('recovery').textContent).toBe('recovery')
  })

  it('exposes a defined AuthContext', () => {
    expect(AuthContext).toBeDefined()
  })
})