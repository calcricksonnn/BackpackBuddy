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
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('window');

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  const handleLogin = () => {
    console.log('Login:', { email, password });
    // TODO: Firebase or Supabase Auth
  };

  return (
    <ImageBackground
      source={require('../assets/onboarding/bg2.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
        style={StyleSheet.absoluteFillObject}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <BlurView intensity={90} tint="light" style={styles.card}>
            <Animatable.Text
              animation="fadeInDown"
              style={styles.heading}
              delay={100}
            >
              Welcome Back
            </Animatable.Text>

            <Animatable.View animation="fadeInUp" delay={200} style={styles.field}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
              />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={300} style={styles.field}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
              />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={400}>
              <TouchableOpacity onPress={handleLogin}>
                <LinearGradient
                  colors={['#007AFF', '#005BB5']}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Log In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={500}>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>
                  Don’t have an account?{' '}
                  <Text style={styles.linkHighlight}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </BlurView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    width,
    height,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  card: {
    width: '90%',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    color: '#111',
    marginBottom: 24,
  },
  field: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#111',
  },
  button: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  link: {
    marginTop: 18,
    fontSize: 14,
    color: '#444',
    fontFamily: 'Poppins_400Regular',
  },
  linkHighlight: {
    color: '#007AFF',
    fontFamily: 'Poppins_700Bold',
  },
});