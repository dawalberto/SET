import { supabase } from "@/db/supabase-client";
import { create } from "zustand";

type AuthState = {
  user: any | null;
  setUser: (user: any) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw new Error(error.message);
    set({ user });
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    set({ user: null });
  },
}));

// Initialize user on load
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    useAuthStore.getState().setUser(session?.user ?? null);
  } else if (event === "SIGNED_OUT") {
    useAuthStore.getState().setUser(null);
  }
});
