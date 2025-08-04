import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ExploreScreen } from "../screens/ExploreScreen";
import { MeetupsScreen } from "../screens/MeetupsScreen";
import { InboxScreen } from "../screens/InboxScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Explore: "compass-outline",
  Meetups: "calendar-outline",
  Inbox: "chatbubble-ellipses-outline",
  Profile: "person-circle-outline",
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 62,
          borderTopWidth: 0.8,
          borderTopColor: "#e5e7eb",
          backgroundColor: "#fff",
          shadowColor: "#222",
          shadowOpacity: 0.07,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -2 },
          elevation: 19,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12.5,
          fontWeight: "600",
          marginBottom: 4,
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#b0b9cc",
        tabBarIcon: ({ color, focused }) => {
          const iconName = TAB_ICONS[route.name] || "ellipse-outline";
          return (
            <Ionicons
              name={iconName}
              size={focused ? 26 : 22}
              color={color}
              style={{ alignSelf: "center" }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Meetups" component={MeetupsScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
