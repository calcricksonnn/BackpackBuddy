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
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// --- MOCK DATA (no changes needed) ---
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
    name: "You",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    online: true,
    flag: "🇦🇺",
    tag: "solo",
    distance: "0.2 km",
    mutuals: 2,
    interests: ["Surfing", "Hiking"],
  },
  {
    id: "2",
    name: "Alex Chen",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    online: true,
    flag: "🇬🇧",
    tag: "solo",
    distance: "0.5 km",
    mutuals: 1,
    interests: ["Photography", "Hostel Games"],
  },
  {
    id: "3",
    name: "Sarah Jones",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true,
    flag: "🇯🇵",
    tag: "couple",
    distance: "0.5 km",
    mutuals: 0,
    interests: ["Road Trip", "Beaches"],
  },
];

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Temple Tour & Local Food",
    desc: "Join for a guided tour of Wat Pho and Wat Arun, then street food!",
    date: "Tomorrow • 7:33 PM",
    location: "Cervantes Centre",
    going: [
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/men/11.jpg",
    ],
    total: 5,
  },
  {
    id: "2",
    title: "Beach Volleyball",
    desc: "Friendly sunset games — all welcome, no experience needed.",
    date: "Today • 5:00 PM",
    location: "Main Beach",
    going: [
      "https://randomuser.me/api/portraits/men/15.jpg",
      "https://randomuser.me/api/portraits/women/55.jpg",
    ],
    total: 4,
  },
  {
    id: "3",
    title: "Hostel BBQ Night",
    desc: "BYO drinks, music, and good vibes. Everyone’s invited!",
    date: "Friday • 8:00 PM",
    location: "Hostel Courtyard",
    going: [
      "https://randomuser.me/api/portraits/women/88.jpg",
      "https://randomuser.me/api/portraits/men/29.jpg",
      "https://randomuser.me/api/portraits/men/34.jpg",
    ],
    total: 9,
  },
];

const MOCK_GROUPS = [
  {
    id: "1",
    name: "Southeast Asia Backpackers",
    desc: "Solo travelers exploring SE Asia.",
    members: [
      "https://randomuser.me/api/portraits/women/55.jpg",
      "https://randomuser.me/api/portraits/men/45.jpg",
      "https://randomuser.me/api/portraits/women/21.jpg",
    ],
    membersCount: 53,
    active: true,
  },
  {
    id: "2",
    name: "Digital Nomads Bangkok",
    desc: "Remote work, co-working & afterwork.",
    members: [
      "https://randomuser.me/api/portraits/men/15.jpg",
      "https://randomuser.me/api/portraits/women/49.jpg",
      "https://randomuser.me/api/portraits/men/38.jpg",
    ],
    membersCount: 31,
    active: false,
  },
  {
    id: "3",
    name: "Road Trip Legends",
    desc: "Anyone driving up the coast this week?",
    members: [
      "https://randomuser.me/api/portraits/men/20.jpg",
      "https://randomuser.me/api/portraits/women/72.jpg",
    ],
    membersCount: 19,
    active: true,
  },
];

const MINI_MAP_LAT = -30.5;
const MINI_MAP_LNG = 115.1;
const MINI_MAP_MARKERS = [
  { id: "you", type: "you", lat: MINI_MAP_LAT, lng: MINI_MAP_LNG, label: "You" },
  {
    id: "backpacker1",
    type: "backpacker",
    lat: MINI_MAP_LAT + 0.012,
    lng: MINI_MAP_LNG + 0.01,
    label: "Alex",
  },
  {
    id: "event1",
    type: "event",
    lat: MINI_MAP_LAT + 0.01,
    lng: MINI_MAP_LNG - 0.014,
    label: "BBQ Night",
  },
];

const FAB_ACTIONS = [
  {
    icon: <Ionicons name="add-circle-outline" size={22} color="#3979e9" />,
    label: "New Post",
    onPress: () => console.log("New Post"),
  },
  {
    icon: <Feather name="calendar" size={21} color="#3979e9" />,
    label: "Host Event",
    onPress: () => console.log("Host Event"),
  },
  {
    icon: <Ionicons name="help-circle-outline" size={22} color="#3979e9" />,
    label: "Ask Question",
    onPress: () => console.log("Ask Question"),
  },
];

// --- EXPLORE HEADER: Refined Styles & Animations ---
const HEADER_GRADIENT = ["#53c7fa", "#428afc"];

const ExploreHeader = ({ user, stats, onNotif, onProfile }) => {
  const animatedValues = stats.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    animatedValues.forEach((av, idx) => {
      Animated.timing(av, {
        toValue: stats[idx].value,
        duration: 950,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  return (
    <View style={headerStyles.headerWrap}>
      <LinearGradient colors={HEADER_GRADIENT} style={headerStyles.headerBg}>
        <View style={headerStyles.headerRow}>
          <TouchableOpacity onPress={onProfile} style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={{ uri: user.avatar }} style={headerStyles.avatar} />
            <View style={{ marginLeft: 13 }}>
              <Text style={headerStyles.hello}>
                Welcome back, <Text style={{ fontWeight: "bold" }}>{user.name}</Text>{" "}
                <Animated.Text style={{ fontSize: 19 }}>👋</Animated.Text>
              </Text>
              <Text style={headerStyles.location}>
                {user.location} • {user.weather}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNotif}>
            <Ionicons name="notifications-outline" size={28} color="#fff" />
            {user.hasNotif && <View style={headerStyles.notifDot} />}
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={headerStyles.statsCardWrap}>
        <View style={headerStyles.statsCard}>
          {stats.map((s, i) => (
            <TouchableOpacity key={s.label} activeOpacity={0.88} style={headerStyles.statItem}>
              <Animated.Text style={headerStyles.statNum}>
                {animatedValues[i]
                  .interpolate({
                    inputRange: [0, s.value],
                    outputRange: [0, s.value],
                    extrapolate: "clamp",
                  })
                  .__getValue()
                  .toFixed(0)}
              </Animated.Text>
              <Text style={headerStyles.statLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  headerWrap: {
    backgroundColor: "#f6faff",
    paddingBottom: 22,
    marginBottom: 20,
  },
  headerBg: {
    width: "100%",
    paddingTop: Platform.OS === "android" ? 48 : 28,
    paddingBottom: 50,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#e7f4fe",
  },
  hello: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  location: {
    fontSize: 13,
    color: "#eaf6ff",
    fontWeight: "600",
    marginTop: 2,
    letterSpacing: -0.1,
  },
  notifDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#fff",
  },
  statsCardWrap: {
    alignItems: "center",
    position: "absolute",
    top: Platform.OS === "android" ? 105 : 95,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 25,
    shadowColor: "#2e6dc2",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 20,
    minWidth: 280,
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  statNum: {
    fontSize: 26,
    fontWeight: "900",
    color: "#387ff7",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#b3bed7",
    letterSpacing: 0.1,
  },
});

// --- NEARBY BACKPACKERS: Improved Card Design and Layout ---
const BackpackerCard = ({ item, onConnect, onWave }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();

  return (
    <Animated.View style={[backpackerStyles.card, { transform: [{ scale }] }]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.88}
        style={{ alignItems: "center" }}
      >
        <View style={backpackerStyles.avatarWrap}>
          <Image source={{ uri: item.avatar }} style={backpackerStyles.avatar} />
          {item.online && <View style={backpackerStyles.dotOnline} />}
          <Text style={backpackerStyles.flag}>{item.flag}</Text>
        </View>
        <Text style={backpackerStyles.name}>{item.name}</Text>
        <Text style={backpackerStyles.distance}>{item.distance} away</Text>
        <View style={backpackerStyles.tagWrap}>
          <Text style={backpackerStyles.tagTxt}>{item.tag}</Text>
        </View>
        {item.mutuals > 0 && (
          <View style={backpackerStyles.mutualsBadge}>
            <Ionicons name="people" size={12} color="#349af5" />
            <Text style={backpackerStyles.mutualsTxt}>{item.mutuals} mutuals</Text>
          </View>
        )}
        <View style={backpackerStyles.actionRow}>
          <TouchableOpacity style={backpackerStyles.waveBtn} onPress={() => onWave(item)}>
            <Text style={backpackerStyles.waveBtnTxt}>👋 Wave</Text>
          </TouchableOpacity>
          <TouchableOpacity style={backpackerStyles.connectBtn} onPress={() => onConnect(item)}>
            <Text style={backpackerStyles.connectBtnTxt}>Connect</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const NearbyBackpackers = () => {
  const onConnect = (user) => {
    console.log("Connect to:", user.name);
  };
  const onWave = (user) => {
    console.log("Wave at:", user.name);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={backpackerStyles.headerRow}>
        <Text style={backpackerStyles.sectionTitle}>Nearby Backpackers</Text>
        <TouchableOpacity>
          <Text style={backpackerStyles.seeAllBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={MOCK_BACKPACKERS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 18, paddingVertical: 5 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BackpackerCard item={item} onConnect={onConnect} onWave={onWave} />}
      />
    </View>
  );
};

const backpackerStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 17,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1e293b",
  },
  seeAllBtn: {
    color: "#3979e9",
    fontWeight: "700",
    fontSize: 14,
    padding: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    width: 160,
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: "center",
    shadowColor: "#7acbfa",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    marginBottom: 10,
    elevation: 8,
  },
  avatarWrap: {
    position: "relative",
    marginBottom: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eaf3fe",
    borderWidth: 2,
    borderColor: "#e7f3ff",
  },
  dotOnline: {
    position: "absolute",
    bottom: 5,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22ce69",
    borderWidth: 2,
    borderColor: "#fff",
  },
  flag: {
    position: "absolute",
    bottom: -10,
    left: 17,
    fontSize: 19,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 0,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e3edfa",
  },
  name: {
    fontWeight: "800",
    color: "#2d3865",
    fontSize: 16,
    marginTop: 6,
  },
  distance: {
    color: "#9db7c9",
    fontSize: 13,
    marginBottom: 5,
  },
  tagWrap: {
    backgroundColor: "#eaf6fd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 7,
  },
  tagTxt: {
    color: "#4899e7",
    fontWeight: "700",
    fontSize: 13,
    textTransform: "capitalize",
  },
  mutualsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecf5fe",
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 2,
  },
  mutualsTxt: {
    color: "#349af5",
    fontWeight: "700",
    fontSize: 12,
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    width: "100%",
    justifyContent: "center",
  },
  waveBtn: {
    backgroundColor: "#e9f1fd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  waveBtnTxt: {
    color: "#387ff7",
    fontWeight: "700",
    fontSize: 14,
  },
  connectBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 6,
    shadowColor: "#3979e9",
    shadowOpacity: 0.15,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },
  connectBtnTxt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});

// --- LOCAL EVENTS: Polished Card Design ---
const LocalEvents = () => {
  const onJoin = (event) => {
    console.log("Join event:", event.title);
  };

  return (
    <View style={eventStyles.wrap}>
      <View style={eventStyles.headerRow}>
        <Text style={eventStyles.sectionTitle}>Local Events</Text>
        <TouchableOpacity>
          <Text style={eventStyles.seeAllBtn}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={MOCK_EVENTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, gap: 18, paddingBottom: 8 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={eventStyles.card}>
            <Text style={eventStyles.title}>{item.title}</Text>
            <Text style={eventStyles.desc} numberOfLines={2}>
              {item.desc}
            </Text>
            <View style={eventStyles.metaRow}>
              <Ionicons name="calendar-outline" size={15} color="#91aedc" />
              <Text style={eventStyles.metaTxt}>{item.date}</Text>
            </View>
            <View style={eventStyles.metaRow}>
              <Ionicons name="location-outline" size={15} color="#91aedc" />
              <Text style={eventStyles.metaTxt}>{item.location}</Text>
            </View>
            <View style={eventStyles.goingRow}>
              {item.going.map((avatar, i) => (
                <Image
                  key={i}
                  source={{ uri: avatar }}
                  style={[
                    eventStyles.goingAvatar,
                    { marginLeft: i === 0 ? 0 : -10 },
                  ]}
                />
              ))}
              <Text style={eventStyles.goingTxt}>+{item.total} going</Text>
            </View>
            <TouchableOpacity style={eventStyles.joinBtn} onPress={() => onJoin(item)}>
              <Text style={eventStyles.joinBtnTxt}>Join</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const eventStyles = StyleSheet.create({
  wrap: {
    marginTop: 22,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 19,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1e293b",
  },
  seeAllBtn: {
    color: "#3979e9",
    fontWeight: "700",
    fontSize: 14,
    padding: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    width: 230,
    padding: 20,
    shadowColor: "#b4dbfa",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    marginBottom: 8,
    justifyContent: "space-between",
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    color: "#224388",
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: "#4b5876",
    marginBottom: 8,
    fontWeight: "400",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  metaTxt: {
    color: "#7ca7dc",
    fontWeight: "700",
    fontSize: 13,
    marginLeft: 6,
  },
  goingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  goingAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#e5f3ff",
  },
  goingTxt: {
    color: "#3979e9",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 12,
  },
  joinBtn: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    shadowColor: "#3979e9",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  joinBtnTxt: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    letterSpacing: 0.2,
  },
});

// --- TRENDING GROUPS: Polished Card Design ---
const TrendingGroups = () => {
  const onJoin = (group) => {
    console.log("Join group:", group.name);
  };

  return (
    <View style={groupStyles.wrap}>
      <View style={groupStyles.headerRow}>
        <Text style={groupStyles.sectionTitle}>Trending Groups</Text>
        <TouchableOpacity>
          <Text style={groupStyles.seeAllBtn}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={MOCK_GROUPS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, gap: 18, paddingBottom: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={groupStyles.card}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
              <View style={{ flexDirection: "row" }}>
                {item.members.map((avatar, i) => (
                  <Image
                    key={i}
                    source={{ uri: avatar }}
                    style={[
                      groupStyles.avatar,
                      { marginLeft: i === 0 ? 0 : -10 },
                    ]}
                  />
                ))}
              </View>
              {item.active && (
                <View style={groupStyles.activeNowBadge}>
                  <Text style={groupStyles.activeNowText}>Active now</Text>
                </View>
              )}
            </View>
            <Text style={groupStyles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={groupStyles.desc} numberOfLines={2}>
              {item.desc}
            </Text>
            <View style={groupStyles.bottomRow}>
              <View style={groupStyles.membersRow}>
                <Ionicons name="people-outline" size={15} color="#7aa1e7" />
                <Text style={groupStyles.membersTxt}>{item.membersCount} members</Text>
              </View>
              <TouchableOpacity style={groupStyles.joinBtn} onPress={() => onJoin(item)}>
                <Text style={groupStyles.joinBtnTxt}>Join Group</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const groupStyles = StyleSheet.create({
  wrap: {
    marginTop: 22,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 19,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1e293b",
  },
  seeAllBtn: {
    color: "#3979e9",
    fontWeight: "700",
    fontSize: 14,
    padding: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    width: 230,
    padding: 20,
    shadowColor: "#b4dbfa",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    marginBottom: 8,
    elevation: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#e5f3ff",
  },
  activeNowBadge: {
    backgroundColor: "#dbf7e2",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 12,
  },
  activeNowText: {
    color: "#1fb378",
    fontWeight: "700",
    fontSize: 12,
  },
  name: {
    color: "#19387b",
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 2,
    marginTop: 6,
    letterSpacing: -0.1,
  },
  desc: {
    color: "#46577a",
    fontSize: 13,
    fontWeight: "400",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
  },
  membersRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  membersTxt: {
    color: "#7aa1e7",
    fontWeight: "700",
    fontSize: 13,
    marginLeft: 8,
  },
  joinBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
    shadowColor: "#3979e9",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  joinBtnTxt: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 0.2,
  },
});

// --- MINI MAP SECTION: Polished Card Design ---
const markerColor = {
  you: "#ef4444",
  backpacker: "#3b82f6",
  event: "#1fb378",
};

const MiniMapSection = ({ onMapPress }) => {
  return (
    <View style={miniMapStyles.card}>
      <Text style={miniMapStyles.title}>Nearby Activity</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={miniMapStyles.map}
        region={{
          latitude: MINI_MAP_LAT,
          longitude: MINI_MAP_LNG,
          latitudeDelta: 0.045,
          longitudeDelta: 0.03,
        }}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        pointerEvents="none"
      >
        {MINI_MAP_MARKERS.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.lat, longitude: m.lng }}
            title={m.label}
            pinColor={markerColor[m.type]}
            tracksViewChanges={false}
          />
        ))}
      </MapView>
      <TouchableOpacity style={miniMapStyles.fullMapBtn} onPress={onMapPress} activeOpacity={0.82}>
        <Ionicons name="map-outline" size={17} color="#3979e9" />
        <Text style={miniMapStyles.fullMapBtnTxt}>View Full Map</Text>
      </TouchableOpacity>
      <View style={miniMapStyles.legendRow}>
        <View style={[miniMapStyles.dot, { backgroundColor: "#3b82f6" }]} />
        <Text style={miniMapStyles.legendTxt}>Backpackers</Text>
        <View style={[miniMapStyles.dot, { backgroundColor: "#1fb378" }]} />
        <Text style={miniMapStyles.legendTxt}>Events</Text>
        <View style={[miniMapStyles.dot, { backgroundColor: "#ef4444" }]} />
        <Text style={miniMapStyles.legendTxt}>You</Text>
      </View>
    </View>
  );
};

const miniMapStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    marginHorizontal: 16,
    marginBottom: 28,
    padding: 20,
    alignItems: "center",
    shadowColor: "#c8dfff",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  title: {
    fontWeight: "900",
    color: "#22325e",
    fontSize: 20,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  map: {
    width: "100%",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#e6f3fb",
    marginBottom: 12,
  },
  fullMapBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edf6fe",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  fullMapBtnTxt: {
    color: "#3979e9",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 3,
  },
  legendTxt: {
    color: "#627494",
    fontSize: 12,
    fontWeight: "600",
    marginRight: 7,
  },
});

// --- EXPANDING FAB: No changes, as it's already a good design ---
const ExpandingFAB = () => {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    setOpen((prev) => !prev);
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 220,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View pointerEvents="box-none" style={fabStyles.wrap}>
      {FAB_ACTIONS.map((action, i) => {
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(70 * (i + 1))],
        });
        const opacity = anim.interpolate({
          inputRange: [0, 0.6, 1],
          outputRange: [0, 0.8, 1],
        });
        return (
          <Animated.View
            key={action.label}
            style={[
              fabStyles.actionBtnWrap,
              {
                transform: [{ translateY }],
                opacity,
                zIndex: open ? 90 + i : -1,
              },
            ]}
          >
            <TouchableOpacity
              style={fabStyles.actionBtn}
              onPress={action.onPress}
              activeOpacity={0.88}
            >
              {action.icon}
              <Text style={fabStyles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      <TouchableOpacity style={fabStyles.fab} onPress={toggle} activeOpacity={0.89}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "45deg"],
                }),
              },
            ],
          }}
        >
          <Ionicons name="add" size={31} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const fabStyles = StyleSheet.create({
  wrap: {
    position: "absolute",
    right: 22,
    bottom: 32,
    alignItems: "flex-end",
    zIndex: 999,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3979e9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3979e9",
    shadowOpacity: 0.16,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 6 },
    elevation: 20,
  },
  actionBtnWrap: {
    position: "absolute",
    right: 3,
    bottom: 2,
    alignItems: "flex-end",
    width: 160,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginBottom: 7,
    shadowColor: "#b4dbfa",
    shadowOpacity: 0.13,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  actionLabel: {
    marginLeft: 11,
    fontWeight: "700",
    color: "#3979e9",
    fontSize: 15,
    letterSpacing: 0.1,
  },
});

// --- Main ExploreScreen Component ---
export function ExploreScreen() {
  const handleNotifPress = () => console.log("Notifications Pressed");
  const handleProfilePress = () => console.log("Profile Pressed");
  const handleMapPress = () => console.log("Full Map Pressed");

  return (
    <View style={{ flex: 1, backgroundColor: "#f6faff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ExploreHeader
          user={USER}
          stats={STATS}
          onNotif={handleNotifPress}
          onProfile={handleProfilePress}
        />
        <NearbyBackpackers />
        <LocalEvents />
        <TrendingGroups />
        <MiniMapSection onMapPress={handleMapPress} />
      </ScrollView>
      <ExpandingFAB />
    </View>
  );
}
