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

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { email, password });
    // TODO: Call Firebase/Supabase auth
  };

  return (
    <ImageBackground
      source={require('../../assets/onboarding/bg2.jpg')}
      style={styles.bg}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <BlurView intensity={80} tint="light" style={styles.card}>
            <Text style={styles.heading}>Welcome Back</Text>

            <TextInput
              placeholder="Email"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              placeholderTextColor="#555"
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={handleLogin}>
              <LinearGradient
                colors={['#007AFF', '#005BB5']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>
                Don’t have an account? <Text style={styles.linkHighlight}>Sign up</Text>
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