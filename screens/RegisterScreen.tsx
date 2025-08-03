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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
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

  const handleChange = (key: string, val: string) => {
    setForm({ ...form, [key]: val });
  };

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert('Oops!', 'Passwords do not match');
      return;
    }

    console.log('Register:', form);
    // TODO: Send form data to backend
  };

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ImageBackground
      source={require('../assets/onboarding/bg3.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
        style={StyleSheet.absoluteFill}
      />
      <StatusBar translucent backgroundColor="transparent" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Animatable.View animation="fadeInUp" delay={200} style={styles.card}>
            <Text style={styles.heading}>Create Account 🧭</Text>

            <TextInput
              placeholder="First Name"
              placeholderTextColor="#eee"
              style={styles.input}
              value={form.firstName}
              onChangeText={(v) => handleChange('firstName', v)}
            />

            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#eee"
              style={styles.input}
              value={form.lastName}
              onChangeText={(v) => handleChange('lastName', v)}
            />

            <TextInput
              placeholder="Username"
              placeholderTextColor="#eee"
              style={styles.input}
              value={form.username}
              onChangeText={(v) => handleChange('username', v)}
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#eee"
              style={styles.input}
              value={form.email}
              onChangeText={(v) => handleChange('email', v)}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#eee"
              style={styles.input}
              value={form.password}
              onChangeText={(v) => handleChange('password', v)}
              secureTextEntry
            />

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#eee"
              style={styles.input}
              value={form.confirmPassword}
              onChangeText={(v) => handleChange('confirmPassword', v)}
              secureTextEntry
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.registerButton}>
              <LinearGradient
                colors={['#007AFF', '#005BB5']}
                style={styles.registerGradient}
              >
                <Text style={styles.registerText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>
                Already have an account?{' '}
                <Text style={styles.linkHighlight}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 14,
    fontSize: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  registerButton: {
    marginTop: 12,
  },
  registerGradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  link: {
    marginTop: 20,
    color: '#eee',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  linkHighlight: {
    color: '#fff',
    fontWeight: '700',
  },
});