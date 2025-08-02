import { useEffect, useState } from 'react';

export type UserProfile = {
  id: string;
  name: string;
  bio: string;
  location: string;
  avatar: string;
};

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProfile({
        id: 'u123',
        name: 'You',
        bio: 'Solo traveler sharing moments 🌍',
        location: 'Bangkok',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...data } : null));
    // Firebase: updateDoc(doc(db, 'users', uid), data)
  };

  return { profile, updateProfile, isLoading };
};