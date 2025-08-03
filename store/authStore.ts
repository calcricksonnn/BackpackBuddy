import { create } from 'zustand';

type AuthState = {
  userId: string | null;
  isAuthenticated: boolean;
  setUser: (uid: string) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isAuthenticated: false,
  setUser: (uid) => set({ userId: uid, isAuthenticated: true }),
  signOut: () => set({ userId: null, isAuthenticated: false }),
}));