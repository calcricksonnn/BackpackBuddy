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
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const heroImage =
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=900&q=80";

const activeTravelers = [
  {
    id: "1",
    name: "Sophie",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "active",
    badge: "Hostel legend",
  },
  {
    id: "2",
    name: "James",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    status: "just_arrived",
    badge: "Just arrived",
  },
  {
    id: "3",
    name: "Anya",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "first_timer",
    badge: "First timer",
  },
];

const meetups = [
  {
    id: "1",
    title: "Beach BBQ",
    when: "Tonight 6pm",
    where: "Jurien Bay",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    joinedAvatars: [
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/men/52.jpg",
      "https://randomuser.me/api/portraits/women/68.jpg",
    ],
    hot: true,
  },
  {
    id: "2",
    title: "Pub Crawl",
    when: "Tonight 8pm",
    where: "Cervantes Tavern",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
    joinedAvatars: [
      "https://randomuser.me/api/portraits/men/52.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/women/68.jpg",
    ],
    hot: false,
  },
];

const notices = [
  {
    id: "1",
    author: "Anya",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    msg: "Anyone keen for sunrise hiking tomorrow?",
    time: "13m",
    replies: 2,
  },
  {
    id: "2",
    author: "James",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    msg: "Looking for ride shares north!",
    time: "1h",
    replies: 4,
  },
];

const myAvatar = "https://randomuser.me/api/portraits/men/3.jpg";

// statusColors (for story ring status)
const statusColors = {
  active: "#4ADE80",
  just_arrived: "#3B82F6",
  first_timer: "#FACC15",
};

const ExploreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
      />

      {/* HERO HEADER */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: heroImage }} style={styles.heroImage} />
        <LinearGradient
          colors={["#00000055", "#222D50"]}
          style={styles.heroGradient}
        />
        <View style={styles.heroTopRow}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image source={{ uri: myAvatar }} style={styles.heroAvatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Inbox")}>
            <View style={styles.inboxBadgeWrap}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={26}
                color="#fff"
              />
              <View style={styles.inboxDot} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.heroContent}>
          <Text style={styles.heroGreet}>Hey Cal,</Text>
          <Text style={styles.heroTitle}>Welcome to Cervantes YHA</Text>
          <Text style={styles.heroSub}>
            <Ionicons name="location" size={13} color="#fff" />{" "}
            <Text style={{ fontWeight: "600" }}>12 backpackers</Text> checked in
            nearby
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* STORY RINGS (Active Travelers) */}
        <View style={styles.storiesSection}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={activeTravelers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.storyRing}>
                <LinearGradient
                  colors={[
                    statusColors[item.status] || "#bbb",
                    "#fff",
                    "#fff",
                  ]}
                  start={[0.4, 0.1]}
                  end={[1, 1]}
                  style={styles.ringGradient}
                >
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.storyAvatar}
                  />
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: statusColors[item.status] },
                    ]}
                  />
                </LinearGradient>
                <Text style={styles.storyName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.storyBadge}>{item.badge}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* MEETUPS: Swipeable Cards */}
        <View>
          <FlatList
            data={meetups}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.8 + 18}
            decelerationRate="fast"
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingLeft: 18,
              paddingRight: 8,
              paddingBottom: 10,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.eventCard}>
                <Image source={{ uri: item.img }} style={styles.eventImage} />
                <LinearGradient
                  colors={["#00000020", "#000000dd"]}
                  style={styles.eventOverlay}
                />
                {item.hot && (
                  <View style={styles.hotBadge}>
                    <Text style={styles.hotBadgeText}>HOT</Text>
                  </View>
                )}
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventMeta}>
                    {item.when} • {item.where}
                  </Text>
                  <View style={styles.attendeesRow}>
                    {item.joinedAvatars.map((a, idx) => (
                      <Image
                        source={{ uri: a }}
                        key={idx}
                        style={[
                          styles.attendeeAvatar,
                          { marginLeft: idx === 0 ? 0 : -10 },
                        ]}
                      />
                    ))}
                    <Text style={styles.eventJoinTxt}>
                      {item.joinedAvatars.length} Going
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.joinBtn}>
                    <Text style={styles.joinBtnText}>Join</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* NOTICEBOARD (Feed style) */}
        <View style={styles.noticeboardSection}>
          <Text style={styles.feedTitle}>Noticeboard</Text>
          {notices.map((item) => (
            <View key={item.id} style={styles.noticeItem}>
              <Image source={{ uri: item.avatar }} style={styles.feedAvatar} />
              <View style={styles.noticeTextWrap}>
                <Text style={styles.feedMsg}>
                  <Text style={{ fontWeight: "700", color: "#3B82F6" }}>
                    {item.author}
                  </Text>{" "}
                  {item.msg}
                </Text>
                <View style={styles.feedMetaRow}>
                  <Text style={styles.feedTime}>{item.time} ago</Text>
                  <Text style={styles.feedReplies}>
                    {item.replies} replies
                  </Text>
                  <TouchableOpacity style={styles.feedReplyBtn}>
                    <Text style={styles.feedReplyBtnText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreatePost")}
        activeOpacity={0.87}
      >
        <LinearGradient colors={["#3B82F6", "#818CF8"]} style={styles.fabGrad}>
          <Ionicons name="add" size={32} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141825" },

  // HERO HEADER
  heroContainer: {
    width: "100%",
    height: 185,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
    position: "relative",
    marginBottom: 8,
    backgroundColor: "#19223b",
  },
  heroImage: { width: "100%", height: "100%", position: "absolute" },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroTopRow: {
    position: "absolute",
    top: 18,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  heroAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderColor: "#fff",
    borderWidth: 2,
    backgroundColor: "#c9dbfc",
  },
  inboxBadgeWrap: { padding: 5 },
  inboxDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: "#22c55e",
    borderWidth: 1,
    borderColor: "#fff",
  },
  heroContent: { position: "absolute", bottom: 30, left: 24 },
  heroGreet: { color: "#fff", fontSize: 17, fontWeight: "700", marginBottom: 3 },
  heroTitle: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "800",
    marginBottom: 2,
    letterSpacing: -0.7,
  },
  heroSub: {
    color: "#dbeafe",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
    letterSpacing: -0.2,
  },

  // STORIES/ACTIVE TRAVELERS
  storiesSection: {
    paddingHorizontal: 13,
    marginBottom: 18,
    marginTop: 4,
  },
  storyRing: {
    alignItems: "center",
    marginRight: 22,
    width: 76,
    backgroundColor: "transparent",
  },
  ringGradient: {
    borderRadius: 40,
    padding: 3,
    marginBottom: 3,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#e6e8f5",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
    right: 2,
    bottom: 3,
  },
  storyName: {
    fontSize: 14,
    color: "#e5e7ef",
    fontWeight: "700",
    textAlign: "center",
    width: 74,
    marginBottom: 2,
  },
  storyBadge: {
    fontSize: 12,
    color: "#60F6A8",
    backgroundColor: "#243a34",
    borderRadius: 9,
    overflow: "hidden",
    paddingHorizontal: 7,
    paddingVertical: 1,
    fontWeight: "700",
    alignSelf: "center",
  },

  // MEETUP/EVENT CARDS
  eventCard: {
    width: width * 0.8,
    borderRadius: 27,
    marginRight: 18,
    marginBottom: 5,
    backgroundColor: "#24294d",
    elevation: 9,
    shadowColor: "#0008",
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    overflow: "hidden",
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
  },
  eventOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
  },
  hotBadge: {
    position: "absolute",
    top: 13,
    left: 15,
    backgroundColor: "#F43F5E",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    zIndex: 2,
  },
  hotBadgeText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  eventContent: {
    position: "absolute",
    bottom: 13,
    left: 0,
    right: 0,
    padding: 18,
    zIndex: 2,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 2,
    textShadowColor: "#0009",
    textShadowRadius: 8,
    letterSpacing: -0.3,
  },
  eventMeta: {
    color: "#dbeafe",
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "500",
    textShadowColor: "#0007",
    textShadowRadius: 6,
  },
  attendeesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  attendeeAvatar: {
    width: 25,
    height: 25,
    borderRadius: 14,
    borderColor: "#fff",
    borderWidth: 1.3,
    backgroundColor: "#eee",
  },
  eventJoinTxt: {
    color: "#f1f5fa",
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 14,
    textShadowColor: "#0007",
    textShadowRadius: 6,
  },
  joinBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#3B82F6",
    borderRadius: 9,
    paddingVertical: 7,
    paddingHorizontal: 22,
    marginTop: 2,
  },
  joinBtnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    letterSpacing: -0.2,
  },

  // NOTICEBOARD / FEED
  noticeboardSection: {
    marginTop: 5,
    marginBottom: 28,
    paddingHorizontal: 17,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f3f5fa",
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  noticeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 17,
    backgroundColor: "#1d2135",
    borderRadius: 14,
    padding: 13,
    shadowColor: "#3b82f62a",
    shadowOpacity: 0.09,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  feedAvatar: {
    width: 41,
    height: 41,
    borderRadius: 20,
    marginRight: 13,
    marginTop: 3,
    backgroundColor: "#333",
  },
  noticeTextWrap: { flex: 1 },
  feedMsg: {
    fontSize: 15,
    color: "#e7e9f4",
    marginBottom: 6,
    fontWeight: "500",
  },
  feedMetaRow: { flexDirection: "row", alignItems: "center" },
  feedTime: {
    color: "#818cf8",
    fontSize: 12,
    fontWeight: "700",
    marginRight: 12,
  },
  feedReplies: {
    color: "#aaa",
    fontSize: 12,
    fontWeight: "700",
    marginRight: 10,
  },
  feedReplyBtn: {
    backgroundColor: "#2b35e3",
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 13,
    marginLeft: 6,
  },
  feedReplyBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 29,
    right: 28,
    zIndex: 100,
    shadowColor: "#3B82F6",
    shadowOpacity: 0.23,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 18,
    elevation: 10,
  },
  fabGrad: {
    borderRadius: 34,
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExploreScreen;