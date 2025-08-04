import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface ExploreHeaderProps {
  userName: string;
  userAvatar: string;
  onProfilePress: () => void;
  onNotifPress: () => void;
  hasNotifications?: boolean;
}

const HEADER_COLORS = ["#53c7fa", "#428afc"];

const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  userName,
  userAvatar,
  onProfilePress,
  onNotifPress,
  hasNotifications = false,
}) => {
  return (
    <LinearGradient colors={HEADER_COLORS} style={styles.container}>
      <TouchableOpacity onPress={onProfilePress}>
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
      </TouchableOpacity>

      <View style={styles.greeting}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <TouchableOpacity onPress={onNotifPress}>
        <Ionicons
          name={hasNotifications ? "notifications" : "notifications-outline"}
          size={28}
          color="#fff"
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  greeting: {
    flex: 1,
    alignItems: "center",
  },
  welcomeText: {
    color: "#e0f2fe",
    fontSize: 14,
  },
  userName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
});

export default ExploreHeader;