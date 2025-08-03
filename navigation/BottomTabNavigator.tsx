import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { BlurView } from 'expo-blur';

// Screens
import ExploreScreen from '../screens/ExploreScreen';
import JourneyScreen from '../screens/JourneyScreen';
import MeetupsScreen from '../screens/MeetupsScreen';
import InboxScreen from '../screens/InboxScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarBackground = () => (
  <BlurView
    intensity={50}
    tint="light"
    style={styles.tabBarBackground}
  />
);

const iconMap: Record<string, any> = {
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
        left: 20,
        right: 20,
        bottom: 26,
        height: 70,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.78)',
        borderTopWidth: 0,
        shadowColor: '#5f6c9e',
        shadowOpacity: 0.13,
        shadowOffset: { width: 0, height: 9 },
        shadowRadius: 22,
        elevation: 12,
        ...Platform.select({
          android: {
            elevation: 14,
          },
        }),
      },
      tabBarBackground: () => <CustomTabBarBackground />,
      tabBarShowLabel: false, // Icons only for ultra-clean look
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ color, focused, size }) => {
        const iconName = iconMap[route.name] || 'ellipse-outline';
        return (
          <Animated.View style={focused ? styles.iconFocused : undefined}>
            <Ionicons
              name={iconName}
              size={focused ? 31 : 24}
              color={focused ? '#3B82F6' : color}
              style={{
                shadowColor: focused ? '#3B82F6' : 'transparent',
                shadowOpacity: focused ? 0.18 : 0,
                shadowRadius: focused ? 11 : 0,
                shadowOffset: { width: 0, height: 2 },
                elevation: focused ? 5 : 0,
                top: focused ? -2 : 0,
                // Add a slight gradient glow for active tab
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
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 36,
    borderTopWidth: 0,
    overflow: 'hidden',
  },
  iconFocused: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginTop: 2,
    alignSelf: 'center',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
  },
});

export default BottomTabNavigator;