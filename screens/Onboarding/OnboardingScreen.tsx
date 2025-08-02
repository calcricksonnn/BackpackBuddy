import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export const OnboardingScreen: React.FC = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '600', marginTop: 20 },
  text: { fontSize: 14, color: '#777', textAlign: 'center', paddingHorizontal: 32 }
});