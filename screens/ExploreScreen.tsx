import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Expo version!
const { width } = Dimensions.get("window");

const HEADER_GRADIENT = ["#5EC6FF", "#457EFF"];

const MOCK_STATS = [
  { label: "Nearby", value: 5 },
  { label: "Events", value: 4 },
  { label: "Connections", value: 24 },
];

const MOCK_BACKPACKERS = [
  { id: "1", name: "You", tag: "solo", distance: "0.5 km", online: true },
  { id: "2", name: "Alex Chen", tag: "solo", distance: "0.5 km", online: true },
  { id: "3", name: "Sarah Jones", tag: "couple", distance: "0.5 km", online: true },
];

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Temple Tour & Local Food",
    desc: "Join me for a guided tour of Wat Pho and Wat Arun...",
    date: "Tomorrow",
    time: "7:33 PM",
    people: 5,
    distance: "0.5 km",
    button: "Join",
  },
  {
    id: "2",
    title: "Chatuchak Weekend Market Adventure",
    desc: "Explore the massive weekend market together! Looking for...",
    date: "06/08/2025",
    time: "7:33 PM",
    people: 4,
    distance: "0.5 km",
    button: "Join",
  },
  {
    id: "3",
    title: "Rooftop Bar Crawl",
    desc: "Experience Bangkok's famous rooftop bars! Starting at Leb...",
    date: "07/08/2025",
    time: "7:30 PM",
    people: 7,
    distance: "0.5 km",
    button: "Join",
  },
];

const MOCK_GROUPS = [
  {
    id: "1",
    name: "Southeast Asia Backpackers",
    desc: "A group for solo travelers exploring Thailand, Vietnam...",
    members: 5,
    status: "Active",
  },
  {
    id: "2",
    name: "Digital Nomads Bangkok",
    desc: "Working remotely while exploring Bangkok? Join our community of digital nomads...",
    members: 5,
    status: "Active",
  },
];

const MOCK_ACTIVITY = [
  { type: "backpacker", count: 5 },
  { type: "event", count: 4 },
  { type: "you", radius: "2km" },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Gradient with Stats */}
        <LinearGradient colors={HEADER_GRADIENT} style={styles.headerGrad}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.appTitle}>BackpackBuddy</Text>
              <Text style={styles.headerLoc}>Cervantes, Australia</Text>
            </View>
            <View style={styles.headerIcons}>
              <Ionicons name="notifications-outline" size={25} color="#fff" style={{ marginRight: 18 }} />
              <Ionicons name="person-circle-outline" size={29} color="#fff" />
            </View>
          </View>
          <View style={styles.headerStatsRow}>
            {MOCK_STATS.map((s) => (
              <View style={styles.headerStatCard} key={s.label}>
                <Text style={styles.headerStatNum}>{s.value}</Text>
                <Text style={styles.headerStatLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Nearby Backpackers */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Nearby Backpackers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllBtn}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={MOCK_BACKPACKERS}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 14, gap: 14 }}
          renderItem={({ item }) => (
            <View style={styles.backpackerCard}>
              <View style={styles.backpackerAvatarWrap}>
                <Ionicons name="person-circle-outline" size={38} color="#b3bed7" />
                {item.online && <View style={styles.dotOnline} />}
              </View>
              <Text style={styles.backpackerName}>{item.name}</Text>
              <Text style={styles.backpackerDist}>{item.distance} away</Text>
              <View style={styles.backpackerTag}>
                <Text style={styles.backpackerTagTxt}>{item.tag}</Text>
              </View>
              <TouchableOpacity style={styles.connectBtn}>
                <Text style={styles.connectBtnTxt}>Connect</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Local Events */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Local Events</Text>
        </View>
        <FlatList
          data={MOCK_EVENTS}
          keyExtractor={item => item.id}
          horizontal={false}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDesc}>{item.desc}</Text>
                <View style={styles.eventMetaRow}>
                  <Ionicons name="calendar-outline" size={13} color="#bbb" />
                  <Text style={styles.eventMetaTxt}>{item.date}</Text>
                  <Ionicons name="people-outline" size={13} color="#bbb" style={{ marginLeft: 9 }} />
                  <Text style={styles.eventMetaTxt}>{item.people} going</Text>
                  <Ionicons name="location-outline" size={13} color="#bbb" style={{ marginLeft: 9 }} />
                  <Text style={styles.eventMetaTxt}>{item.distance}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinBtnTxt}>{item.button}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Active Groups */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Active Groups</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllBtn}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={MOCK_GROUPS}
          keyExtractor={item => item.id}
          horizontal={false}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.groupCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.groupTitle}>{item.name}</Text>
                <Text style={styles.groupDesc}>{item.desc}</Text>
                <View style={styles.groupMembersRow}>
                  <Ionicons name="people-outline" size={15} color="#7aa1e7" />
                  <Text style={styles.groupMembersTxt}>+{item.members}</Text>
                  <View style={styles.groupActiveBadge}>
                    <Text style={styles.groupActiveTxt}>{item.status}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinBtnTxt}>Join Group</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Nearby Activity Map */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Nearby Activity</Text>
        </View>
        <View style={styles.mapCard}>
          <Image
            source={{ uri: "https://cdn.pixabay.com/photo/2017/01/13/14/28/map-1974699_1280.png" }} // Placeholder, swap for real map
            style={styles.mapImg}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.viewMapBtn}>
            <Ionicons name="map-outline" size={16} color="#3979e9" />
            <Text style={styles.viewMapTxt}>View Full Map</Text>
          </TouchableOpacity>
          <View style={styles.mapLegendRow}>
            <View style={styles.legendDotBlue} /><Text style={styles.legendTxt}>Backpackers</Text>
            <View style={styles.legendDotGreen} /><Text style={styles.legendTxt}>Events</Text>
            <View style={styles.legendDotRed} /><Text style={styles.legendTxt}>You</Text>
          </View>
        </View>
      </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6faff" },
  headerGrad: {
    width: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingBottom: 14,
    paddingHorizontal: 18,
    paddingTop: 18,
    marginBottom: 15,
    minHeight: 105,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  appTitle: { color: "#fff", fontSize: 20, fontWeight: "800", letterSpacing: -0.2 },
  headerLoc: { color: "#e5f6ff", fontWeight: "700", fontSize: 13, marginTop: 1 },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  headerStatsRow: { flexDirection: "row", justifyContent: "space-between" },
  headerStatCard: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 7,
    marginHorizontal: 5,
    backgroundColor: "#fff2",
    borderRadius: 12,
  },
  headerStatNum: { color: "#fff", fontWeight: "900", fontSize: 22, marginBottom: 1 },
  headerStatLabel: { color: "#e8f6ff", fontSize: 12, fontWeight: "600" },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 17,
    marginTop: 12,
    marginBottom: 4,
  },
  sectionTitle: { fontSize: 17, fontWeight: "900", color: "#1e293b" },
  seeAllBtn: { color: "#3979e9", fontWeight: "700", fontSize: 13, padding: 4 },

  // Backpackers
  backpackerCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 14,
    width: 116,
    alignItems: "center",
    shadowColor: "#7acbfa",
    shadowOpacity: 0.09,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 3 },
  },
  backpackerAvatarWrap: { position: "relative", marginBottom: 5 },
  dotOnline: {
    position: "absolute",
    bottom: 5, right: 3,
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: "#22ce69", borderWidth: 1.5, borderColor: "#fff",
  },
  backpackerName: { fontWeight: "700", color: "#2d3865", fontSize: 14, marginBottom: 1 },
  backpackerDist: { color: "#9db7c9", fontSize: 12, marginBottom: 4 },
  backpackerTag: { backgroundColor: "#eaf6fd", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 2, marginBottom: 6 },
  backpackerTagTxt: { color: "#4899e7", fontWeight: "700", fontSize: 11 },
  connectBtn: { backgroundColor: "#2563eb", borderRadius: 7, paddingVertical: 6, paddingHorizontal: 15 },
  connectBtnTxt: { color: "#fff", fontWeight: "700", fontSize: 13 },

  // Events
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 13,
    shadowColor: "#c8dfff",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  eventTitle: { color: "#19387b", fontWeight: "900", fontSize: 15, marginBottom: 1 },
  eventDesc: { color: "#46577a", fontSize: 13, fontWeight: "400", marginBottom: 5, flexWrap: "wrap" },
  eventMetaRow: { flexDirection: "row", alignItems: "center", marginTop: 2, gap: 2 },
  eventMetaTxt: { color: "#9db7c9", fontWeight: "600", fontSize: 12, marginHorizontal: 2 },
  joinBtn: { backgroundColor: "#2563eb", borderRadius: 7, paddingVertical: 7, paddingHorizontal: 16, marginLeft: 14, },
  joinBtnTxt: { color: "#fff", fontWeight: "700", fontSize: 13 },

  // Groups
  groupCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 13,
    shadowColor: "#c8dfff",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  groupTitle: { color: "#19387b", fontWeight: "900", fontSize: 15, marginBottom: 2 },
  groupDesc: { color: "#46577a", fontSize: 13, fontWeight: "400", marginBottom: 5, flexWrap: "wrap" },
  groupMembersRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  groupMembersTxt: { color: "#7aa1e7", fontWeight: "700", fontSize: 12, marginLeft: 2, marginRight: 7 },
  groupActiveBadge: { backgroundColor: "#dbf7e2", borderRadius: 6, paddingHorizontal: 8, marginLeft: 6, },
  groupActiveTxt: { color: "#1fb378", fontWeight: "700", fontSize: 12 },

  // Map / Activity
  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 17,
    padding: 12,
    alignItems: "center",
    shadowColor: "#c8dfff",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  mapImg: { width: "100%", height: 90, borderRadius: 10, marginBottom: 10, backgroundColor: "#e6f3fb" },
  viewMapBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#edf6fe", borderRadius: 9, paddingVertical: 5, paddingHorizontal: 13, marginBottom: 7, },
  viewMapTxt: { color: "#3979e9", fontWeight: "700", fontSize: 13, marginLeft: 6 },
  mapLegendRow: { flexDirection: "row", alignItems: "center", marginTop: 2, gap: 8 },
  legendDotBlue: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#4899e7", marginRight: 2 },
  legendDotGreen: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#1fb378", marginRight: 2 },
  legendDotRed: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#ed3a3a", marginRight: 2 },
  legendTxt: { color: "#627494", fontSize: 12, fontWeight: "600", marginRight: 7 },

  // FAB
  fab: {
    position: "absolute",
    bottom: 26,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3979e9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3979e9",
    shadowOpacity: 0.16,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 6 },
    elevation: 16,
    zIndex: 20,
  },
});