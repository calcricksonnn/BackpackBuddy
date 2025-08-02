import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, Text } from 'react-native';
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
          image: <Image source={require('../../assets/illustrations/slide1.png')} style={{ width: 250, height: 250 }} />,
          title: 'Meet Fellow Travelers',
          subtitle: 'Find backpackers nearby, share your path, and explore together.',
        },
        {
          backgroundColor: '#f2f2f2',
          image: <Image source={require('../../assets/illustrations/slide2.png')} style={{ width: 250, height: 250 }} />,
          title: 'Map Your Journey',
          subtitle: 'Log places you’ve been, and see where your paths intersect.',
        },
        {
          backgroundColor: '#e5f9ff',
          image: <Image source={require('../../assets/illustrations/slide3.png')} style={{ width: 250, height: 250 }} />,
          title: 'Travel Safer',
          subtitle: 'Meet verified travelers and keep control of your privacy.',
        },
      ]}
      titleStyles={{ fontWeight: '700', fontSize: 22 }}
      subTitleStyles={{ fontSize: 14, paddingHorizontal: 24 }}
    />
  );
};