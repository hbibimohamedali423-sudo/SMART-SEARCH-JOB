import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getCurrentSession,
  onAuthStateChange,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
} from '../services/authService'
import type { AuthState, SignInParams, SignUpParams } from '../types/auth'

export interface AuthResult {
  needsEmailVerification?: boolean
  error: string | null
}

interface AuthContextValue extends AuthState {
  signIn: (params: SignInParams) => Promise<AuthResult>
  signUp: (params: SignUpParams) => Promise<AuthResult>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    status: 'loading',
    isEmailVerified: false,
    isRecoverySession: false,
  })

  useEffect(() => {
    let mounted = true

    async function loadInitialSession() {
      try {
        const { data } = await getCurrentSession()
        if (!mounted) return
        const session = data.session
        setState({
          user: session?.user ?? null,
          session: session ?? null,
          status: session ? 'authenticated' : 'unauthenticated',
          isEmailVerified: Boolean(session?.user?.email_confirmed_at),
          isRecoverySession: false,
        })
      } catch {
        if (!mounted) return
        setState({
          user: null,
          session: null,
          status: 'unauthenticated',
          isEmailVerified: false,
          isRecoverySession: false,
        })
      }
    }

    void loadInitialSession()

    const { data: subscription } = onAuthStateChange((event, session) => {
      if (!mounted) return
      setState({
        user: session?.user ?? null,
        session: session ?? null,
        status: session ? 'authenticated' : 'unauthenticated',
        isEmailVerified: Boolean(session?.user?.email_confirmed_at),
        isRecoverySession: event === 'PASSWORD_RECOVERY' && Boolean(session),
      })
    })

    return () => {
      mounted = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInParams): Promise<AuthResult> => {
    const { error } = await signInWithEmail({ email, password })
    if (error) {
      return { error: error.message }
    }
    return { error: null }
  }, [])

  const signUp = useCallback(async ({ email, password }: SignUpParams): Promise<AuthResult> => {
    const { data, error } = await signUpWithEmail({ email, password })

    if (error) {
      return { error: error.message }
    }

    // If email confirmation is enabled, Supabase returns a user without a session.
    const newUser = data.user
    const needsEmailVerification =
      Boolean(newUser) && !data.session && !newUser?.email_confirmed_at

    return {
      needsEmailVerification,
      error: null,
    }
  }, [])

  const signOut = useCallback(async (): Promise<void> => {
    await signOutUser()
    // State is updated by the onAuthStateChange listener.
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signIn,
      signUp,
      signOut,
    }),
    [state, signIn, signUp, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }