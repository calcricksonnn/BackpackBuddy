import { create } from 'zustand';
import { Journey } from '../hooks/useJourneys';

type JourneyState = {
  journeys: Journey[];
  setJourneys: (j: Journey[]) => void;
  addJourney: (j: Journey) => void;
};

export const useJourneyStore = create<JourneyState>((set) => ({
  journeys: [],
  setJourneys: (j) => set({ journeys: j }),
  addJourney: (j) => set((state) => ({ journeys: [j, ...state.journeys] }))
}));