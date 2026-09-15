import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { ResetPasswordParams, SignInParams, SignUpParams } from '../types/auth'

/**
 * Thin, typed wrappers around Supabase Auth.
 * The Supabase client remains the single source of truth for session state.
 */

export async function signInWithEmail({ email, password }: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signUpWithEmail({ email, password }: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function sendPasswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  return { data, error }
}

export async function updateUserPassword({ password }: ResetPasswordParams) {
  const { data, error } = await supabase.auth.updateUser({ password })
  return { data, error }
}

export function getCurrentSession() {
  return supabase.auth.getSession()
}

export function getCurrentUser() {
  return supabase.auth.getUser()
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void
) {
  // Supabase offers two overloads (void vs Promise returning). We explicitly
  // cast to the void-callback overload to keep our thin wrapper stable.
  return (supabase.auth.onAuthStateChange as unknown as (
    cb: (event: AuthChangeEvent, session: Session | null) => void
  ) => { data: { subscription: { unsubscribe: () => void } } })(callback)
}

export async function resendVerificationEmail(email: string) {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
  })
  return { data, error }
}