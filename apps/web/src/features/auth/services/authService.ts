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

// After email confirmation Supabase redirects to the current app origin, so the
// flow works on localhost (http://localhost:3000) and in any other environment.
const confirmationRedirectTo = window.location.origin

export async function signUpWithEmail({ email, password }: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: confirmationRedirectTo,
    },
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
    options: {
      emailRedirectTo: confirmationRedirectTo,
    },
  })
  return { data, error }
}

/**
 * Maps raw Supabase error messages (English) to i18n keys to keep
 * localized forms free of mixed-language errors. Unknown messages fall
 * back to a generic key. Keys are lowercased because GoTrue messages use
 * inconsistent casing (e.g. "email rate limit exceeded").
 */
const AUTH_ERROR_KEYS: Record<string, string> = {
  'invalid login credentials': 'auth.errors.invalidCredentials',
  'user already registered': 'auth.errors.userExists',
  'email rate limit exceeded': 'auth.errors.rateLimit',
  'token has expired or is invalid': 'auth.errors.invalidResetToken',
  'new password should be different from the old password.': 'auth.errors.samePassword',
}

export function getAuthErrorMessageKey(message: string | null | undefined): string {
  if (!message) return 'auth.errors.general'
  return AUTH_ERROR_KEYS[message.trim().toLowerCase()] ?? 'auth.errors.general'
}