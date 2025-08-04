import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Platform } from 'react-native';

import ExploreScreen from '../screens/ExploreScreen';
import JourneyScreen from '../screens/JourneyScreen';
import MeetupsScreen from '../screens/MeetupsScreen';
import InboxScreen from '../screens/InboxScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const iconMap = {
  Explore: 'compass-outline',
  Journey: 'walk-outline',
  Meetups: 'calendar-outline',
  Inbox: 'chatbubble-ellipses-outline',
  Profile: 'person-circle-outline',
};

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 56,
        borderTopWidth: 0.5,
        borderTopColor: '#e5e7eb',
        backgroundColor: '#fff',
        elevation: 13,
        shadowColor: '#222',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: -1 },
        shadowRadius: 4,
        ...Platform.select({
          android: { elevation: 18 },
        }),
      },
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ color, focused }) => {
        const iconName = iconMap[route.name] || 'ellipse-outline';
        return (
          <Ionicons
            name={iconName}
            size={focused ? 27 : 23}
            color={focused ? '#2563eb' : '#a3adc2'}
            style={{ alignSelf: 'center' }}
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

export default BottomTabNavigator;