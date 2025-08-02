import { useEffect, useState } from 'react';

export type Meetup = {
  id: string;
  title: string;
  location: string;
  date: string;
};

export const useMeetups = () => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        setMeetups([
          {
            id: 'm1',
            title: 'Sunset Surf Meetup 🏄‍♀️',
            location: 'Bali',
            date: '2025-08-04'
          },
          {
            id: 'm2',
            title: 'Free walking tour',
            location: 'Lisbon',
            date: '2025-08-05'
          }
        ]);
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const addMeetup = (data: { title: string; location: string }) => {
    const newMeetup: Meetup = {
      id: Date.now().toString(),
      title: data.title,
      location: data.location,
      date: new Date().toISOString().split('T')[0]
    };
    setMeetups((prev) => [newMeetup, ...prev]);
  };

  return { meetups, addMeetup, isLoading, error };
};