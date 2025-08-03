// firebase/firestore.ts
import { getFirestore } from 'firebase/firestore';
import { app } from './firebase';

// Export the Firestore instance for use throughout your app
export const db = getFirestore(app);