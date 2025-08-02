import { create } from 'zustand';

type SafetyState = {
  onlyVerifiedCanMessage: boolean;
  toggleMessagingFilter: () => void;
  blockedUsers: string[];
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
};

export const useSafetyStore = create<SafetyState>((set) => ({
  onlyVerifiedCanMessage: true,
  toggleMessagingFilter: () =>
    set((s) => ({ onlyVerifiedCanMessage: !s.onlyVerifiedCanMessage })),
  blockedUsers: ['catfish89', 'toxicTom'],
  blockUser: (id) =>
    set((s) => ({
      blockedUsers: [...new Set([...s.blockedUsers, id])]
    })),
  unblockUser: (id) =>
    set((s) => ({
      blockedUsers: s.blockedUsers.filter((u) => u !== id)
    }))
}));