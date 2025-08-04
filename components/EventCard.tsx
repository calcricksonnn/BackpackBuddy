import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EventCardProps {
  title: string;
  location: string;
  date: string;
  image: string;
  onJoinPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  location,
  date,
  image,
  onJoinPress,
}) => {
  return (
    <ImageBackground source={{ uri: image }} style={styles.card} imageStyle={styles.image}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.details}>
          <Text style={styles.info}>
            <Ionicons name="location-sharp" size={14} color="#fff" /> {location}
          </Text>
          <Text style={styles.info}>
            <Ionicons name="calendar" size={14} color="#fff" /> {date}
          </Text>
        </View>
        <TouchableOpacity style={styles.joinBtn} onPress={onJoinPress}>
          <Text style={styles.joinText}>Join</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 140,
    marginRight: 15,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  details: {
    marginBottom: 8,
  },
  info: {
    fontSize: 12,
    color: "#e0e0e0",
    marginVertical: 1,
  },
  joinBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#53c7fa",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 12,
  },
  joinText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default EventCard;