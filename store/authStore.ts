// store/authStore.ts
import { User } from 'firebase/auth';
import { create } from 'zustand';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  signOut: () => set({ user: null, isAuthenticated: false }),
}));