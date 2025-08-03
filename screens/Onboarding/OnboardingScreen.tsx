import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_700Bold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    bg: require('../../assets/onboarding/bg1.png'),
    icon: '🌍',
    title: 'Meet Travelers Nearby',
    subtitle: 'Connect with backpackers and explorers around you.',
  },
  {
    bg: require('../../assets/onboarding/bg2.png'),
    icon: '🗺️',
    title: 'Map Your Journey',
    subtitle: 'Visualize, pin, and share your adventure as you go.',
  },
  {
    bg: require('../../assets/onboarding/bg3.png'),
    icon: '🛡️',
    title: 'Travel Safer, Together',
    subtitle: 'Verified users. Safety features. Trusted community.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" />
      <Swiper
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        {slides.map((slide, index) => (
          <ImageBackground
            key={index}
            source={slide.bg}
            style={styles.slide}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.85)']}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.content}>
              <Animatable.Text
                animation="fadeInDown"
                delay={100}
                style={styles.icon}
              >
                {slide.icon}
              </Animatable.Text>

              <Animatable.Text
                animation="fadeInUp"
                delay={300}
                style={styles.title}
              >
                {slide.title}
              </Animatable.Text>

              <Animatable.Text
                animation="fadeInUp"
                delay={500}
                style={styles.subtitle}
              >
                {slide.subtitle}
              </Animatable.Text>

              {index === slides.length - 1 && (
                <Animatable.View animation="fadeInUp" delay={700}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.replace('Login')}
                  >
                    <Text style={styles.buttonText}>Start Exploring</Text>
                  </TouchableOpacity>
                </Animatable.View>
              )}
            </View>
          </ImageBackground>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 100,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 6,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 6,
  },
});