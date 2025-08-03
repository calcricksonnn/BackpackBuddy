import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAxUycd_saBQgknRucniBhcSiGIh5eKzSg",
  authDomain: "backpackbuddy-d4569.firebaseapp.com",
  projectId: "backpackbuddy-d4569",
  storageBucket: "backpackbuddy-d4569.firebasestorage.app",
  messagingSenderId: "240634133130",
  appId: "1:240634133130:web:bab2d039160932a44b4b73"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);