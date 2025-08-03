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
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { register } from '../firebase/auth';
import { useAuthStore } from '../store/authStore';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.firstName || !form.lastName || !form.username) {
      Alert.alert('Missing fields', 'Please complete all fields');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Oops!', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const user = await register(
        form.email,
        form.password,
        `${form.firstName} ${form.lastName}`,
        form.username
      );
      setUser(user);
      navigation.reset({ index: 0, routes: [{ name: 'Explore' }] });
    } catch (err: any) {
      Alert.alert('Registration failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ImageBackground
      source={{ uri: 'https://your-link.com/bg3.jpg' }}
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

            {['firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword'].map(
              (field) => (
                <TextInput
                  key={field}
                  placeholder={field
                    .replace('firstName', 'First Name')
                    .replace('lastName', 'Last Name')
                    .replace('confirmPassword', 'Confirm Password')
                    .replace('password', 'Password')
                    .replace('username', 'Username')
                    .replace('email', 'Email')}
                  placeholderTextColor="#eee"
                  style={styles.input}
                  value={form[field as keyof typeof form]}
                  onChangeText={(v) => handleChange(field, v)}
                  secureTextEntry={field.includes('password')}
                  autoCapitalize={field === 'email' ? 'none' : undefined}
                  keyboardType={field === 'email' ? 'email-address' : 'default'}
                />
              )
            )}

            <TouchableOpacity onPress={handleSubmit} style={styles.registerButton} disabled={loading}>
              <LinearGradient colors={['#007AFF', '#005BB5']} style={styles.registerGradient}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.registerText}>Create Account</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>
                Already have an account? <Text style={styles.linkHighlight}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: { flex: 1 },
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