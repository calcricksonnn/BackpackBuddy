import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/illustrations/travel.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.title}>Welcome to BackpackBuddy</Text>
      <Text style={styles.text}>Connect, explore, and journey safely ✈️</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '600', marginTop: 20 },
  text: { fontSize: 14, color: '#777', textAlign: 'center', paddingHorizontal: 32 },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  }
});