import type { Session, User } from '@supabase/supabase-js'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthState {
  user: User | null
  session: Session | null
  status: AuthStatus
  isEmailVerified: boolean
  isRecoverySession: boolean
}

export interface SignUpParams {
  email: string
  password: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface ResetPasswordParams {
  password: string
}

export type { Session, User }