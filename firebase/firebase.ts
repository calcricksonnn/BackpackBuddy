import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAxUycd_saBQgknRucniBhcSiGIh5eKzSg",
  authDomain: "backpackbuddy-d4569.firebaseapp.com",
  projectId: "backpackbuddy-d4569",
  storageBucket: "backpackbuddy-d4569.appspot.com",
  messagingSenderId: "240634133130",
  appId: "1:240634133130:web:bab2d039160932a44b4b73"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };