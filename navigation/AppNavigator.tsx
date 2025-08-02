import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';
import { TabNavigator } from './TabNavigator';
import { AuthStack } from './AuthStack';
import { linking } from './linking';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../theme/theme';

export const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      linking={linking}
      theme={scheme === 'dark' ? DarkTheme : LightTheme}
    >
      {isAuthenticated ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};