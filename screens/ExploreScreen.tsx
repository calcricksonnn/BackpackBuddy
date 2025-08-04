import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// MOCK DATA (New for the feed)
const USER = {
  name: "Cal",
  avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  location: "Cervantes, Australia",
  weather: "17° Sunny",
  hasNotif: true,
};

const STATS = [
  { label: "Nearby", value: 5 },
  { label: "Events", value: 4 },
  { label: "Connections", value: 24 },
];

const MOCK_BACKPACKERS = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    online: true,
    flag: "🇬🇧",
    distance: "0.5 km",
  },
  {
    id: "2",
    name: "Sarah Jones",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true,
    flag: "🇯🇵",
    distance: "0.5 km",
  },
  {
    id: "3",
    name: "Lee Park",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    online: false,
    flag: "🇰🇷",
    distance: "0.8 km",
  },
  {
    id: "4",
    name: "Maria Garcia",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    online: true,
    flag: "🇪🇸",
    distance: "1.2 km",
  },
];

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Hostel BBQ Night",
    date: "Today • 8:00 PM",
    location: "Main Beach Hostel",
    going: 9,
    isJoined: true,
  },
  {
    id: "2",
    title: "Beach Volleyball",
    date: "Tomorrow • 5:00 PM",
    location: "Main Beach",
    going: 4,
    isJoined: false,
  },
];

const MOCK_GROUPS = [
  {
    id: "1",
    name: "Hiking Enthusiasts",
    members: [
      "https://randomuser.me/api/portraits/men/15.jpg",
      "https://randomuser.me/api/portraits/women/49.jpg",
    ],
    membersCount: 31,
    active: true,
  },
  {
    id: "2",
    name: "Digital Nomads",
    members: [
      "https://randomuser.me/api/portraits/men/20.jpg",
      "https://randomuser.me/api/portraits/women/72.jpg",
      "https://randomuser.me/api/portraits/men/38.jpg",
    ],
    membersCount: 19,
    active: false,
  },
];

const MOCK_FEED_POSTS = [
  {
    id: "1",
    user: { name: "Sarah Jones", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    timestamp: "2 hours ago",
    content: "Just arrived in Cervantes! Any recommendations for a good local surf spot? 🏄‍♀️",
    likes: 12,
    comments: 4,
    hasLiked: true,
  },
  {
    id: "2",
    user: { name: "Alex Chen", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
    timestamp: "5 hours ago",
    content: "Found a hidden gem for photography near the main lighthouse. The sunset here is unreal! 📸",
    likes: 21,
    comments: 7,
    hasLiked: false,
  },
];

// --- COMPONENTS WITH THE NEW DESIGN LANGUAGE ---

// New, simplified Header
const ExploreHeader = ({ user, onNotif, onProfile }) => {
  return (
    <LinearGradient colors={["#6a93ec", "#53c7fa"]} style={headerStyles.headerBg}>
      <View style={headerStyles.headerContainer}>
        <TouchableOpacity onPress={onProfile} style={headerStyles.profileContainer}>
          <Image source={{ uri: user.avatar }} style={headerStyles.avatar} />
          <Text style={headerStyles.greetingText}>Hi, {user.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNotif} style={headerStyles.notifButton}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
          {user.hasNotif && <View style={headerStyles.notifDot} />}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// Redesigned Nearby Backpackers component
const BackpackersSection = ({ data }) => {
  return (
    <View style={sectionStyles.sectionContainer}>
      <View style={sectionStyles.sectionHeader}>
        <Text style={sectionStyles.sectionTitle}>Nearby Backpackers</Text>
        <TouchableOpacity>
          <Text style={sectionStyles.seeAllBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={sectionStyles.horizontalList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={cardStyles.backpackerCard}>
            <Image source={{ uri: item.avatar }} style={cardStyles.backpackerAvatar} />
            <Text style={cardStyles.backpackerName}>{item.name}</Text>
            <Text style={cardStyles.backpackerDistance}>{item.distance}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Redesigned Events component
const EventsSection = ({ data }) => {
  return (
    <View style={sectionStyles.sectionContainer}>
      <View style={sectionStyles.sectionHeader}>
        <Text style={sectionStyles.sectionTitle}>Local Events</Text>
        <TouchableOpacity>
          <Text style={sectionStyles.seeAllBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={sectionStyles.horizontalList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={cardStyles.eventCard}>
            <Text style={cardStyles.eventTitle}>{item.title}</Text>
            <Text style={cardStyles.eventDate}>{item.date}</Text>
            <View style={cardStyles.eventMeta}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={cardStyles.eventLocation}>{item.location}</Text>
            </View>
            <View style={cardStyles.joinInfo}>
              <Text style={cardStyles.joinText}>{item.going} people going</Text>
              <TouchableOpacity style={cardStyles.joinButton}>
                <Text style={cardStyles.joinButtonText}>{item.isJoined ? "Joined" : "Join"}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Redesigned Feed component
const FeedSection = ({ data }) => {
  const FeedPost = ({ post }) => {
    return (
      <View style={cardStyles.postCard}>
        <View style={cardStyles.postHeader}>
          <Image source={{ uri: post.user.avatar }} style={cardStyles.postAvatar} />
          <View>
            <Text style={cardStyles.postUserName}>{post.user.name}</Text>
            <Text style={cardStyles.postTimestamp}>{post.timestamp}</Text>
          </View>
        </View>
        <Text style={cardStyles.postContent}>{post.content}</Text>
        <View style={cardStyles.postActions}>
          <TouchableOpacity style={cardStyles.actionButton}>
            <Ionicons name={post.hasLiked ? "heart" : "heart-outline"} size={22} color={post.hasLiked ? "#ff4081" : "#666"} />
            <Text style={cardStyles.actionText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={cardStyles.actionButton}>
            <Ionicons name="chatbubble-outline" size={22} color="#666" />
            <Text style={cardStyles.actionText}>{post.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={sectionStyles.sectionContainer}>
      <View style={sectionStyles.sectionHeader}>
        <Text style={sectionStyles.sectionTitle}>Local Feed</Text>
        <TouchableOpacity>
          <Text style={sectionStyles.seeAllBtn}>New Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={sectionStyles.verticalList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedPost post={item} />}
      />
    </View>
  );
};

// Redesigned Mini Map section
const MiniMapSection = ({ onMapPress }) => {
  const markerColor = {
    you: "#ff5252",
    backpacker: "#428afc",
    event: "#22c55e",
  };
  const MINI_MAP_LAT = -30.5;
  const MINI_MAP_LNG = 115.1;
  const markers = [
    { id: "you", type: "you", lat: MINI_MAP_LAT, lng: MINI_MAP_LNG, label: "You" },
    { id: "backpacker1", type: "backpacker", lat: MINI_MAP_LAT + 0.012, lng: MINI_MAP_LNG + 0.01, label: "Alex" },
    { id: "event1", type: "event", lat: MINI_MAP_LAT + 0.01, lng: MINI_MAP_LNG - 0.014, label: "BBQ Night" },
  ];

  return (
    <View style={sectionStyles.sectionContainer}>
      <View style={sectionStyles.sectionHeader}>
        <Text style={sectionStyles.sectionTitle}>Nearby on Map</Text>
        <TouchableOpacity onPress={onMapPress}>
          <Text style={sectionStyles.seeAllBtn}>View Full Map</Text>
        </TouchableOpacity>
      </View>
      <View style={cardStyles.mapCard}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={cardStyles.mapStyle}
          region={{
            latitude: MINI_MAP_LAT,
            longitude: MINI_MAP_LNG,
            latitudeDelta: 0.045,
            longitudeDelta: 0.03,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          {markers.map((m) => (
            <Marker
              key={m.id}
              coordinate={{ latitude: m.lat, longitude: m.lng }}
              pinColor={markerColor[m.type]}
            />
          ))}
        </MapView>
      </View>
    </View>
  );
};

// The main screen component
export function ExploreScreen() {
  const handleNotifPress = () => console.log("Notifications Pressed");
  const handleProfilePress = () => console.log("Profile Pressed");
  const handleMapPress = () => console.log("Full Map Pressed");

  return (
    <View style={styles.container}>
      <ExploreHeader user={USER} onNotif={handleNotifPress} onProfile={handleProfilePress} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <BackpackersSection data={MOCK_BACKPACKERS} />
        <EventsSection data={MOCK_EVENTS} />
        <FeedSection data={MOCK_FEED_POSTS} />
        <MiniMapSection onMapPress={handleMapPress} />
      </ScrollView>
    </View>
  );
}

// --- NEW STYLES ---
const headerStyles = StyleSheet.create({
  headerBg: {
    paddingTop: Platform.OS === "android" ? 50 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: -10, // Pulls content up into the header
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  notifButton: {
    padding: 8,
  },
  notifDot: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff5252",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
});

const sectionStyles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a202c",
  },
  seeAllBtn: {
    color: "#428afc",
    fontWeight: "600",
  },
  horizontalList: {
    paddingHorizontal: 20,
    gap: 15,
  },
  verticalList: {
    paddingHorizontal: 20,
    gap: 15,
  },
});

const cardStyles = StyleSheet.create({
  // Backpacker Card
  backpackerCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: 120,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  backpackerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  backpackerName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1a202c",
  },
  backpackerDistance: {
    fontSize: 12,
    color: "#a0aec0",
    marginTop: 2,
  },

  // Event Card
  eventCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: 250,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  eventLocation: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
  },
  joinInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  joinText: {
    fontSize: 13,
    color: "#428afc",
    fontWeight: "600",
  },
  joinButton: {
    backgroundColor: "#428afc",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Feed Post Card
  postCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUserName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postTimestamp: {
    fontSize: 12,
    color: "#a0aec0",
  },
  postContent: {
    fontSize: 16,
    color: "#1a202c",
    marginBottom: 15,
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionText: {
    fontSize: 14,
    color: "#666",
  },

  // Map Card
  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    height: 200,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
});

