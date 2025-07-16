import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Profile from './Profile';

const firebaseConfig = {
  apiKey: "AIzaSyDJX3cxW59Xo-wX0GeSBWm1jzMgh5PzCmw",
  authDomain: "backpackbuddy-24763.firebaseapp.com",
  projectId: "backpackbuddy-24763",
  storageBucket: "backpackbuddy-24763.firebasestorage.app",
  messagingSenderId: "912941149924",
  appId: "1:912941149924:web:73e255bad0a6fc0ecdc6f1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const doc = await firebase.firestore().collection('profiles').doc(u.uid).get();
        setProfileComplete(doc.exists);
      } else {
        setProfileComplete(false);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  if (!user) {
    // Show your existing login/register UI here
    return (
      <View style={styles.container}>
        <Text>Please login first (add your login/register code here)</Text>
      </View>
    );
  }

  if (!profileComplete) {
    return (
      <Profile
        user={user}
        onSaveSuccess={() => setProfileComplete(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Welcome {user.email}!</Text>
      <Button title="Logout" onPress={handleLogout} />
      {/* Add your main app UI here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
});
