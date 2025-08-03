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

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  const handleLogin = () => {
    console.log('Login:', { email, password });
    // TODO: Firebase/Supabase auth
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/onboarding/bg2.png')}
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
              <Text style={styles.heading}>Welcome Back</Text>

              <TextInput
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity onPress={handleLogin}>
                <LinearGradient colors={['#007AFF', '#005BB5']} style={styles.button}>
                  <Text style={styles.buttonText}>Log In</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>
                  Don’t have an account?{' '}
                  <Text style={styles.linkHighlight}>Sign up</Text>
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
    marginBottom: 20,
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