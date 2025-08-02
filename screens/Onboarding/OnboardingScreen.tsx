import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Onboarding
      onDone={() => navigation.replace('Login')}
      onSkip={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              source={require('../../assets/illustrations/slide1.png')}
              style={{ width: 300, height: 300, resizeMode: 'contain' }}
            />
          ),
          title: 'Meet Travelers Nearby',
          subtitle: 'Connect with fellow backpackers and solo explorers near you.',
        },
        {
          backgroundColor: '#f2f2f2',
          image: (
            <Image
              source={require('../../assets/illustrations/slide2.png')}
              style={{ width: 300, height: 300, resizeMode: 'contain' }}
            />
          ),
          title: 'Map Your Journey',
          subtitle: 'Pin, track, and share your adventures visually across the world.',
        },
        {
          backgroundColor: '#e5f9ff',
          image: (
            <Image
              source={require('../../assets/illustrations/slide3.png')}
              style={{ width: 300, height: 300, resizeMode: 'contain' }}
            />
          ),
          title: 'Travel Safer, Together',
          subtitle: 'Verified users, privacy control, and community-driven safety tools.',
        },
      ]}
      titleStyles={{ fontWeight: '700', fontSize: 22 }}
      subTitleStyles={{ fontSize: 14, paddingHorizontal: 24 }}
    />
  );
};