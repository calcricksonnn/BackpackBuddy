import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>BackpackBuddy is ready 🚀</Text>
      </View>
    </NavigationContainer>
  );
}