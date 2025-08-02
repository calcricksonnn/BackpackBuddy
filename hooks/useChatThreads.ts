import { useEffect, useState } from 'react';
import { decryptMessage } from '../utils/encryption';

export type ChatThread = {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessageEncrypted: string;
  lastTimestamp: string;
};

export const useChatThreads = () => {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const raw = [
          {
            id: 'c1',
            userName: 'Alice',
            userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            lastMessageEncrypted: 'SGVsbG8hIFdoZXJlIGFyZSB5b3U/',
            lastTimestamp: '2025-08-01T10:00:00Z'
          },
          {
            id: 'c2',
            userName: 'Jamal',
            userAvatar: 'https://randomuser.me/api/portraits/men/66.jpg',
            lastMessageEncrypted: 'V2FubmEgdG8gbWVldCB1cCBpbiBDdXNjbyBhZ2FpbiE=',
            lastTimestamp: '2025-08-02T14:45:00Z'
          }
        ];

        const decrypted = raw.map((thread) => ({
          ...thread,
          lastMessage: decryptMessage(thread.lastMessageEncrypted)
        }));

        setThreads(decrypted);
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return { threads, isLoading, error };
};