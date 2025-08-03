import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// MOCK DATA (replace with API later)
const heroImage =
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=900&q=80";
const myAvatar = "https://randomuser.me/api/portraits/men/3.jpg";

const nearbyTravelers = [
  {
    id: "1",
    name: "Maya",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    flag: "🇩🇪",
    status: "New in town",
    mutuals: 2,
    interests: ["Surfing", "Hiking"],
  },
  {
    id: "2",
    name: "Jack",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    flag: "🇬🇧",
    status: "Looking for hiking buddy",
    mutuals: 0,
    interests: ["Hiking", "Hostel Games"],
  },
  {
    id: "3",
    name: "Yuki",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    flag: "🇯🇵",
    status: "Just arrived",
    mutuals: 1,
    interests: ["Road Trip", "Beaches"],
  },
];

const meetups = [
  {
    id: "1",
    title: "Hostel BBQ",
    time: "Tonight 7pm",
    location: "Main Courtyard",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    joined: 8,
  },
  {
    id: "2",
    title: "Beach Sunrise Run",
    time: "Tomorrow 5:30am",
    location: "Sandy Point",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
    joined: 4,
  },
];

const shoutouts = [
  {
    id: "1",
    author: "Yuki",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Anyone driving south tomorrow? Looking to share a ride!",
    replies: 3,
    time: "11m",
  },
  {
    id: "2",
    author: "Maya",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Lost my flip flops in the kitchen 🙈",
    replies: 1,
    time: "26m",
  },
];

// ---------- COMPONENTS ------------
const HeroHeader = ({ heroImage, myAvatar }) => (
  <View style={styles.heroWrap}>
    <Image source={{ uri: heroImage }} style={styles.heroBgImg} blurRadius={2} />
    <BlurView intensity={75} tint="light" style={styles.heroBlur} />
    <View style={styles.heroContent}>
      <Image source={{ uri: myAvatar }} style={styles.heroAvatar} />
      <View style={{ marginLeft: 16 }}>
        <Text style={styles.heroHello}>Welcome back, Cal 👋</Text>
        <Text style={styles.heroSub}>Cervantes YHA • 17° Sunny</Text>
      </View>
    </View>
  </View>
);

// ---------- MAIN SCREEN ------------
const ExploreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* HERO */}
        <HeroHeader heroImage={heroImage} myAvatar={myAvatar} />

        {/* NEARBY TRAVELERS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backpackers Nearby</Text>
          <FlatList
            data={nearbyTravelers}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 6, paddingLeft: 8, gap: 18 }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.travelerCard} onPress={() => navigation.navigate("Profile", { userId: item.id })}>
                <Image source={{ uri: item.avatar }} style={styles.travelerAvatar} />
                <View style={styles.travelerBadgeRow}>
                  <Text style={styles.travelerFlag}>{item.flag}</Text>
                  <Text style={styles.travelerName}>{item.name}</Text>
                </View>
                <Text style={styles.travelerStatus}>{item.status}</Text>
                <View style={styles.travelerInterests}>
                  {item.interests.map((interest, i) => (
                    <View style={styles.travelerInterestPill} key={i}>
                      <Text style={styles.travelerInterestTxt}>{interest}</Text>
                    </View>
                  ))}
                </View>
                {item.mutuals > 0 && (
                  <Text style={styles.travelerMutuals}>👥 {item.mutuals} mutuals</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>

        {/* MEETUPS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meetups & Events</Text>
          <FlatList
            data={meetups}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 6, paddingLeft: 8, gap: 16 }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.meetupCard} onPress={() => navigation.navigate("MeetupDetail", { meetupId: item.id })}>
                <Image source={{ uri: item.img }} style={styles.meetupImg} />
                <View style={styles.meetupInfo}>
                  <Text style={styles.meetupTitle}>{item.title}</Text>
                  <Text style={styles.meetupTime}>{item.time}</Text>
                  <Text style={styles.meetupLoc}><Feather name="map-pin" size={13} color="#60a5fa" /> {item.location}</Text>
                </View>
                <View style={styles.meetupJoinedRow}>
                  <Ionicons name="people" color="#60a5fa" size={16} />
                  <Text style={styles.meetupJoinedTxt}>{item.joined} joined</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* SHOUTOUTS / NOTICEBOARD */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shoutouts</Text>
          {shoutouts.map(item => (
            <View key={item.id} style={styles.shoutoutCard}>
              <Image source={{ uri: item.avatar }} style={styles.shoutoutAvatar} />
              <View style={styles.shoutoutContent}>
                <Text style={styles.shoutoutMsg}>
                  <Text style={{ fontWeight: "700", color: "#3B82F6" }}>{item.author}</Text>
                  {"  "}{item.text}
                </Text>
                <View style={styles.shoutoutMetaRow}>
                  <Text style={styles.shoutoutTime}>{item.time} ago</Text>
                  <Text style={styles.shoutoutReplies}>{item.replies} replies</Text>
                  <TouchableOpacity style={styles.shoutoutReplyBtn}>
                    <Text style={styles.shoutoutReplyBtnTxt}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* QUICK ACTION FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreatePost")}
        activeOpacity={0.92}
      >
        <LinearGradient
          colors={["#3B82F6", "#60A5FA"]}
          style={styles.fabGrad}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fbff" },

  // HERO
  heroWrap: {
    width: '100%',
    height: 100,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    backgroundColor: "#dbeafe",
  },
  heroBgImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0, left: 0,
    opacity: 0.37,
  },
  heroBlur: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 19, bottom: 16,
  },
  heroAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#e0eaff",
  },
  heroHello: {
    fontSize: 19,
    fontWeight: "800",
    color: "#22325e",
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  heroSub: {
    color: "#3B82F6",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.01,
  },

  // SECTIONS
  section: {
    marginBottom: 20,
    marginTop: 2,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#1e293b",
    marginBottom: 7,
    marginLeft: 6,
    letterSpacing: -0.1,
  },

  // TRAVELER CARDS
  travelerCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: "center",
    width: 125,
    shadowColor: "#72b2fa",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    marginBottom: 5,
  },
  travelerAvatar: {
    width: 53,
    height: 53,
    borderRadius: 26.5,
    marginBottom: 7,
    borderWidth: 2,
    borderColor: "#c7e4ff",
    backgroundColor: "#f1f7fe",
  },
  travelerBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 2,
  },
  travelerFlag: {
    fontSize: 17,
    marginRight: 4,
  },
  travelerName: {
    fontWeight: "700",
    color: "#23427d",
    fontSize: 15,
  },
  travelerStatus: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "700",
    marginBottom: 4,
    marginTop: 1,
  },
  travelerInterests: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 3,
    marginBottom: 2,
  },
  travelerInterestPill: {
    backgroundColor: "#f1f7fe",
    borderRadius: 9,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginHorizontal: 1.5,
    marginBottom: 2,
  },
  travelerInterestTxt: {
    color: "#3B82F6",
    fontWeight: "700",
    fontSize: 11.5,
  },
  travelerMutuals: {
    marginTop: 4,
    fontSize: 11,
    color: "#60A5FA",
    fontWeight: "600",
  },

  // MEETUP CARDS
  meetupCard: {
    width: 175,
    backgroundColor: "#fff",
    borderRadius: 21,
    marginRight: 5,
    marginBottom: 8,
    shadowColor: "#72b2fa",
    shadowOpacity: 0.07,
    shadowRadius: 11,
    shadowOffset: { width: 0, height: 3 },
    overflow: "hidden",
  },
  meetupImg: {
    width: "100%",
    height: 73,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: "#eaf5fe",
  },
  meetupInfo: {
    padding: 10,
    paddingBottom: 4,
  },
  meetupTitle: {
    color: "#22325e",
    fontWeight: "900",
    fontSize: 15,
    marginBottom: 2,
  },
  meetupTime: {
    color: "#3B82F6",
    fontWeight: "700",
    fontSize: 12.5,
    marginBottom: 1,
  },
  meetupLoc: {
    color: "#a1b9d6",
    fontSize: 11.5,
    marginTop: 1,
  },
  meetupJoinedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingBottom: 7,
  },
  meetupJoinedTxt: {
    color: "#3B82F6",
    fontWeight: "700",
    fontSize: 12,
  },

  // SHOUTOUTS
  shoutoutCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 19,
    padding: 11,
    marginBottom: 10,
    shadowColor: "#83b3f3",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  shoutoutAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
    backgroundColor: "#f1f7fe",
    borderWidth: 1.3,
    borderColor: "#c7e4ff",
  },
  shoutoutContent: { flex: 1 },
  shoutoutMsg: { color: "#22325e", fontSize: 14, marginBottom: 4 },
  shoutoutMetaRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  shoutoutTime: { color: "#60A5FA", fontSize: 11.5, fontWeight: "700" },
  shoutoutReplies: { color: "#a6b2cf", fontSize: 11.5, fontWeight: "500" },
  shoutoutReplyBtn: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "#e7f0fa",
    marginLeft: 6,
  },
  shoutoutReplyBtnTxt: {
    color: "#3B82F6",
    fontWeight: "700",
    fontSize: 12,
  },

  // FAB
  fab: {
    position: "absolute",
    right: 28,
    bottom: 35,
    shadowColor: "#3B82F6",
    shadowOpacity: 0.13,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 99,
  },
  fabGrad: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExploreScreen;