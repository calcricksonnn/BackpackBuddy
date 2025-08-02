import { useState, useEffect } from 'react';

export type Journey = {
  id: string;
  title: string;
  date: string;
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
            date: '2025-06-15'
          },
          {
            id: 'j2',
            title: 'Patagonia Trail 🇦🇷',
            date: '2025-07-01'
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

  const addJourney = (data: { title: string }) => {
    const newJourney: Journey = {
      id: Date.now().toString(),
      title: data.title,
      date: new Date().toISOString().split('T')[0]
    };
    setJourneys((prev) => [newJourney, ...prev]);
  };

  return { journeys, addJourney, isLoading, error };
};