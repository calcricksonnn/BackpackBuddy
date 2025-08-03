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
  ScrollView,
  StatusBar,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

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

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  const handleChange = (key: string, val: string) =>
    setForm({ ...form, [key]: val });

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Register:', form);
    // TODO: Hook to backend
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/onboarding/bg3.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.75)']}
          style={StyleSheet.absoluteFill}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <BlurView intensity={90} tint="light" style={styles.card}>
              <Text style={styles.heading}>Create Your Account</Text>

              <TextInput
                placeholder="First Name"
                style={styles.input}
                placeholderTextColor="#888"
                value={form.firstName}
                onChangeText={(v) => handleChange('firstName', v)}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.input}
                placeholderTextColor="#888"
                value={form.lastName}
                onChangeText={(v) => handleChange('lastName', v)}
              />
              <TextInput
                placeholder="Username"
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="#888"
                value={form.username}
                onChangeText={(v) => handleChange('username', v)}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#888"
                value={form.email}
                onChangeText={(v) => handleChange('email', v)}
              />
              <TextInput
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="#888"
                secureTextEntry
                value={form.password}
                onChangeText={(v) => handleChange('password', v)}
              />
              <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                placeholderTextColor="#888"
                secureTextEntry
                value={form.confirmPassword}
                onChangeText={(v) => handleChange('confirmPassword', v)}
              />

              <TouchableOpacity onPress={handleSubmit}>
                <LinearGradient colors={['#007AFF', '#005BB5']} style={styles.button}>
                  <Text style={styles.buttonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>
                  Already have an account?{' '}
                  <Text style={styles.linkHighlight}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, justifyContent: 'center' },
  scroll: { alignItems: 'center', paddingVertical: 60 },
  card: {
    width: '90%',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
    color: '#111',
  },
  input: {
    width: '100%',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
    color: '#111',
    fontFamily: 'Poppins_400Regular',
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 28,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  link: {
    marginTop: 18,
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  linkHighlight: {
    color: '#007AFF',
    fontWeight: '600',
  },
});