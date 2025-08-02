import { create } from 'zustand';
import { ChatThread } from '../hooks/useChatThreads';

type ChatState = {
  threads: ChatThread[];
  setThreads: (t: ChatThread[]) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  threads: [],
  setThreads: (t) => set({ threads: t })
}));