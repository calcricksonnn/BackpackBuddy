import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Profile from './Profile';
import Meetups from './Meetups';
import Chat from './Chat'; 
import Explore from './Explore';
import RoutePlanner from './RoutePlanner';
import Notifications from './Notifications';
import Auth from './Auth';

// ✅ Firebase configuration (declared only once)
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDJX3cxW59Xo-wX0GeSBWm1jzMgh5PzCmw",
    authDomain: "backpackbuddy-24763.firebaseapp.com",
    projectId: "backpackbuddy-24763",
    storageBucket: "backpackbuddy-24763.appspot.com", // ✅ fixed typo: use .appspot.com for Firestore
    messagingSenderId: "912941149924",
    appId: "1:912941149924:web:73e255bad0a6fc0ecdc6f1",
  };
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [screen, setScreen] = useState('loading');
  const [chatWithUser, setChatWithUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        const doc = await firebase.firestore().collection('profiles').doc(u.uid).get();
        setProfileComplete(doc.exists);
        setScreen(doc.exists ? 'meetups' : 'profile');
      } else {
        setProfileComplete(false);
        setScreen('login');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const openChatWith = (userToChat) => {
    setChatWithUser(userToChat);
    setScreen('chat');
  };

  const goBackFromChat = () => {
    setChatWithUser(null);
    setScreen('meetups');
  };

  if (screen === 'loading') {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (screen === 'login') {
    return <Auth />;
  }

  if (!user) return null;

  if (!profileComplete && screen !== 'profile') {
    setScreen('profile');
    return null;
  }

  const NavBar = () => (
    <View style={styles.navBar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button title="Profile" onPress={() => setScreen('profile')} />
        <Button title="Meetups" onPress={() => setScreen('meetups')} />
        <Button title="Chat" onPress={() => setScreen('chat')} />
        <Button title="Explore" onPress={() => setScreen('explore')} />
        <Button title="Route Planner" onPress={() => setScreen('routeplanner')} />
        <Button title="Notifications" onPress={() => setScreen('notifications')} />
        <Button title="Logout" onPress={handleLogout} />
      </ScrollView>
    </View>
  );

  const renderScreen = () => {
    switch (screen) {
      case 'profile':
        return <Profile user={user} onSaveSuccess={() => setProfileComplete(true)} />;
      case 'meetups':
        return <Meetups user={user} onStartChat={openChatWith} />;
      case 'chat':
        if (!chatWithUser) {
          setScreen('meetups');
          return null;
        }
        return <Chat user={user} chatWith={chatWithUser} goBack={goBackFromChat} />;
      case 'explore':
        return <Explore user={user} onStartChat={openChatWith} />;
      case 'routeplanner':
        return <RoutePlanner user={user} />;
      case 'notifications':
        return <Notifications user={user} />;
      default:
        return (
          <View style={styles.container}>
            <Text>Unknown screen: {screen}</Text>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  navBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
});