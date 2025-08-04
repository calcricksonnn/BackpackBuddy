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

// MOCK DATA
const APP_BRAND = "WanderConnect";
const USER = {
  name: "You",
  avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  location: "Bangkok, Thailand",
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
    distance: "0.5 km away",
    status: "solo",
  },
  {
    id: "2",
    name: "Sarah Jones",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    distance: "0.5 km away",
    status: "couple",
  },
  {
    id: "3",
    name: "Lee Park",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    distance: "0.8 km away",
    status: "solo",
  },
];

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Temple Tour & Local Food",
    date: "Tomorrow",
    time: "7:33 PM",
    going: 5,
    distance: "0.5 km",
  },
  {
    id: "2",
    title: "Chatuchak Weekend Market Adventure",
    date: "06/08/2025",
    time: "7:33 PM",
    going: 4,
    distance: "0.5 km",
  },
  {
    id: "3",
    title: "Rooftop Bar Crawl",
    date: "07/08/2025",
    time: "8:00 PM",
    going: 7,
    distance: "0.5 km",
  },
];

const MOCK_GROUPS = [
  {
    id: "1",
    name: "Southeast Asia Backpackers",
    description: "A group for solo travelers exploring Thailand, Vietnam, Cambodia, and Laos. Share tips,...",
    members: [
      "https://randomuser.me/api/portraits/men/15.jpg",
      "https://randomuser.me/api/portraits/women/49.jpg",
      "https://randomuser.me/api/portraits/men/20.jpg",
      "https://randomuser.me/api/portraits/women/72.jpg",
    ],
    membersCount: 5, // Represented as '+5'
    active: true,
  },
  {
    id: "2",
    name: "Digital Nomads Bangkok",
    description: "Working remotely while exploring Bangkok? Join our community of digital nomads for co-workin...",
    members: [
      "https://randomuser.me/api/portraits/men/11.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/men/22.jpg",
      "https://randomuser.me/api/portraits/women/1.jpg",
    ],
    membersCount: 5, // Represented as '+5'
    active: true,
  },
];

// Map Data
const MAP_REGION = {
  latitude: 13.7563, // Bangkok coordinates
  longitude: 100.5018,
  latitudeDelta: 0.045,
  longitudeDelta: 0.03,
};
const MAP_MARKERS = [
  { id: "1", type: "backpacker", coordinate: { latitude: 13.765, longitude: 100.495 } },
  { id: "2", type: "backpacker", coordinate: { latitude: 13.76, longitude: 100.51 } },
  { id: "3", type: "event", coordinate: { latitude: 13.74, longitude: 100.48 } },
  { id: "4", type: "event", coordinate: { latitude: 13.75, longitude: 100.52 } },
];
const MAP_LEGEND = [
  { label: "Backpackers", color: "#428afc", count: 5 },
  { label: "Events", color: "#22c55e", count: 4 },
  { label: "You", color: "#ff5252" },
];

// --- COMPONENTS ---

const AppHeader = ({ brand, user, stats, onNotif, onProfile }) => {
  return (
    <LinearGradient colors={["#6a93ec", "#53c7fa"]} style={headerStyles.headerBg}>
      <View style={headerStyles.topContainer}>
        <Text style={headerStyles.brandText}>{brand}</Text>
        <Text style={headerStyles.locationText}>{user.location}</Text>
        <TouchableOpacity onPress={onNotif} style={headerStyles.notifButton}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={headerStyles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={headerStyles.statItem}>
            <Text style={headerStyles.statValue}>{stat.value}</Text>
            <Text style={headerStyles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};


// Backpackers Section
const NearbyBackpackersSection = ({ data }) => {
  const Card = ({ item }) => (
    <View style={cardStyles.backpackerCard}>
      <Image source={{ uri: item.avatar }} style={cardStyles.backpackerAvatar} />
      <Text style={cardStyles.backpackerName}>{item.name}</Text>
      <Text style={cardStyles.backpackerDistance}>{item.distance}</Text>
      <TouchableOpacity style={cardStyles.connectButton}>
        <Text style={cardStyles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={sectionStyles.sectionContainer}>
      <View style={sectionStyles.sectionHeader}>
        <Text style={sectionStyles.sectionTitle}>Nearby Backpackers</Text>
        <TouchableOpacity>
          <Text style={sectionStyles.seeAllBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[{ id: "you", name: "You", avatar: USER.avatar, distance: "0.5 km away" }, ...data]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={sectionStyles.horizontalList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
};


// Local Events Section
const LocalEventsSection = ({ data }) => {
  const Card = ({ item }) => (
    <View style={cardStyles.eventCard}>
      <Text style={cardStyles.eventTitle}>{item.title}</Text>
      <View style={cardStyles.eventMeta}>
        <Feather name="clock" size={14} color="#666" />
        <Text style={cardStyles.eventTime}>{item.date} • {item.time}</Text>
      </View>
      <View style={cardStyles.eventInfo}>
        <View style={cardStyles.goingContainer}>
          <Feather name="users" size={14} color="#666" />
          <Text style={cardStyles.goingText}>{item.going} going</Text>
        </View>
        <View style={cardStyles.distanceContainer}>
          <Feather name="map-pin" size={14} color="#666" />
          <Text style={cardStyles.distanceText}>{item.distance}</Text>
        </View>
        <TouchableOpacity style={cardStyles.joinButton}>
          <Text style={cardStyles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={sectionStyles.sectionContainer}>
      <Text style={sectionStyles.sectionTitleEvents}>Local Events</Text>
      {data.map((item) => (
        <View key={item.id} style={sectionStyles.verticalListItem}>
          <Card item={item} />
        </View>
      ))}
    </View>
  );
};


// Active Groups Section
const ActiveGroupsSection = ({ data }) => {
  const Card = ({ item }) => (
    <View style={cardStyles.groupCard}>
      <View>
        <View style={cardStyles.groupHeader}>
          <Text style={cardStyles.groupTitle}>{item.name}</Text>
          {item.active && <Text style={cardStyles.groupActiveTag}>Active</Text>}
        </View>
        <Text style={cardStyles.groupDescription}>{item.description}</Text>
      </View>
      <View style={cardStyles.groupFooter}>
        <View style={cardStyles.memberAvatars}>
          {item.members.map((avatar, index) => (
            <Image
              key={index}
              source={{ uri: avatar }}
              style={[
                cardStyles.memberAvatar,
                { zIndex: data.length - index, marginLeft: index === 0 ? 0 : -8 },
              ]}
            />
          ))}
          <View style={cardStyles.memberCount}>
            <Text style={cardStyles.memberCountText}>+{item.membersCount}</Text>
          </View>
        </View>
        <TouchableOpacity style={cardStyles.joinGroupButton}>
          <Text style={cardStyles.joinGroupButtonText}>Join Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={sectionStyles.sectionContainer}>
      <View style={sectionStyles.sectionHeader}>
        <Text style={sectionStyles.sectionTitle}>Active Groups</Text>
        <TouchableOpacity>
          <Text style={sectionStyles.seeAllBtn}>View All</Text>
        </TouchableOpacity>
      </View>
      {data.map((item) => (
        <View key={item.id} style={sectionStyles.verticalListItem}>
          <Card item={item} />
        </View>
      ))}
    </View>
  );
};


// Nearby Activity Map Section
const NearbyActivitySection = ({ onMapPress }) => {
  const markerColor = {
    you: "#ff5252",
    backpacker: "#428afc",
    event: "#22c55e",
  };

  return (
    <View style={sectionStyles.sectionContainer}>
      <Text style={sectionStyles.sectionTitle}>Nearby Activity</Text>
      <View style={cardStyles.mapCard}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={cardStyles.mapStyle}
          region={MAP_REGION}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          {MAP_MARKERS.map((m) => (
            <Marker
              key={m.id}
              coordinate={m.coordinate}
              pinColor={markerColor[m.type]}
            />
          ))}
          {/* Add a marker for 'You' */}
          <Marker coordinate={{ latitude: MAP_REGION.latitude, longitude: MAP_REGION.longitude }} pinColor={markerColor.you} />
        </MapView>
        <TouchableOpacity onPress={onMapPress} style={cardStyles.viewFullMapButton}>
          <Feather name="external-link" size={16} color="#428afc" />
          <Text style={cardStyles.viewFullMapText}>View Full Map</Text>
        </TouchableOpacity>
      </View>
      <View style={cardStyles.mapLegend}>
        {MAP_LEGEND.map((item, index) => (
          <View key={index} style={cardStyles.legendItem}>
            <View style={[cardStyles.legendDot, { backgroundColor: item.color }]} />
            <Text style={cardStyles.legendText}>{item.label} ({item.count || 1})</Text>
          </View>
        ))}
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
      {/* This is the header component from the screenshot.
        It has the brand, location, notif icon, and the stats.
      */}
      <AppHeader
        brand={APP_BRAND}
        user={USER}
        stats={STATS}
        onNotif={handleNotifPress}
        onProfile={handleProfilePress}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* All sections are placed inside the main ScrollView */}
        <NearbyBackpackersSection data={MOCK_BACKPACKERS} />
        <NearbyActivitySection onMapPress={handleMapPress} />
        <LocalEventsSection data={MOCK_EVENTS} />
        <ActiveGroupsSection data={MOCK_GROUPS} />
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
    marginBottom: 0,
    paddingBottom: 20,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    textAlign: 'center',
  },
  notifButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
});

const sectionStyles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a202c",
  },
  sectionTitleEvents: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a202c",
    paddingHorizontal: 20,
    marginBottom: 15,
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
  verticalListItem: {
    marginBottom: 15,
    marginHorizontal: 20, // Add horizontal margin here for consistency
  },
});

const cardStyles = StyleSheet.create({
  // Backpackers Card
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
  connectButton: {
    backgroundColor: "#428afc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  connectButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  // Event Card
  eventCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: 5,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventTime: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  goingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  joinButton: {
    backgroundColor: "#428afc",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  // Group Card
  groupCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    gap: 15,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a202c",
    marginRight: 10,
  },
  groupActiveTag: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: 'bold',
  },
  groupDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  memberAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  memberCount: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  memberCountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  joinGroupButton: {
    backgroundColor: "#428afc",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinGroupButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  // Map Card
  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    height: 250,
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
  viewFullMapButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -70 }],
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    gap: 5,
  },
  viewFullMapText: {
    color: '#428afc',
    fontWeight: 'bold',
  },
  mapLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
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
