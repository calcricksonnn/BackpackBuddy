import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BackpackerCardProps {
  name: string;
  avatar: string;
  location: string;
  distance: number; // distance in km
  onConnectPress: () => void;
}

const BackpackerCard: React.FC<BackpackerCardProps> = ({
  name,
  avatar,
  location,
  distance,
  onConnectPress,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-sharp" size={14} color="#428afc" /> {location} ({distance}km away)
        </Text>
      </View>
      <TouchableOpacity style={styles.connectBtn} onPress={onConnectPress}>
        <Ionicons name="person-add" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginRight: 15,
    width: 150,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  info: {
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  location: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    textAlign: "center",
  },
  connectBtn: {
    backgroundColor: "#428afc",
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BackpackerCard;