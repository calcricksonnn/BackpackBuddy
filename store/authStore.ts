import { create } from 'zustand';

type User = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt?: any;
};

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