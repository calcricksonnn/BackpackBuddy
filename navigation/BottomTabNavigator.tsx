import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';

// Import your screens
import ExploreScreen from '../screens/ExploreScreen';
import JourneyScreen from '../screens/JourneyScreen';
import MeetupsScreen from '../screens/MeetupsScreen';
import InboxScreen from '../screens/InboxScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarBackground = () => (
  <View style={styles.tabBarBackground} />
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 18,
          height: 64,
          borderRadius: 28,
          elevation: 10,
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 18,
          ...Platform.select({
            android: {
              elevation: 10,
            },
          }),
        },
        tabBarBackground: () => <CustomTabBarBackground />,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 3,
          fontWeight: '700',
        },
        tabBarItemStyle: {
          marginTop: 4,
        },
        tabBarActiveTintColor: '#3B82F6', // Blue accent
        tabBarInactiveTintColor: '#B0B8CF',
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, focused, size }) => {
          let iconName: any;
          if (route.name === 'Explore') iconName = 'compass-outline';
          else if (route.name === 'Journey') iconName = 'walk-outline';
          else if (route.name === 'Meetups') iconName = 'calendar-outline';
          else if (route.name === 'Inbox') iconName = 'chatbubble-ellipses-outline';
          else if (route.name === 'Profile') iconName = 'person-circle-outline';

          return (
            <Ionicons
              name={iconName}
              size={focused ? 29 : 24}
              color={color}
              style={focused ? { top: -2 } : undefined}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Journey" component={JourneyScreen} />
      <Tab.Screen name="Meetups" component={MeetupsScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 28,
    borderTopWidth: 0,
  },
});

export default BottomTabNavigator;