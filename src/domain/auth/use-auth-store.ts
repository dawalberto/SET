import { supabase } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

type AuthState = {
  user: User | null
  setUser: (user: User | null) => void
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw new Error(error.message)
    set({ user: data?.user ?? null })
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
    set({ user: null })
  },
}))

// Initialize user on load
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    useAuthStore.getState().setUser(session.user)
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.getState().setUser(null)
  }
})
