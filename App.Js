import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Success", "Account created!");
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>BackpackBuddy</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <View style={{ height: 10 }} />
        <Button title="Register" onPress={handleRegister} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user.email} 👋</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
});
