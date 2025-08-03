import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase'; // adjust path as needed
import { useAuthStore } from './store/authStore';
import AppStack from './navigation/AppStack'; // screens for logged-in users
import AuthStack from './navigation/AuthStack'; // Login/Register screens
import LoadingScreen from './screens/LoadingScreen';

export default function App() {
  const { setUser, signOut } = useAuthStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        signOut();
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <LoadingScreen />;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}