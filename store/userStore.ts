import { create } from 'zustand';
import { UserProfile } from '../hooks/useProfile';

type UserState = {
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;
};

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile })
}));