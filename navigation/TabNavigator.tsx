import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExploreScreen } from '../screens/ExploreScreen';
import { JourneyScreen } from '../screens/JourneyScreen';
import { MeetupsScreen } from '../screens/MeetupsScreen';
import { InboxScreen } from '../screens/InboxScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Explore" component={ExploreScreen} />
    <Tab.Screen name="Journey" component={JourneyScreen} />
    <Tab.Screen name="Meetups" component={MeetupsScreen} />
    <Tab.Screen name="Inbox" component={InboxScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);