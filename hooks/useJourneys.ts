import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export type Journey = {
  id: string;
  title: string;
  date: string;
  location: { lat: number; lng: number };
};

export const useJourneys = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        setJourneys([
          {
            id: 'j1',
            title: 'Alps Hike 🏔️',
            date: '2025-06-15',
            location: { lat: 46.8182, lng: 8.2275 }
          },
          {
            id: 'j2',
            title: 'Patagonia Trail 🇦🇷',
            date: '2025-07-01',
            location: { lat: -50.9423, lng: -73.4068 }
          }
        ]);
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  const addJourney = async ({ title }: { title: string }) => {
    const loc = await Location.getCurrentPositionAsync({});
    const newJourney: Journey = {
      id: Date.now().toString(),
      title,
      date: new Date().toISOString().split('T')[0],
      location: {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      }
    };
    setJourneys((prev) => [newJourney, ...prev]);
  };

  return { journeys, addJourney, isLoading, error };
};