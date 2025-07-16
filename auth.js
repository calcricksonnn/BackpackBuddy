import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid email format');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters');
      return;
    }
    if (!name.trim()) {
      Alert.alert('Please enter your name');
      return;
    }
    try {
      const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password);
      const uid = userCred.user.uid;

      await firebase.firestore().collection('profiles').doc(uid).set({
        name: name.trim(),
        email: email.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid email format');
      return;
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Enter a valid email to reset your password');
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(email.trim());
      Alert.alert('Password Reset', 'Check your email for reset instructions');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? 'Register' : 'Log In'}</Text>

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.toggleText}>
            {passwordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

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
          <Button title="Forgot Password?" onPress={handleResetPassword} />
          <Text style={styles.toggle} onPress={() => setIsRegistering(true)}>
            Don't have an account? Register
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
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
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleText: {
    marginLeft: 10,
    color: '#007BFF',
    fontWeight: '600',
  },
});