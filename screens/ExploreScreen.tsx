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
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
import TravelerCard from "../components/TravelerCard"; // <--- make sure this is correct path

const { width } = Dimensions.get("window");

// ---- MOCK DATA ----
const heroImage =
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=900&q=80";
const myAvatar = "https://randomuser.me/api/portraits/men/3.jpg";

const travelers = [
  {
    id: "1",
    name: "Sophie",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    badge: "Hostel legend",
    age: 23,
    location: "Bali",
    bio: "Solo explorer. Love sunrise hikes, street food, and hostel card games.",
    interests: ["Surfing", "Hiking", "BBQ"],
  },
  {
    id: "2",
    name: "James",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    badge: "Just arrived",
    age: 25,
    location: "Perth",
    bio: "Looking for new mates to explore the west coast. Who’s keen?",
    interests: ["Road trips", "Beaches", "Live music"],
  },
  {
    id: "3",
    name: "Anya",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    badge: "First timer",
    age: 20,
    location: "Cervantes",
    bio: "First trip down under! Keen to meet for coffee or hostel events.",
    interests: ["Cafes", "Art", "Snorkeling"],
  },
];

// (Your meetups and notices data here, not shown for brevity)

const HeroHeader = ({
  heroImage,
  userAvatar,
  unread,
  onProfile,
  onInbox,
  hostelName,
  checkedInCount,
}) => (
  <View style={styles.heroContainer}>
    <Image source={{ uri: heroImage }} style={styles.heroImage} />
    <BlurView intensity={75} tint="dark" style={styles.heroBlur} />
    <LinearGradient
      colors={["#00000088", "#222D50"]}
      style={styles.heroGradient}
    />

    <View style={styles.heroTopRow}>
      {/* Avatar with pulse animation */}
      <TouchableOpacity onPress={onProfile} activeOpacity={0.8}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={1900}
          style={styles.avatarPulse}
        >
          <Image source={{ uri: userAvatar }} style={styles.heroAvatar} />
        </Animatable.View>
      </TouchableOpacity>

      {/* Inbox with glowing badge */}
      <TouchableOpacity onPress={onInbox} activeOpacity={0.8}>
        <Animatable.View
          animation="fadeIn"
          duration={900}
          delay={600}
          style={styles.inboxIconWrap}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
          {unread ? <View style={styles.inboxDotGlow} /> : null}
        </Animatable.View>
      </TouchableOpacity>
    </View>

    <View style={styles.heroContent}>
      <Animatable.Text
        animation="fadeInDown"
        duration={1200}
        style={styles.heroGreet}
      >
        Hey Cal,
      </Animatable.Text>
      <Animatable.Text
        animation="fadeInDown"
        delay={150}
        duration={1200}
        style={styles.heroTitle}
      >
        Welcome to Cervantes YHA
      </Animatable.Text>
      <Animatable.Text
        animation="fadeInUp"
        delay={250}
        duration={1000}
        style={styles.heroSub}
      >
        <Ionicons name="location" size={13} color="#fff" />{" "}
        <Text style={{ fontWeight: "700", color: "#63ffb5" }}>
          {12} backpackers
        </Text>{" "}
        checked in nearby
      </Animatable.Text>
    </View>
  </View>
);

const ExploreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
      />
      <HeroHeader
        heroImage={heroImage}
        userAvatar={myAvatar}
        unread={true}
        onProfile={() => navigation.navigate("Profile")}
        onInbox={() => navigation.navigate("Inbox")}
        hostelName="Cervantes YHA"
        checkedInCount={12}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* SWIPE DECK: PEOPLE NEARBY */}
        <View style={styles.swiperSection}>
          <Text style={styles.sectionTitle}>People Nearby</Text>
          <Swiper
            cards={travelers}
            renderCard={(card) =>
              card ? (
                <TravelerCard
                  traveler={card}
                  onConnect={() => {
                    // connect logic here, e.g. navigation.navigate("Chat", { userId: card.id })
                  }}
                  onProfile={() => {
                    // show profile modal, or navigation.navigate("Profile", { userId: card.id })
                  }}
                />
              ) : (
                <View style={styles.noMoreCards}>
                  <Text style={{ color: "#fff", fontWeight: "700", fontSize: 19 }}>
                    No more travelers nearby.
                  </Text>
                  <Text style={{ color: "#b2b8cc", marginTop: 5 }}>Check back soon!</Text>
                </View>
              )
            }
            cardIndex={0}
            backgroundColor="transparent"
            stackSize={3}
            stackSeparation={19}
            overlayLabels={{
              left: {
                title: "Skip",
                style: { label: { color: "#fff", fontSize: 22 } },
              },
              right: {
                title: "Connect",
                style: { label: { color: "#4ADE80", fontSize: 22 } },
              },
            }}
            onSwipedRight={(idx) => {
              // handle connect
            }}
            onSwipedLeft={(idx) => {
              // handle skip
            }}
            disableBottomSwipe
            disableTopSwipe
          />
        </View>

        {/* Meetups, Noticeboard, etc. go here... */}
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
  heroContainer: {
    width: '100%',
    height: 205,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#191c2a',
    marginBottom: 9,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroBlur: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  heroTopRow: {
    position: 'absolute',
    top: 24,
    left: 22,
    right: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
  },
  avatarPulse: {
    shadowColor: '#fff',
    shadowOpacity: 0.18,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 26,
    backgroundColor: '#27335599',
    padding: 2,
  },
  heroAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    borderColor: '#7de2fc',
    backgroundColor: '#fff',
  },
  inboxIconWrap: {
    position: 'relative',
    backgroundColor: '#26326c77',
    borderRadius: 22,
    padding: 7,
  },
  inboxDotGlow: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 1.5,
    borderColor: '#fff',
    shadowColor: '#22c55e',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  heroContent: {
    position: 'absolute',
    bottom: 36,
    left: 28,
    zIndex: 3,
  },
  heroGreet: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 1,
    textShadowColor: '#000a',
    textShadowRadius: 3,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 3,
    letterSpacing: -0.7,
    textShadowColor: '#0009',
    textShadowRadius: 9,
  },
  heroSub: {
    color: '#dbeafe',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.2,
    marginTop: 3,
  },
  swiperSection: {
    marginTop: 25,
    marginBottom: 8,
    alignItems: "center",
    minHeight: 420,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 12,
    letterSpacing: -0.7,
    alignSelf: "flex-start",
    marginLeft: 18,
  },
  noMoreCards: {
    alignItems: "center",
    justifyContent: "center",
    height: 360,
    width: 340,
    backgroundColor: "#21253a",
    borderRadius: 22,
    shadowColor: "#0009",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    marginTop: 25,
  },
  fab: {
    position: "absolute",
    right: 23,
    bottom: 35,
    elevation: 7,
    zIndex: 99,
    shadowColor: "#234",
    shadowOpacity: 0.23,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 2 },
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