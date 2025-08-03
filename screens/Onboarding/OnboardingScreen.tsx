import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    bg: require('../assets/onboarding/bg1.png'),
    title: 'Meet Travelers Nearby',
    subtitle: 'Connect with fellow backpackers and solo explorers near you.',
  },
  {
    bg: require('../assets/onboarding/bg2.png'),
    title: 'Map Your Journey',
    subtitle: 'Pin, track, and share your adventures visually across the world.',
  },
  {
    bg: require('../assets/onboarding/bg3.png'),
    title: 'Travel Safer, Together',
    subtitle: 'Verified users, privacy control, and community-driven safety tools.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Swiper loop={false} dotColor="#ccc" activeDotColor="#007AFF">
      {slides.map((slide, index) => (
        <ImageBackground key={index} source={slide.bg} style={styles.slide} resizeMode="cover">
          <View style={styles.overlay}>
            <View style={styles.card}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
              {index === slides.length - 1 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.replace('Login')}
                >
                  <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ImageBackground>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});