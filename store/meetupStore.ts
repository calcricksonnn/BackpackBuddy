import { create } from 'zustand';
import { Meetup } from '../hooks/useMeetups';

type MeetupState = {
  meetups: Meetup[];
  setMeetups: (m: Meetup[]) => void;
  addMeetup: (m: Meetup) => void;
};

export const useMeetupStore = create<MeetupState>((set) => ({
  meetups: [],
  setMeetups: (m) => set({ meetups: m }),
  addMeetup: (m) => set((state) => ({ meetups: [m, ...state.meetups] }))
}));