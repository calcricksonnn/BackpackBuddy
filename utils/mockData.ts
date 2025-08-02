export type MockUser = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
};

export const mockUsers: MockUser[] = [
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
  // add more if needed
];