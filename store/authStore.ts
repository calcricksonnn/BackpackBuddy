// store/authStore.ts
import { create } from 'zustand';

type UserProfile = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

type AuthState = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  signOut: () => set({ user: null, isAuthenticated: false }),
}));