import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/Onboarding/OnboardingScreen';

const Stack = createNativeStackNavigator();

export const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    {/* Add LoginScreen, RegisterScreen later if needed */}
  </Stack.Navigator>
);