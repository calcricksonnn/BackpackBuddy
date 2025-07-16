import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? 'Register' : 'Login'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isRegistering ? (
        <>
          <Button title="Create Account" onPress={handleRegister} />
          <Text style={styles.toggle} onPress={() => setIsRegistering(false)}>
            Already have an account? Log in
          </Text>
        </>
      ) : (
        <>
          <Button title="Log In" onPress={handleLogin} />
          <Text style={styles.toggle} onPress={() => setIsRegistering(true)}>
            Don't have an account? Register
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  toggle: {
    textAlign: 'center',
    color: '#007BFF',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});