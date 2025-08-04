import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform, Animated } from 'react-native';

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
        left: 16,
        right: 16,
        bottom: 20,
        height: 66,
        borderRadius: 32,
        backgroundColor: '#fff', // <-- Instagram solid white
        borderTopWidth: 0,
        shadowColor: '#2c3e50',
        shadowOpacity: 0.13,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 24,
        elevation: 15,
        ...Platform.select({
          android: { elevation: 18 },
        }),
      },
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ color, focused, size }) => {
        const iconName = iconMap[route.name] || 'ellipse-outline';
        return (
          <Animated.View style={focused ? styles.iconFocused : undefined}>
            <Ionicons
              name={iconName}
              size={focused ? 30 : 25}
              color={focused ? '#2563eb' : '#b5b8c9'}
              style={{
                shadowColor: focused ? '#2563eb' : 'transparent',
                shadowOpacity: focused ? 0.2 : 0,
                shadowRadius: focused ? 7 : 0,
                shadowOffset: { width: 0, height: 1 },
                top: focused ? -1 : 0,
              }}
            />
            {focused && <View style={styles.activeDot} />}
          </Animated.View>
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

const styles = StyleSheet.create({
  iconFocused: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563eb',
    marginTop: 1,
    alignSelf: 'center',
  },
});

export default BottomTabNavigator;