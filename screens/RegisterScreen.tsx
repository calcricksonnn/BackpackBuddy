import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (key: string, val: string) =>
    setForm({ ...form, [key]: val });

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Register:', form);
  };

  return (
   <ImageBackground
  source={require('../../../assets/onboarding/bg3.png')}
  style={styles.bg}
  resizeMode="cover"
/>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <BlurView intensity={80} tint="light" style={styles.card}>
            <Text style={styles.heading}>Create Your Account</Text>

            <TextInput
              placeholder="First Name"
              style={styles.input}
              placeholderTextColor="#555"
              value={form.firstName}
              onChangeText={(v) => handleChange('firstName', v)}
            />
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              placeholderTextColor="#555"
              value={form.lastName}
              onChangeText={(v) => handleChange('lastName', v)}
            />
            <TextInput
              placeholder="Username"
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor="#555"
              value={form.username}
              onChangeText={(v) => handleChange('username', v)}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#555"
              value={form.email}
              onChangeText={(v) => handleChange('email', v)}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              placeholderTextColor="#555"
              secureTextEntry
              value={form.password}
              onChangeText={(v) => handleChange('password', v)}
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              placeholderTextColor="#555"
              secureTextEntry
              value={form.confirmPassword}
              onChangeText={(v) => handleChange('confirmPassword', v)}
            />

            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient
                colors={['#007AFF', '#005BB5']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>
                Already have an account? <Text style={styles.linkHighlight}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </BlurView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, justifyContent: 'center' },
  scroll: { alignItems: 'center', paddingVertical: 60 },
  card: {
    width: '90%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#111' },
  input: {
    width: '100%',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
    color: '#111'
  },
  button: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { marginTop: 16, fontSize: 14, color: '#ddd' },
  linkHighlight: { color: '#fff', fontWeight: '500' },
});