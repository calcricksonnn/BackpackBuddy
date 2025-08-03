import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TravelerCard = ({ traveler, onConnect, onProfile }) => (
  <LinearGradient
    colors={["#23264B", "#192233"]}
    style={styles.card}
    start={[0.2, 0.1]}
    end={[1, 1]}
  >
    <TouchableOpacity onPress={onProfile} activeOpacity={0.85}>
      <Image source={{ uri: traveler.avatar }} style={styles.avatar} />
    </TouchableOpacity>
    <Text style={styles.name}>{traveler.name}, {traveler.age}</Text>
    <Text style={styles.statusBadge}>{traveler.badge}</Text>
    <Text style={styles.location}>
      <Ionicons name="location" size={16} color="#4ADE80" /> {traveler.location}
    </Text>
    <Text style={styles.bio}>{traveler.bio}</Text>
    <View style={styles.interestRow}>
      {traveler.interests.map((interest, i) => (
        <View style={styles.interestPill} key={i}>
          <Text style={styles.interestText}>{interest}</Text>
        </View>
      ))}
    </View>
    <View style={styles.actions}>
      <TouchableOpacity onPress={onProfile} style={styles.actionBtn}>
        <Ionicons name="information-circle-outline" size={27} color="#818CF8" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onConnect} style={styles.actionBtn}>
        <Ionicons name="chatbubble-ellipses" size={27} color="#4ADE80" />
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 23,
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 18,
    width: 330,
    minHeight: 395,
    shadowColor: "#0009",
    shadowOpacity: 0.13,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 19,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#4ADE80",
    backgroundColor: "#fff",
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 2,
    marginTop: 2,
  },
  statusBadge: {
    color: "#facc15",
    backgroundColor: "#2d3549",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    fontWeight: "700",
    marginBottom: 6,
    fontSize: 13,
  },
  location: {
    color: "#a6f5c2",
    fontSize: 15,
    marginBottom: 8,
    fontWeight: "700",
  },
  bio: {
    color: "#dbeafe",
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 12,
    textAlign: "center",
    minHeight: 38,
    marginHorizontal: 4,
  },
  interestRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
    marginBottom: 12,
  },
  interestPill: {
    backgroundColor: "#253869",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 3,
    marginBottom: 4,
  },
  interestText: {
    color: "#6ee7b7",
    fontWeight: "700",
    fontSize: 13,
  },
  actions: {
    flexDirection: "row",
    marginTop: 8,
    gap: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    backgroundColor: "#232d4e",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 6,
  },
});

export default TravelerCard;