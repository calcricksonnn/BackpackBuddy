import { useEffect, useState } from 'react';

export type User = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    // Simulate network request
    const timeout = setTimeout(() => {
      try {
        setUsers([
          {
            id: '1',
            name: 'Alice from Berlin',
            avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
            bio: 'Backpacking South America 🇧🇷',
            location: 'Rio de Janeiro'
          },
          {
            id: '2',
            name: 'Jamal from Morocco',
            avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
            bio: 'Looking for hiking buddies 🥾',
            location: 'Cusco'
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

  return { users, isLoading, error };
};